import { useState, useRef, useEffect } from 'react';
import VideoCard from '@/components/VideoCard';
import BottomNav from '@/components/BottomNav';
import UploadVideo from '@/components/UploadVideo';
import TrendsSection from '@/components/TrendsSection';
import MessagesScreen from '@/components/MessagesScreen';
import UserProfile from '@/components/UserProfile';
import StoriesBar from '@/components/StoriesBar';
import StoryViewer from '@/components/StoryViewer';
import LiveScreen from '@/components/LiveScreen';
import AchievementsScreen from '@/components/AchievementsScreen';
import MonetizationDashboard from '@/components/MonetizationDashboard';
import LeaderboardScreen from '@/components/LeaderboardScreen';
import ChallengesScreen from '@/components/ChallengesScreen';
import LandingPage from '@/components/LandingPage';
import AuthForm from '@/components/AuthForm';
import Icon from '@/components/ui/icon';

type NavItem = 'feed' | 'search' | 'upload' | 'notifications' | 'profile' | 'messages';

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

interface User {
  email: string;
  username: string;
}

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'landing' | 'login' | 'register'>('landing');
  const [activeTab, setActiveTab] = useState<NavItem>('feed');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedUserProfile, setSelectedUserProfile] = useState<string | null>(null);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [showLiveScreen, setShowLiveScreen] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showMonetization, setShowMonetization] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  useEffect(() => {
    const savedUser = localStorage.getItem('peeky_user');
    const savedAuth = localStorage.getItem('peeky_auth');
    
    if (savedUser && savedAuth === 'true') {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('peeky_user');
        localStorage.removeItem('peeky_auth');
      }
    }
  }, []);

  const handleAuth = (email: string, password: string, username?: string) => {
    const user: User = {
      email,
      username: username || email.split('@')[0],
    };
    
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('peeky_user', JSON.stringify(user));
    localStorage.setItem('peeky_auth', 'true');
    setAuthMode('landing');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('peeky_user');
    localStorage.removeItem('peeky_auth');
    setAuthMode('landing');
  };

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

  if (!isAuthenticated) {
    if (authMode === 'landing') {
      return (
        <LandingPage
          onLogin={() => setAuthMode('login')}
          onRegister={() => setAuthMode('register')}
        />
      );
    }

    return (
      <AuthForm
        mode={authMode === 'login' ? 'login' : 'register'}
        onSubmit={handleAuth}
        onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        onBack={() => setAuthMode('landing')}
      />
    );
  }

  if (showLeaderboard) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-background">
        <button
          onClick={() => setShowLeaderboard(false)}
          className="absolute left-4 top-4 z-50 h-10 w-10 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-all"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>
        <LeaderboardScreen />
      </div>
    );
  }

  if (showChallenges) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-background">
        <button
          onClick={() => setShowChallenges(false)}
          className="absolute left-4 top-4 z-50 h-10 w-10 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-all"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>
        <ChallengesScreen />
      </div>
    );
  }

  if (showAchievements) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-background">
        <button
          onClick={() => setShowAchievements(false)}
          className="absolute left-4 top-4 z-50 h-10 w-10 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-all"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>
        <AchievementsScreen />
      </div>
    );
  }

  if (showMonetization) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-background">
        <button
          onClick={() => setShowMonetization(false)}
          className="absolute left-4 top-4 z-50 h-10 w-10 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-all"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>
        <MonetizationDashboard />
      </div>
    );
  }

  if (selectedStory) {
    return (
      <StoryViewer
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    );
  }

  if (showLiveScreen) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-background">
        <button
          onClick={() => setShowLiveScreen(false)}
          className="absolute left-4 top-4 z-50 h-10 w-10 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-all"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>
        <LiveScreen />
      </div>
    );
  }

  if (selectedUserProfile) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-background">
        <button
          onClick={() => setSelectedUserProfile(null)}
          className="absolute left-4 top-4 z-50 h-10 w-10 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-all"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>
        <UserProfile
          username={selectedUserProfile}
          avatar={mockVideos.find(v => v.author === selectedUserProfile)?.authorAvatar || ''}
          followers={Math.floor(Math.random() * 10000) + 1000}
          following={Math.floor(Math.random() * 1000) + 100}
          videos={Math.floor(Math.random() * 50) + 5}
          bio="🎨 Цифровой создатель | Техно-энтузиаст | Создаю крутой контент"
          isOwnProfile={false}
          onMessageClick={() => {
            setSelectedUserProfile(null);
            setActiveTab('messages');
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <div className="absolute left-3 top-3 md:left-4 md:top-4 z-40 animate-fade-in">
        <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text font-['Orbitron'] text-lg md:text-2xl font-black tracking-wider text-transparent">
          Peeky
        </h1>
      </div>

      {activeTab === 'feed' && (
        <>
          <div className="absolute top-14 md:top-16 left-0 right-0 z-30">
            <StoriesBar
              onStoryClick={(story) => setSelectedStory(story)}
              onCreateStory={() => console.log('Create story')}
            />
          </div>
          <button
            onClick={() => setShowLiveScreen(true)}
            className="absolute top-20 md:top-24 right-4 z-30 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center gap-2 hover:opacity-90 transition-opacity animate-pulse-glow"
          >
            <Icon name="Radio" size={18} className="text-white" />
            <span className="text-xs font-bold text-white uppercase">Эфир</span>
          </button>
          <div 
            ref={containerRef}
            className="h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide pt-24"
          >
            {mockVideos.map((video) => (
              <VideoCard 
                key={video.id} 
                {...video} 
                onProfileClick={() => setSelectedUserProfile(video.author)}
              />
            ))}
          </div>
        </>
      )}

      {activeTab === 'search' && (
        <div className="h-screen overflow-hidden bg-background">
          <div className="flex items-center gap-2 px-4 pt-4 pb-2 border-b border-border">
            <button
              onClick={() => setShowLeaderboard(true)}
              className="flex-1 py-3 rounded-xl border border-border bg-card/50 hover:bg-card transition-all flex items-center justify-center gap-2"
            >
              <Icon name="Trophy" size={20} className="text-yellow-500" />
              <span className="font-['Orbitron'] font-bold text-sm">Рейтинг</span>
            </button>
            <button
              onClick={() => setShowChallenges(true)}
              className="flex-1 py-3 rounded-xl border border-border bg-card/50 hover:bg-card transition-all flex items-center justify-center gap-2"
            >
              <Icon name="Award" size={20} className="text-primary" />
              <span className="font-['Orbitron'] font-bold text-sm">Конкурсы</span>
            </button>
          </div>
          <div className="h-[calc(100vh-80px)] overflow-y-auto">
            <TrendsSection />
          </div>
        </div>
      )}

      {activeTab === 'upload' && (
        <UploadVideo />
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
                Актуальное сейчас
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
                      {Math.floor(Math.random() * 500 + 100)}К просмотров
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
                Уведомления
              </h2>
            </div>
            {[
              { text: 'CyberCreator подписался на вас', time: '2м назад', new: true },
              { text: 'Ваше видео набрало 10К просмотров!', time: '1ч назад', new: true },
              { text: 'NeonDancer оценил ваше видео', time: '3ч назад', new: true },
              { text: 'Новый трендовый хештег: #FutureTech', time: '5ч назад', new: false },
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
        <div className="relative">
          <button
            onClick={handleLogout}
            className="absolute right-4 top-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border hover:bg-card transition-all"
          >
            <Icon name="LogOut" size={18} />
            <span className="text-sm font-medium">Выйти</span>
          </button>
          <UserProfile
            username={currentUser?.username || "YourName"}
            avatar="https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/fb14cd1e-e818-437f-8c4a-78714db04196.jpg"
            followers={1200}
            following={856}
            videos={24}
            bio="🚀 Создатель контента | Техно-энтузиаст | Цифровой художник"
            isOwnProfile={true}
            onAchievementsClick={() => setShowAchievements(true)}
            onMonetizationClick={() => setShowMonetization(true)}
          />
        </div>
      )}

      {activeTab === 'messages' && (
        <MessagesScreen />
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}