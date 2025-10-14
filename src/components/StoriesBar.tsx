import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Story {
  id: number;
  username: string;
  avatar: string;
  hasViewed: boolean;
  isLive?: boolean;
}

interface StoriesBarProps {
  onStoryClick: (story: Story) => void;
  onCreateStory: () => void;
}

const mockStories: Story[] = [
  {
    id: 1,
    username: 'CyberCreator',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/fb14cd1e-e818-437f-8c4a-78714db04196.jpg',
    hasViewed: false,
    isLive: true,
  },
  {
    id: 2,
    username: 'NeonDancer',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/f6887c05-c23f-48ba-9c37-f82ecfc71348.jpg',
    hasViewed: false,
    isLive: true,
  },
  {
    id: 3,
    username: 'TechBeats',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/b7be10cb-cafa-4dee-b9f7-6f4194b5c3c5.jpg',
    hasViewed: false,
  },
  {
    id: 4,
    username: 'DigitalArt',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/fb14cd1e-e818-437f-8c4a-78714db04196.jpg',
    hasViewed: true,
  },
  {
    id: 5,
    username: 'FutureVibes',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/f6887c05-c23f-48ba-9c37-f82ecfc71348.jpg',
    hasViewed: true,
  },
];

export default function StoriesBar({ onStoryClick, onCreateStory }: StoriesBarProps) {
  return (
    <div className="w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="flex gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide px-2 md:px-3 py-1 md:py-1.5">
        <button
          onClick={onCreateStory}
          className="flex-shrink-0 flex flex-col items-center gap-0.5 group"
        >
          <div className="relative">
            <div className="h-10 w-10 md:h-14 md:w-14 rounded-full bg-gradient-to-br from-card to-card/50 border-2 border-dashed border-primary flex items-center justify-center group-hover:border-secondary transition-all">
              <Icon name="Plus" size={16} className="text-primary group-hover:text-secondary transition-colors md:w-5 md:h-5" />
            </div>
          </div>
          <span className="text-[8px] md:text-[10px] text-muted-foreground font-medium">Создать</span>
        </button>

        {mockStories.map((story) => (
          <button
            key={story.id}
            onClick={() => onStoryClick(story)}
            className="flex-shrink-0 flex flex-col items-center gap-0.5 group"
          >
            <div className="relative">
              <div
                className={`h-10 w-10 md:h-14 md:w-14 rounded-full p-0.5 ${
                  story.hasViewed
                    ? 'bg-border'
                    : 'bg-gradient-to-br from-primary via-secondary to-accent'
                }`}
              >
                <div className="h-full w-full rounded-full border-2 border-background overflow-hidden">
                  <img
                    src={story.avatar}
                    alt={story.username}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              {story.isLive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-0.5 px-1 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center gap-0.5 animate-pulse-glow">
                  <div className="h-0.5 w-0.5 md:h-1 md:w-1 rounded-full bg-white" />
                  <span className="text-[7px] md:text-[8px] font-bold text-white uppercase">Live</span>
                </div>
              )}
            </div>
            <span className="text-[8px] md:text-[10px] text-foreground font-medium truncate max-w-[40px] md:max-w-[56px]">
              {story.username}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}