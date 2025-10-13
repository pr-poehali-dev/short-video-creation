import { useState } from 'react';
import Icon from '@/components/ui/icon';

type NavItem = 'feed' | 'search' | 'trends' | 'notifications' | 'profile';

interface BottomNavProps {
  activeTab: NavItem;
  onTabChange: (tab: NavItem) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [notificationCount] = useState(3);

  const navItems: { id: NavItem; icon: string; label: string }[] = [
    { id: 'feed', icon: 'Home', label: 'Feed' },
    { id: 'search', icon: 'Search', label: 'Search' },
    { id: 'trends', icon: 'TrendingUp', label: 'Trends' },
    { id: 'notifications', icon: 'Bell', label: 'Notifications' },
    { id: 'profile', icon: 'User', label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-xl safe-area-bottom">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-50" />
        <div className="relative flex items-center justify-around px-1 md:px-2 py-2 md:py-3 pb-safe">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`group relative flex flex-col items-center gap-0.5 md:gap-1 px-2 md:px-4 py-1 transition-all active:scale-95 ${
                activeTab === item.id ? 'scale-105 md:scale-110' : 'scale-100 opacity-70'
              }`}
            >
              <div className="relative">
                <Icon
                  name={item.icon}
                  size={22}
                  className={`transition-colors ${
                    activeTab === item.id
                      ? 'text-primary'
                      : 'text-foreground group-hover:text-primary'
                  }`}
                />
                {item.id === 'notifications' && notificationCount > 0 && (
                  <div className="absolute -right-1 -top-1 flex h-3.5 w-3.5 md:h-4 md:w-4 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-accent text-[9px] md:text-[10px] font-bold text-white animate-pulse-glow">
                    {notificationCount}
                  </div>
                )}
              </div>
              <span
                className={`font-['Orbitron'] text-[9px] md:text-[10px] font-medium transition-colors ${
                  activeTab === item.id ? 'text-primary' : 'text-foreground/70'
                }`}
              >
                {item.label}
              </span>
              {activeTab === item.id && (
                <div className="absolute -bottom-2 md:-bottom-3 left-1/2 h-0.5 md:h-1 w-8 md:w-12 -translate-x-1/2 rounded-t-full bg-gradient-to-r from-primary via-secondary to-accent animate-fade-in" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}