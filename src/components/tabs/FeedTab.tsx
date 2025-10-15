import { useRef, useEffect } from 'react';
import VideoCard from '@/components/VideoCard';
import StoriesBar from '@/components/StoriesBar';
import Icon from '@/components/ui/icon';

interface Video {
  id: number;
  author: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  shares: number;
  videoUrl: string;
  description: string;
}

interface FeedTabProps {
  isDesktop: boolean;
  videos: Video[];
  currentVideoIndex: number;
  onVideoIndexChange: (index: number) => void;
  onProfileClick: (author: string) => void;
  onStoryClick: (storyIndex: number) => void;
  onCreateStory: () => void;
  onLiveClick: () => void;
  onLoginRequired?: () => void;
  stories?: any[];
}

export default function FeedTab({
  isDesktop,
  videos,
  currentVideoIndex,
  onVideoIndexChange,
  onProfileClick,
  onStoryClick,
  onCreateStory,
  onLiveClick,
  onLoginRequired,
  stories,
}: FeedTabProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY.current = e.changedTouches[0].clientY;
      handleSwipe();
    };

    const handleSwipe = () => {
      const diff = touchStartY.current - touchEndY.current;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0 && currentVideoIndex < videos.length - 1) {
          onVideoIndexChange(currentVideoIndex + 1);
          container?.children[currentVideoIndex + 1]?.scrollIntoView({ behavior: 'smooth' });
        } else if (diff < 0 && currentVideoIndex > 0) {
          onVideoIndexChange(currentVideoIndex - 1);
          container?.children[currentVideoIndex - 1]?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentVideoIndex, videos.length, onVideoIndexChange]);

  return (
    <>
      <div 
        ref={containerRef}
        className="h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
      >
        {videos.map((video) => (
          <VideoCard 
            key={video.id} 
            {...video} 
            onProfileClick={() => onProfileClick(video.author)}
            onLoginRequired={onLoginRequired}
          />
        ))}
      </div>
    </>
  );
}