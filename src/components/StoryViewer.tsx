import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { authService } from '@/lib/auth';

interface Story {
  id: number;
  user_id: string;
  username: string;
  image_url: string;
  created_at: string;
  expires_at: string;
  views_count: number;
  likes_count: number;
  has_viewed?: boolean;
  is_liked?: boolean;
}

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
  onLoginRequired?: () => void;
  onStoryDeleted?: () => void;
}

const STORIES_API = 'https://functions.poehali.dev/28f82b7d-ad37-41a0-b378-05240f106feb';

export default function StoryViewer({ stories, initialStoryIndex, onClose, onLoginRequired, onStoryDeleted }: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [localStories, setLocalStories] = useState(stories);
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const currentStory = localStories[currentStoryIndex];
  const STORY_DURATION = 5000;

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user && currentStory) {
      fetch(STORIES_API, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id,
        },
        body: JSON.stringify({
          story_id: currentStory.id,
          action: 'view',
        }),
      }).catch(err => console.error('View error:', err));
    }
  }, [currentStory?.id]);

  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50;
    const increment = (intervalTime / STORY_DURATION) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentStoryIndex, isPaused]);

  const handleNext = () => {
    if (currentStoryIndex < localStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    }
  };

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
  };

  const handleLike = async () => {
    const user = authService.getCurrentUser();
    if (!user) {
      onLoginRequired?.();
      return;
    }

    const action = currentStory.is_liked ? 'unlike' : 'like';
    
    const updatedStories = [...localStories];
    const story = updatedStories[currentStoryIndex];
    story.is_liked = !story.is_liked;
    story.likes_count += story.is_liked ? 1 : -1;
    setLocalStories(updatedStories);

    try {
      await fetch(STORIES_API, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id,
        },
        body: JSON.stringify({
          story_id: currentStory.id,
          action,
        }),
      });
    } catch (err) {
      console.error('Like error:', err);
      story.is_liked = !story.is_liked;
      story.likes_count += story.is_liked ? 1 : -1;
      setLocalStories([...updatedStories]);
    }
  };

  const handleReplyClick = () => {
    if (!authService.getCurrentUser()) {
      onLoginRequired?.();
      return;
    }
    setShowReplyInput(true);
  };

  const handleSendReply = () => {
    if (!authService.getCurrentUser()) {
      onLoginRequired?.();
      return;
    }
    if (replyText.trim()) {
      console.log('Reply sent:', replyText);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  const handleDeleteStory = async () => {
    const user = authService.getCurrentUser();
    if (!user || user.id !== currentStory.user_id) return;

    if (!confirm('Удалить эту Story?')) return;

    try {
      const response = await fetch(`${STORIES_API}?story_id=${currentStory.id}`, {
        method: 'DELETE',
        headers: {
          'X-User-Id': user.id,
        },
      });

      if (response.ok) {
        onStoryDeleted?.();
        onClose();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const created = new Date(timestamp);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 60) return `${diffMins}м назад`;
    if (diffHours < 24) return `${diffHours}ч назад`;
    return `${Math.floor(diffHours / 24)}д назад`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="relative w-full h-full lg:w-auto lg:h-full lg:aspect-[9/16] lg:max-w-[min(100vw,56.25vh)] lg:max-h-screen">
        <img
          src={currentStory.image_url}
          alt="Story"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

        <div className="absolute top-0 left-0 right-0 flex gap-1 px-2 pt-2">
          {localStories.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-100"
                style={{
                  width: `${
                    index < currentStoryIndex
                      ? 100
                      : index === currentStoryIndex
                      ? progress
                      : 0
                  }%`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute top-4 left-0 right-0 px-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {currentStory.username.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-['Orbitron'] text-sm font-bold text-white">
                  {currentStory.username}
                </p>
                <p className="text-xs text-white/70">
                  {getTimeAgo(currentStory.created_at)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePauseToggle}
                className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <Icon name={isPaused ? 'Play' : 'Pause'} size={18} className="text-white" />
              </button>
              {authService.getCurrentUser()?.id === currentStory.user_id && (
                <button
                  onClick={handleDeleteStory}
                  className="h-10 w-10 rounded-full bg-red-500/30 backdrop-blur-sm flex items-center justify-center hover:bg-red-500/50 transition-colors"
                >
                  <Icon name="Trash2" size={18} className="text-white" />
                </button>
              )}
              <button
                onClick={onClose}
                className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <Icon name="X" size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-20 right-4 flex flex-col gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <Icon name="Eye" size={20} className="text-white" />
            </div>
            <span className="text-xs font-bold text-white">
              {currentStory.views_count > 999 
                ? `${(currentStory.views_count / 1000).toFixed(1)}K` 
                : currentStory.views_count}
            </span>
          </div>
          <button 
            onClick={handleLike}
            className="flex flex-col items-center gap-1 transition-transform hover:scale-110 active:scale-95"
          >
            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
              currentStory.is_liked 
                ? 'bg-gradient-to-br from-secondary to-accent' 
                : 'bg-black/30 backdrop-blur-sm'
            } transition-all`}>
              <Icon 
                name="Heart" 
                size={20} 
                className={currentStory.is_liked ? 'fill-current text-white' : 'text-white'} 
              />
            </div>
            <span className="text-xs font-bold text-white">{currentStory.likes_count}</span>
          </button>
        </div>

        <div className="absolute inset-y-0 left-0 w-1/3" onClick={handlePrevious} />
        <div className="absolute inset-y-0 right-0 w-1/3" onClick={handleNext} />

        <div className="absolute bottom-6 left-0 right-0 px-4">
          {showReplyInput ? (
            <div className="flex items-center gap-2 animate-fade-in">
              <input
                type="text"
                placeholder={`Ответить ${currentStory.username}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                className="flex-1 rounded-full border-2 border-white/30 bg-black/30 backdrop-blur-sm px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50"
                autoFocus
              />
              <button
                onClick={handleSendReply}
                className="h-12 w-12 rounded-full bg-white flex items-center justify-center"
              >
                <Icon name="Send" size={20} className="text-background" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleReplyClick}
              className="w-full rounded-full border-2 border-white/30 bg-black/30 backdrop-blur-sm px-4 py-3 text-left text-white/70 hover:border-white/50 transition-colors"
            >
              Отправить сообщение...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}