'''
Business: Upload, retrieve and manage user stories (photos)
Args: event - dict with httpMethod, body, headers
      context - object with request_id
Returns: HTTP response with stories data
'''

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
from datetime import datetime

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    user_id = headers.get('x-user-id') or headers.get('X-User-Id')
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            action = params.get('action')
            
            if action == 'my':
                if not user_id:
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Unauthorized'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute('''
                    SELECT id, user_id, username, image_url, created_at, 
                           views_count, likes_count, expires_at
                    FROM t_p14008421_short_video_creation.stories 
                    WHERE user_id = %s AND expires_at > CURRENT_TIMESTAMP
                    ORDER BY created_at DESC
                ''', (user_id,))
                
            else:
                cur.execute('''
                    SELECT s.id, s.user_id, s.username, s.image_url, s.created_at,
                           s.views_count, s.likes_count, s.expires_at,
                           CASE WHEN sv.user_id IS NOT NULL THEN TRUE ELSE FALSE END as has_viewed,
                           CASE WHEN sl.user_id IS NOT NULL THEN TRUE ELSE FALSE END as is_liked
                    FROM t_p14008421_short_video_creation.stories s
                    LEFT JOIN t_p14008421_short_video_creation.story_views sv 
                        ON s.id = sv.story_id AND sv.user_id = %s
                    LEFT JOIN t_p14008421_short_video_creation.story_likes sl
                        ON s.id = sl.story_id AND sl.user_id = %s
                    WHERE s.expires_at > CURRENT_TIMESTAMP
                    ORDER BY s.created_at DESC
                ''', (user_id or '', user_id or ''))
            
            stories = [dict(row) for row in cur.fetchall()]
            
            for story in stories:
                story['created_at'] = story['created_at'].isoformat() if story['created_at'] else None
                story['expires_at'] = story['expires_at'].isoformat() if story['expires_at'] else None
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'stories': stories}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            if not user_id:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Unauthorized'}),
                    'isBase64Encoded': False
                }
            
            body = json.loads(event.get('body', '{}'))
            image_url = body.get('image_url')
            username = body.get('username')
            
            if not image_url or not username:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'image_url and username are required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute('''
                INSERT INTO t_p14008421_short_video_creation.stories 
                (user_id, username, image_url)
                VALUES (%s, %s, %s)
                RETURNING id, user_id, username, image_url, created_at, expires_at, views_count, likes_count
            ''', (user_id, username, image_url))
            
            story = dict(cur.fetchone())
            conn.commit()
            
            story['created_at'] = story['created_at'].isoformat() if story['created_at'] else None
            story['expires_at'] = story['expires_at'].isoformat() if story['expires_at'] else None
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'story': story}),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            if not user_id:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Unauthorized'}),
                    'isBase64Encoded': False
                }
            
            body = json.loads(event.get('body', '{}'))
            story_id = body.get('story_id')
            action = body.get('action')
            
            if not story_id or not action:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'story_id and action are required'}),
                    'isBase64Encoded': False
                }
            
            if action == 'view':
                cur.execute('''
                    INSERT INTO t_p14008421_short_video_creation.story_views (story_id, user_id)
                    VALUES (%s, %s)
                    ON CONFLICT (story_id, user_id) DO NOTHING
                ''', (story_id, user_id))
                
                cur.execute('''
                    UPDATE t_p14008421_short_video_creation.stories
                    SET views_count = (
                        SELECT COUNT(*) FROM t_p14008421_short_video_creation.story_views 
                        WHERE story_id = %s
                    )
                    WHERE id = %s
                ''', (story_id, story_id))
                
            elif action == 'like':
                cur.execute('''
                    INSERT INTO t_p14008421_short_video_creation.story_likes (story_id, user_id)
                    VALUES (%s, %s)
                    ON CONFLICT (story_id, user_id) DO NOTHING
                ''', (story_id, user_id))
                
                cur.execute('''
                    UPDATE t_p14008421_short_video_creation.stories
                    SET likes_count = (
                        SELECT COUNT(*) FROM t_p14008421_short_video_creation.story_likes 
                        WHERE story_id = %s
                    )
                    WHERE id = %s
                ''', (story_id, story_id))
                
            elif action == 'unlike':
                cur.execute('''
                    DELETE FROM t_p14008421_short_video_creation.story_likes
                    WHERE story_id = %s AND user_id = %s
                ''', (story_id, user_id))
                
                cur.execute('''
                    UPDATE t_p14008421_short_video_creation.stories
                    SET likes_count = (
                        SELECT COUNT(*) FROM t_p14008421_short_video_creation.story_likes 
                        WHERE story_id = %s
                    )
                    WHERE id = %s
                ''', (story_id, story_id))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
        
    finally:
        cur.close()
        conn.close()
