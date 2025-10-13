import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Creator {
  id: number;
  rank: number;
  username: string;
  avatar: string;
  score: number;
  followers: number;
  videos: number;
  category: string;
  change: number;
  badge?: string;
}

const mockCreators: Creator[] = [
  {
    id: 1,
    rank: 1,
    username: 'CyberCreator',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/fb14cd1e-e818-437f-8c4a-78714db04196.jpg',
    score: 95420,
    followers: 125400,
    videos: 342,
    category: 'Технологии',
    change: 2,
    badge: '👑',
  },
  {
    id: 2,
    rank: 2,
    username: 'NeonDancer',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/f6887c05-c23f-48ba-9c37-f82ecfc71348.jpg',
    score: 89230,
    followers: 98500,
    videos: 289,
    category: 'Танцы',
    change: -1,
    badge: '🥈',
  },
  {
    id: 3,
    rank: 3,
    username: 'TechBeats',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/b7be10cb-cafa-4dee-b9f7-6f4194b5c3c5.jpg',
    score: 76890,
    followers: 87200,
    videos: 256,
    category: 'Музыка',
    change: 1,
    badge: '🥉',
  },
  {
    id: 4,
    rank: 4,
    username: 'DigitalArtist',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/fb14cd1e-e818-437f-8c4a-78714db04196.jpg',
    score: 68450,
    followers: 72100,
    videos: 198,
    category: 'Искусство',
    change: 0,
  },
  {
    id: 5,
    rank: 5,
    username: 'FutureVlogger',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/f6887c05-c23f-48ba-9c37-f82ecfc71348.jpg',
    score: 61200,
    followers: 65800,
    videos: 167,
    category: 'Влоги',
    change: 3,
  },
];

const categories = [
  { id: 'all', label: 'Все категории', icon: 'Trophy' },
  { id: 'tech', label: 'Технологии', icon: 'Cpu' },
  { id: 'music', label: 'Музыка', icon: 'Music' },
  { id: 'dance', label: 'Танцы', icon: 'Sparkles' },
  { id: 'art', label: 'Искусство', icon: 'Palette' },
];

const periods = [
  { id: 'week', label: 'Неделя' },
  { id: 'month', label: 'Месяц' },
  { id: 'alltime', label: 'Всё время' },
];

export default function LeaderboardScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [currentUserRank] = useState(42);

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-300 to-gray-400';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-primary/20 to-secondary/20';
  };

  const getRankBorder = (rank: number) => {
    if (rank === 1) return 'border-yellow-400';
    if (rank === 2) return 'border-gray-300';
    if (rank === 3) return 'border-orange-400';
    return 'border-border';
  };

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide bg-background pb-20">
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-['Orbitron'] text-2xl font-bold text-foreground mb-1">
              Рейтинг создателей
            </h1>
            <p className="text-sm text-muted-foreground">
              Топ-креаторов платформы
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <Icon name="Trophy" size={24} className="text-white" />
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="font-['Orbitron'] font-bold text-white">#{currentUserRank}</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ваш рейтинг</p>
                <p className="font-['Orbitron'] text-lg font-bold text-foreground">
                  Место #{currentUserRank}
                </p>
              </div>
            </div>
            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold hover:opacity-90 transition-opacity">
              Улучшить
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedPeriod === period.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-card/50 border border-border text-muted-foreground hover:border-primary'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-card/50 border border-border text-muted-foreground hover:border-primary'
              }`}
            >
              <Icon name={category.icon} size={16} />
              {category.label}
            </button>
          ))}
        </div>

        {mockCreators.slice(0, 3).map((creator, index) => (
          <div
            key={creator.id}
            className={`mb-4 rounded-2xl border-2 ${getRankBorder(creator.rank)} bg-gradient-to-br ${getRankColor(creator.rank)} p-6 animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="text-5xl mb-2">{creator.badge}</div>
                <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-background flex items-center justify-center border-2 border-background">
                  <span className="font-['Orbitron'] text-sm font-bold text-foreground">
                    {creator.rank}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-['Orbitron'] text-lg font-bold text-foreground">
                    {creator.username}
                  </h3>
                  {creator.change > 0 && (
                    <div className="flex items-center gap-1 text-green-500">
                      <Icon name="TrendingUp" size={14} />
                      <span className="text-xs font-bold">+{creator.change}</span>
                    </div>
                  )}
                  {creator.change < 0 && (
                    <div className="flex items-center gap-1 text-red-500">
                      <Icon name="TrendingDown" size={14} />
                      <span className="text-xs font-bold">{creator.change}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{creator.category}</p>
                
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={12} className="text-yellow-500" />
                    <span className="font-bold text-foreground">
                      {creator.score.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Users" size={12} className="text-primary" />
                    <span className="text-muted-foreground">
                      {(creator.followers / 1000).toFixed(1)}K
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Video" size={12} className="text-secondary" />
                    <span className="text-muted-foreground">{creator.videos}</span>
                  </div>
                </div>
              </div>

              <button className="h-10 w-10 rounded-full border border-border bg-background/50 hover:bg-background transition-all flex items-center justify-center">
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>
          </div>
        ))}

        <div className="space-y-3">
          {mockCreators.slice(3).map((creator, index) => (
            <div
              key={creator.id}
              className="rounded-2xl border border-border bg-card/30 p-4 hover:border-primary transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="font-['Orbitron'] text-lg font-bold text-foreground">
                    {creator.rank}
                  </span>
                </div>

                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
                  <img src={creator.avatar} alt={creator.username} className="h-full w-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-['Orbitron'] font-bold text-foreground truncate">
                      {creator.username}
                    </h3>
                    {creator.change !== 0 && (
                      <div className={`flex items-center gap-1 ${creator.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <Icon name={creator.change > 0 ? 'TrendingUp' : 'TrendingDown'} size={12} />
                        <span className="text-xs font-bold">
                          {creator.change > 0 ? '+' : ''}{creator.change}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={10} className="text-yellow-500" />
                      <span>{creator.score.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Users" size={10} />
                      <span>{(creator.followers / 1000).toFixed(1)}K</span>
                    </div>
                  </div>
                </div>

                <Icon name="ChevronRight" size={20} className="text-muted-foreground flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border/50 bg-card/20 p-4">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong className="text-foreground">Как работает рейтинг:</strong>
              </p>
              <ul className="space-y-1 ml-4">
                <li>• Очки за просмотры, лайки и комментарии</li>
                <li>• Бонусы за активность подписчиков</li>
                <li>• Качество контента и вовлечённость</li>
                <li>• Регулярность публикаций</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
