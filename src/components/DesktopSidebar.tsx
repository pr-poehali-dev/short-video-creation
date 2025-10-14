import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface DesktopSidebarProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  onLiveClick: () => void;
  onLeaderboardClick: () => void;
  onChallengesClick: () => void;
}

export default function DesktopSidebar({ 
  activeTab, 
  onTabChange, 
  onLiveClick,
  onLeaderboardClick,
  onChallengesClick 
}: DesktopSidebarProps) {
  const menuItems = [
    { id: 'feed', icon: 'Home', label: 'Рекомендации' },
    { id: 'search', icon: 'Compass', label: 'Смотреть' },
    { id: 'following', icon: 'Users', label: 'Подписки' },
    { id: 'live', icon: 'Radio', label: 'Трансляция', isLive: true },
    { id: 'upload', icon: 'Plus', label: 'Загрузить' },
    { id: 'profile', icon: 'User', label: 'Профиль' },
  ];

  const handleItemClick = (id: string) => {
    if (id === 'live') {
      onLiveClick();
    } else if (id === 'following') {
      // Пока не реализовано
      onTabChange('feed');
    } else {
      onTabChange(id);
    }
  };

  return (
    <div className="hidden lg:flex flex-col w-60 h-screen bg-background border-r border-border fixed left-0 top-0 p-4">
      <div className="mb-8 px-2">
        <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text font-['Orbitron'] text-2xl font-black tracking-wider text-transparent">
          TikTok
        </h1>
      </div>

      <div className="mb-2 px-2">
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск"
            className="w-full pl-10 pr-4 py-2 bg-card/50 border border-border rounded-full text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === item.id
                ? 'bg-card/50 text-primary font-bold'
                : 'text-foreground hover:bg-card/30'
            }`}
          >
            <Icon name={item.icon as any} size={24} />
            <span className="text-base">{item.label}</span>
            {item.isLive && (
              <div className="ml-auto h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>
        ))}

        <div className="pt-4 mt-4 border-t border-border space-y-1">
          <button
            onClick={onLeaderboardClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-card/30 transition-all"
          >
            <Icon name="Trophy" size={24} className="text-yellow-500" />
            <span className="text-base">Рейтинг</span>
          </button>
          <button
            onClick={onChallengesClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-card/30 transition-all"
          >
            <Icon name="Award" size={24} className="text-primary" />
            <span className="text-base">Конкурсы</span>
          </button>
        </div>
      </nav>

      <div className="pt-4 border-t border-border">
        <Button 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-['Orbitron'] font-bold"
        >
          Войти
        </Button>
      </div>

      <div className="pt-4 space-y-2">
        <div className="text-xs text-muted-foreground space-y-1">
          <p className="font-semibold">Компания</p>
          <div className="space-y-0.5">
            <a href="#" className="block hover:text-foreground">Программа</a>
            <a href="#" className="block hover:text-foreground">Условия и политика</a>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">© 2025 TikTok</p>
      </div>
    </div>
  );
}
