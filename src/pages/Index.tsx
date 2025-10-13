import { useState, useRef, useEffect } from 'react';
import VideoCard from '@/components/VideoCard';
import BottomNav from '@/components/BottomNav';

type NavItem = 'feed' | 'search' | 'trends' | 'notifications' | 'profile';

const mockVideos = [
  {
    id: 1,
    author: 'CyberCreator',
    authorAvatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/fb14cd1e-e818-437f-8c4a-78714db04196.jpg',
    likes: 12500,
    comments: 436,
    shares: 89,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: '🚀 Future vibes only! Check out this tech aesthetic 💜 #cyberpunk #techstyle #future',
  },
  {
    id: 2,
    author: 'NeonDancer',
    authorAvatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/f6887c05-c23f-48ba-9c37-f82ecfc71348.jpg',
    likes: 24800,
    comments: 892,
    shares: 156,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Dancing through the neon lights ✨ Pure energy! #dance #neon #vibes',
  },
  {
    id: 3,
    author: 'TechBeats',
    authorAvatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/b7be10cb-cafa-4dee-b9f7-6f4194b5c3c5.jpg',
    likes: 18900,
    comments: 621,
    shares: 134,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: 'Electronic music meets visual art 🎵 What do you think? #music #electronic #art',
  },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<NavItem>('feed');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
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
        if (diff > 0 && currentVideoIndex < mockVideos.length - 1) {
          setCurrentVideoIndex(currentVideoIndex + 1);
          container?.children[currentVideoIndex + 1]?.scrollIntoView({ behavior: 'smooth' });
        } else if (diff < 0 && currentVideoIndex > 0) {
          setCurrentVideoIndex(currentVideoIndex - 1);
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
  }, [currentVideoIndex]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <div className="absolute left-3 top-3 md:left-4 md:top-4 z-40 animate-fade-in">
        <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text font-['Orbitron'] text-lg md:text-2xl font-black tracking-wider text-transparent">
          VIDEO PLATFORM
        </h1>
      </div>

      {activeTab === 'feed' && (
        <div 
          ref={containerRef}
          className="h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
        >
          {mockVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      )}

      {activeTab === 'search' && (
        <div className="flex h-screen items-center justify-center px-6">
          <div className="w-full max-w-md space-y-6 animate-fade-in">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="mb-2 font-['Orbitron'] text-2xl font-bold text-foreground">
                Search Content
              </h2>
              <p className="text-muted-foreground">
                Find creators, trends, and videos
              </p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for videos..."
                className="w-full rounded-2xl border border-border bg-card/50 px-6 py-4 pr-12 text-foreground backdrop-blur-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="flex h-screen items-center justify-center px-6">
          <div className="w-full max-w-md space-y-4 animate-fade-in">
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-accent">
                <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h2 className="mb-2 font-['Orbitron'] text-2xl font-bold text-foreground">
                Trending Now
              </h2>
            </div>
            {['#FutureTech', '#CyberVibes', '#NeonLife', '#DigitalArt', '#TechMusic'].map((tag, index) => (
              <div
                key={tag}
                className="rounded-2xl border border-border bg-card/30 p-4 backdrop-blur-sm transition-all hover:bg-card/50 hover:border-primary cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-['Orbitron'] text-lg font-bold text-primary">{tag}</p>
                    <p className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 500 + 100)}K views
                    </p>
                  </div>
                  <div className="text-2xl">🔥</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="flex h-screen items-center justify-center px-6">
          <div className="w-full max-w-md space-y-4 animate-fade-in">
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent relative">
                <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white animate-pulse-glow">
                  3
                </div>
              </div>
              <h2 className="mb-2 font-['Orbitron'] text-2xl font-bold text-foreground">
                Notifications
              </h2>
            </div>
            {[
              { text: 'CyberCreator started following you', time: '2m ago', new: true },
              { text: 'Your video reached 10K views!', time: '1h ago', new: true },
              { text: 'NeonDancer liked your video', time: '3h ago', new: true },
              { text: 'New trending hashtag: #FutureTech', time: '5h ago', new: false },
            ].map((notif, index) => (
              <div
                key={index}
                className={`rounded-2xl border p-4 backdrop-blur-sm transition-all hover:bg-card/50 cursor-pointer ${
                  notif.new ? 'border-primary bg-card/30' : 'border-border bg-card/10'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="flex-1 text-sm text-foreground">{notif.text}</p>
                  {notif.new && (
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{notif.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="flex h-screen items-center justify-center px-6">
          <div className="w-full max-w-md space-y-6 animate-fade-in">
            <div className="text-center">
              <div className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-primary bg-gradient-to-br from-primary/20 to-secondary/20 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
                  <span className="font-['Orbitron'] text-4xl font-bold text-primary">YU</span>
                </div>
              </div>
              <h2 className="mb-1 font-['Orbitron'] text-2xl font-bold text-foreground">
                Your Profile
              </h2>
              <p className="text-muted-foreground">@yourhandle</p>
            </div>
            <div className="grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card/30 p-6 backdrop-blur-sm">
              <div className="text-center">
                <p className="font-['Orbitron'] text-2xl font-bold text-primary">24</p>
                <p className="text-xs text-muted-foreground">Videos</p>
              </div>
              <div className="text-center">
                <p className="font-['Orbitron'] text-2xl font-bold text-secondary">1.2K</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-['Orbitron'] text-2xl font-bold text-accent">856</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
            </div>
            <button className="w-full rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent py-4 font-['Orbitron'] font-bold text-white transition-all hover:opacity-90">
              Edit Profile
            </button>
          </div>
        </div>
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}