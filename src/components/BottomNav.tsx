import { useState } from 'react';
import Icon from '@/components/ui/icon';

type NavItem = 'feed' | 'search' | 'upload' | 'notifications' | 'profile' | 'messages';

interface BottomNavProps {
  activeTab: NavItem;
  onTabChange: (tab: NavItem) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [notificationCount] = useState(3);
  const [messageCount] = useState(2);

  const navItems: { id: NavItem; icon: string; label: string }[] = [
    { id: 'feed', icon: 'Home', label: 'Лента' },
    { id: 'search', icon: 'TrendingUp', label: 'Тренды' },
    { id: 'upload', icon: 'PlusCircle', label: 'Загрузка' },
    { id: 'messages', icon: 'MessageCircle', label: 'Чаты' },
    { id: 'profile', icon: 'User', label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-xl safe-area-bottom">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-50" />
        <div className="relative flex items-center justify-around px-0 py-1.5 md:py-2 pb-safe">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`group relative flex flex-col items-center gap-0.5 px-1 md:px-2 py-0.5 md:py-1 transition-all active:scale-95 ${
                activeTab === item.id ? 'scale-105' : 'scale-100 opacity-70'
              }`}
            >
              <div className="relative">
                {item.id === 'upload' ? (
                  <div className={`flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-primary via-secondary to-accent'
                      : 'bg-gradient-to-r from-primary/70 via-secondary/70 to-accent/70'
                  }`}>
                    <Icon name={item.icon} size={20} className="text-white md:w-6 md:h-6" />
                  </div>
                ) : (
                  <Icon
                    name={item.icon}
                    size={20}
                    className={`transition-colors md:w-5 md:h-5 ${
                      activeTab === item.id
                        ? 'text-primary'
                        : 'text-foreground group-hover:text-primary'
                    }`}
                  />
                )}
                {item.id === 'notifications' && notificationCount > 0 && (
                  <div className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-accent text-[8px] font-bold text-white animate-pulse-glow">
                    {notificationCount}
                  </div>
                )}
                {item.id === 'messages' && messageCount > 0 && (
                  <div className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-[8px] font-bold text-white animate-pulse-glow">
                    {messageCount}
                  </div>
                )}
              </div>
              <span
                className={`font-['Orbitron'] text-[8px] md:text-[9px] font-medium transition-colors ${
                  activeTab === item.id ? 'text-primary' : 'text-foreground/70'
                }`}
              >
                {item.label}
              </span>
              {activeTab === item.id && (
                <div className="absolute -bottom-1 md:-bottom-1.5 left-1/2 h-0.5 w-6 md:w-8 -translate-x-1/2 rounded-t-full bg-gradient-to-r from-primary via-secondary to-accent animate-fade-in" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}