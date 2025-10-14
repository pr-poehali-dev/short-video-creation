CREATE TABLE IF NOT EXISTS t_p14008421_short_video_creation.stories (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '24 hours',
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0
);

CREATE INDEX idx_stories_user_id ON t_p14008421_short_video_creation.stories(user_id);
CREATE INDEX idx_stories_expires_at ON t_p14008421_short_video_creation.stories(expires_at);

CREATE TABLE IF NOT EXISTS t_p14008421_short_video_creation.story_likes (
    id SERIAL PRIMARY KEY,
    story_id INTEGER NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(story_id, user_id)
);

CREATE TABLE IF NOT EXISTS t_p14008421_short_video_creation.story_views (
    id SERIAL PRIMARY KEY,
    story_id INTEGER NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(story_id, user_id)
);