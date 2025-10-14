import { ReactNode } from 'react';
import BottomNav from '@/components/BottomNav';
import DesktopSidebar from '@/components/DesktopSidebar';
import DesktopStoriesSidebar from '@/components/DesktopStoriesSidebar';
import { User } from '@/lib/auth';

type NavItem = 'feed' | 'search' | 'upload' | 'notifications' | 'profile' | 'messages';

interface MainLayoutProps {
  isDesktop: boolean;
  activeTab: NavItem;
  onTabChange: (tab: NavItem) => void;
  onLiveClick: () => void;
  onLeaderboardClick: () => void;
  onChallengesClick: () => void;
  onStoryClick: (story: any) => void;
  onCreateStory: () => void;
  currentUser: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  children: ReactNode;
}

export default function MainLayout({
  isDesktop,
  activeTab,
  onTabChange,
  onLiveClick,
  onLeaderboardClick,
  onChallengesClick,
  onStoryClick,
  onCreateStory,
  currentUser,
  onLoginClick,
  onLogout,
  children,
}: MainLayoutProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background flex">
      {isDesktop && (
        <DesktopSidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          onLiveClick={onLiveClick}
          onLeaderboardClick={onLeaderboardClick}
          onChallengesClick={onChallengesClick}
          onLoginClick={onLoginClick}
          currentUser={currentUser}
          onLogout={onLogout}
        />
      )}

      <div className="flex-1 relative" style={isDesktop ? { marginLeft: '240px', marginRight: '320px' } : {}}>
        {!isDesktop && (
          <div className="absolute left-3 top-2 md:left-4 md:top-3 z-40 animate-fade-in">
            <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text font-['Orbitron'] text-base md:text-2xl font-black tracking-wider text-transparent">
              Peeky
            </h1>
          </div>
        )}

        {children}

        {!isDesktop && (
          <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
        )}
      </div>

      {isDesktop && (
        <DesktopStoriesSidebar
          onStoryClick={onStoryClick}
          onCreateStory={onCreateStory}
        />
      )}
    </div>
  );
}