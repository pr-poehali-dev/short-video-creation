import Icon from '@/components/ui/icon';

interface Story {
  id: number;
  username: string;
  avatar: string;
  hasViewed: boolean;
  isLive?: boolean;
}

interface DesktopStoriesSidebarProps {
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
  {
    id: 6,
    username: 'ArtistPro',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/b7be10cb-cafa-4dee-b9f7-6f4194b5c3c5.jpg',
    hasViewed: false,
  },
];

const mockRecommendedVideos = [
  {
    id: 1,
    thumbnail: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/fb14cd1e-e818-437f-8c4a-78714db04196.jpg',
    title: 'Никто ни разу не попал 😱',
    author: 'emilyen_shakirov',
    likes: '2.6M',
    views: '62.7K',
  },
  {
    id: 2,
    thumbnail: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/f6887c05-c23f-48ba-9c37-f82ecfc71348.jpg',
    title: 'Танцы 2022-11',
    author: 'omilyen_shakirov',
    likes: '2.6M',
    views: '2021-7-16',
  },
];

export default function DesktopStoriesSidebar({ onStoryClick, onCreateStory }: DesktopStoriesSidebarProps) {
  return (
    <div className="flex flex-col w-80 h-screen bg-background fixed right-0 top-0 overflow-y-auto scrollbar-hide">
      <div className="p-4 space-y-4">
        <div>
          <h2 className="font-['Orbitron'] text-base font-bold text-foreground mb-3">
            Вам может понравиться
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {mockRecommendedVideos.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer"
              >
                <div className="relative w-[150px] h-[200px] rounded-lg overflow-hidden mb-2 bg-card/20">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-xs text-white font-medium line-clamp-2 mb-1">
                      {video.title}
                    </p>
                    <p className="text-[10px] text-white/80">
                      {video.author}
                    </p>
                  </div>
                  {video.id === 1 && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 rounded text-[10px] font-bold text-white">
                      Закреплено
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Heart" size={14} />
                    <span>{video.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    <span>{video.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-['Orbitron'] text-sm font-bold text-foreground">
              Stories
            </h3>
            <button
              onClick={onCreateStory}
              className="text-xs text-primary hover:text-secondary transition-colors font-medium"
            >
              Создать
            </button>
          </div>
          <div className="space-y-3">
            {mockStories.map((story) => (
              <button
                key={story.id}
                onClick={() => onStoryClick(story)}
                className="w-full flex items-center gap-3 hover:bg-card/30 p-2 rounded-lg transition-all"
              >
                <div className="relative flex-shrink-0">
                  <div
                    className={`h-12 w-12 rounded-full p-0.5 ${
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
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center gap-0.5">
                      <div className="h-1 w-1 rounded-full bg-white" />
                      <span className="text-[8px] font-bold text-white uppercase">Live</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{story.username}</p>
                  {story.isLive && (
                    <p className="text-xs text-muted-foreground">В эфире</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}