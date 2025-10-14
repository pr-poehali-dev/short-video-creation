import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface StoryContent {
  id: number;
  type: 'image' | 'video';
  url: string;
  duration: number;
}

interface StoryViewerProps {
  stories: Array<{
    id: number;
    username: string;
    avatar: string;
    isLive?: boolean;
    hasViewed: boolean;
  }>;
  initialStoryIndex: number;
  onClose: () => void;
}

const mockStoryContent: StoryContent[] = [
  {
    id: 1,
    type: 'image',
    url: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/fb14cd1e-e818-437f-8c4a-78714db04196.jpg',
    duration: 5000,
  },
  {
    id: 2,
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: 10000,
  },
];

export default function StoryViewer({ stories, initialStoryIndex, onClose }: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentStory = stories[currentStoryIndex];
  const currentContent = mockStoryContent[currentContentIndex];

  useEffect(() => {
    if (isPaused || currentStory.isLive) return;

    const duration = currentContent.duration;
    const intervalTime = 50;
    const increment = (intervalTime / duration) * 100;

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
  }, [currentContentIndex, currentStoryIndex, isPaused, currentStory.isLive]);

  const handleNext = () => {
    if (currentContentIndex < mockStoryContent.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1);
      setProgress(0);
    } else if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setCurrentContentIndex(0);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
      setProgress(0);
    } else if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setCurrentContentIndex(mockStoryContent.length - 1);
      setProgress(0);
    }
  };

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log('Reply sent:', replyText);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="relative h-full w-full">
        {currentContent.type === 'image' ? (
          <img
            src={currentContent.url}
            alt="Story"
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            src={currentContent.url}
            className="h-full w-full object-cover"
            autoPlay
            loop={story.isLive}
            playsInline
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

        {!currentStory.isLive && (
          <div className="absolute top-0 left-0 right-0 flex gap-1 px-2 pt-2">
            {mockStoryContent.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width: `${
                      index < currentContentIndex
                        ? 100
                        : index === currentContentIndex
                        ? progress
                        : 0
                    }%`,
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="absolute top-4 left-0 right-0 px-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                <img
                  src={currentStory.avatar}
                  alt={currentStory.username}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-['Orbitron'] text-sm font-bold text-white">
                  {currentStory.username}
                </p>
                <p className="text-xs text-white/70">
                  {currentStory.isLive ? 'В эфире' : '2ч назад'}
                </p>
              </div>
              {currentStory.isLive && (
                <div className="px-2 py-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center gap-1 animate-pulse-glow">
                  <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase">Эфир</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!currentStory.isLive && (
                <button
                  onClick={handlePauseToggle}
                  className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
                >
                  <Icon name={isPaused ? 'Play' : 'Pause'} size={18} className="text-white" />
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

        {currentStory.isLive && (
          <div className="absolute top-20 right-4 flex flex-col gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="h-12 w-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                <Icon name="Eye" size={20} className="text-white" />
              </div>
              <span className="text-xs font-bold text-white">1.2K</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-12 w-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                <Icon name="Heart" size={20} className="text-white" />
              </div>
              <span className="text-xs font-bold text-white">324</span>
            </div>
          </div>
        )}

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
              onClick={() => setShowReplyInput(true)}
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