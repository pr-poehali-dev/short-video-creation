import { useState, useEffect } from 'react';
import UploadVideo from '@/components/UploadVideo';
import MessagesScreen from '@/components/MessagesScreen';
import UserProfile from '@/components/UserProfile';
import StoryViewer from '@/components/StoryViewer';
import StoryUpload from '@/components/StoryUpload';
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
import AuthModal from '@/components/AuthModal';
import { mockVideos } from '@/data/mockData';
import { authService, User } from '@/lib/auth';

type NavItem = 'feed' | 'search' | 'upload' | 'notifications' | 'profile' | 'messages';

export default function Index() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState<NavItem>('feed');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedUserProfile, setSelectedUserProfile] = useState<string | null>(null);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [showStoryUpload, setShowStoryUpload] = useState(false);
  const [stories, setStories] = useState<any[]>([]);
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
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const user = authService.getCurrentUser();
      const response = await fetch('https://functions.poehali.dev/28f82b7d-ad37-41a0-b378-05240f106feb', {
        headers: user ? { 'X-User-Id': user.id } : {},
      });
      const data = await response.json();
      setStories(data.stories || []);
    } catch (err) {
      console.error('Failed to load stories:', err);
    }
  };

  const handleAuthSuccess = () => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };



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
    <>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {showStoryUpload && (
        <StoryUpload
          onClose={() => setShowStoryUpload(false)}
          onUploadSuccess={loadStories}
          onLoginRequired={() => {
            setShowStoryUpload(false);
            setShowAuthModal(true);
          }}
        />
      )}

      {selectedStoryIndex !== null && stories.length > 0 ? (
        <StoryViewer
          stories={stories}
          initialStoryIndex={selectedStoryIndex}
          onClose={() => setSelectedStoryIndex(null)}
          onLoginRequired={() => {
            setSelectedStoryIndex(null);
            setShowAuthModal(true);
          }}
        />
      ) : (
      <MainLayout
        isDesktop={isDesktop}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLiveClick={() => setShowLiveScreen(true)}
        onLeaderboardClick={() => setShowLeaderboard(true)}
        onChallengesClick={() => setShowChallenges(true)}
        onStoryClick={(storyIndex) => setSelectedStoryIndex(storyIndex)}
        onCreateStory={() => {
          if (currentUser) {
            setShowStoryUpload(true);
          } else {
            setShowAuthModal(true);
          }
        }}
        stories={stories}
        currentUser={currentUser}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      >
      {activeTab === 'feed' && (
        <FeedTab
          isDesktop={isDesktop}
          videos={mockVideos}
          currentVideoIndex={currentVideoIndex}
          onVideoIndexChange={setCurrentVideoIndex}
          onProfileClick={setSelectedUserProfile}
          onStoryClick={(storyIndex) => setSelectedStoryIndex(storyIndex)}
          onCreateStory={() => {
            if (currentUser) {
              setShowStoryUpload(true);
            } else {
              setShowAuthModal(true);
            }
          }}
          stories={stories}
          onLiveClick={() => setShowLiveScreen(true)}
          onLoginRequired={() => setShowAuthModal(true)}
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
      )}
    </>
  );
}