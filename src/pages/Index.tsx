import { useState, useEffect } from 'react';
import UploadVideo from '@/components/UploadVideo';
import MessagesScreen from '@/components/MessagesScreen';
import UserProfile from '@/components/UserProfile';
import StoryViewer from '@/components/StoryViewer';
import LiveScreen from '@/components/LiveScreen';
import AchievementsScreen from '@/components/AchievementsScreen';
import MonetizationDashboard from '@/components/MonetizationDashboard';
import LeaderboardScreen from '@/components/LeaderboardScreen';
import ChallengesScreen from '@/components/ChallengesScreen';
import ReferralProgram from '@/components/ReferralProgram';
import LandingPage from '@/components/LandingPage';
import AuthForm from '@/components/AuthForm';
import MainLayout from '@/components/MainLayout';
import ScreenWithBackButton from '@/components/screens/ScreenWithBackButton';
import FeedTab from '@/components/tabs/FeedTab';
import SearchTab from '@/components/tabs/SearchTab';
import TrendsTab from '@/components/tabs/TrendsTab';
import NotificationsTab from '@/components/tabs/NotificationsTab';
import ProfileTab from '@/components/tabs/ProfileTab';
import { mockVideos } from '@/data/mockData';

type NavItem = 'feed' | 'search' | 'upload' | 'notifications' | 'profile' | 'messages';

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
  const [showReferrals, setShowReferrals] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <ScreenWithBackButton onBack={() => setShowLeaderboard(false)}>
        <LeaderboardScreen />
      </ScreenWithBackButton>
    );
  }

  if (showChallenges) {
    return (
      <ScreenWithBackButton onBack={() => setShowChallenges(false)}>
        <ChallengesScreen />
      </ScreenWithBackButton>
    );
  }

  if (showReferrals) {
    return (
      <ScreenWithBackButton onBack={() => setShowReferrals(false)}>
        <ReferralProgram />
      </ScreenWithBackButton>
    );
  }

  if (showAchievements) {
    return (
      <ScreenWithBackButton onBack={() => setShowAchievements(false)}>
        <AchievementsScreen />
      </ScreenWithBackButton>
    );
  }

  if (showMonetization) {
    return (
      <ScreenWithBackButton onBack={() => setShowMonetization(false)}>
        <MonetizationDashboard />
      </ScreenWithBackButton>
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
      <ScreenWithBackButton onBack={() => setShowLiveScreen(false)}>
        <LiveScreen />
      </ScreenWithBackButton>
    );
  }

  if (selectedUserProfile) {
    return (
      <ScreenWithBackButton onBack={() => setSelectedUserProfile(null)}>
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
      </ScreenWithBackButton>
    );
  }

  return (
    <MainLayout
      isDesktop={isDesktop}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLiveClick={() => setShowLiveScreen(true)}
      onLeaderboardClick={() => setShowLeaderboard(true)}
      onChallengesClick={() => setShowChallenges(true)}
      onStoryClick={(story) => setSelectedStory(story)}
      onCreateStory={() => console.log('Create story')}
    >
      {activeTab === 'feed' && (
        <FeedTab
          isDesktop={isDesktop}
          videos={mockVideos}
          currentVideoIndex={currentVideoIndex}
          onVideoIndexChange={setCurrentVideoIndex}
          onProfileClick={setSelectedUserProfile}
          onStoryClick={(story) => setSelectedStory(story)}
          onCreateStory={() => console.log('Create story')}
          onLiveClick={() => setShowLiveScreen(true)}
        />
      )}

      {activeTab === 'search' && (
        <SearchTab
          onLeaderboardClick={() => setShowLeaderboard(true)}
          onChallengesClick={() => setShowChallenges(true)}
        />
      )}

      {activeTab === 'upload' && <UploadVideo />}

      {activeTab === 'trends' && <TrendsTab />}

      {activeTab === 'notifications' && <NotificationsTab />}

      {activeTab === 'profile' && (
        <ProfileTab
          currentUser={currentUser}
          onLogout={handleLogout}
          onAchievementsClick={() => setShowAchievements(true)}
          onMonetizationClick={() => setShowMonetization(true)}
          onReferralsClick={() => setShowReferrals(true)}
        />
      )}

      {activeTab === 'messages' && <MessagesScreen />}
    </MainLayout>
  );
}
