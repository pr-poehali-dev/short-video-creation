import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  reward: number;
  unlocked: boolean;
  category: 'content' | 'social' | 'engagement' | 'special';
}

const mockAchievements: Achievement[] = [
  {
    id: 1,
    title: 'Первое видео',
    description: 'Загрузите свое первое видео',
    icon: 'Video',
    progress: 1,
    total: 1,
    reward: 100,
    unlocked: true,
    category: 'content',
  },
  {
    id: 2,
    title: 'Популярность',
    description: 'Наберите 1000 подписчиков',
    icon: 'Users',
    progress: 245,
    total: 1000,
    reward: 500,
    unlocked: false,
    category: 'social',
  },
  {
    id: 3,
    title: 'Вирусный контент',
    description: 'Получите 100K просмотров на одном видео',
    icon: 'TrendingUp',
    progress: 45200,
    total: 100000,
    reward: 1000,
    unlocked: false,
    category: 'engagement',
  },
  {
    id: 4,
    title: 'Активный комментатор',
    description: 'Оставьте 50 комментариев',
    icon: 'MessageCircle',
    progress: 23,
    total: 50,
    reward: 200,
    unlocked: false,
    category: 'engagement',
  },
  {
    id: 5,
    title: 'Щедрый даритель',
    description: 'Отправьте 10 подарков',
    icon: 'Gift',
    progress: 3,
    total: 10,
    reward: 300,
    unlocked: false,
    category: 'social',
  },
  {
    id: 6,
    title: 'Стример',
    description: 'Проведите первый прямой эфир',
    icon: 'Radio',
    progress: 0,
    total: 1,
    reward: 500,
    unlocked: false,
    category: 'content',
  },
];

interface UserLevel {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  title: string;
}

export default function AchievementsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userLevel] = useState<UserLevel>({
    level: 12,
    currentXP: 2450,
    nextLevelXP: 3000,
    title: 'Опытный создатель',
  });

  const categories = [
    { id: 'all', label: 'Все', icon: 'Grid' },
    { id: 'content', label: 'Контент', icon: 'Video' },
    { id: 'social', label: 'Социальные', icon: 'Users' },
    { id: 'engagement', label: 'Активность', icon: 'Heart' },
  ];

  const filteredAchievements = mockAchievements.filter(
    (achievement) => selectedCategory === 'all' || achievement.category === selectedCategory
  );

  const totalUnlocked = mockAchievements.filter((a) => a.unlocked).length;
  const totalCoins = mockAchievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.reward, 0);

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide bg-background pb-20">
      <div className="px-6 pt-6 pb-4">
        <h1 className="font-['Orbitron'] text-2xl font-bold text-foreground mb-6">
          Достижения
        </h1>

        <div className="mb-6 rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                  <span className="font-['Orbitron'] text-2xl font-bold text-white">
                    {userLevel.level}
                  </span>
                </div>
                <div>
                  <h2 className="font-['Orbitron'] text-xl font-bold text-foreground">
                    Уровень {userLevel.level}
                  </h2>
                  <p className="text-sm text-muted-foreground">{userLevel.title}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end mb-1">
                <Icon name="Coins" size={20} className="text-yellow-500" />
                <span className="font-['Orbitron'] text-xl font-bold text-foreground">
                  {totalCoins}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Заработано монет</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Прогресс</span>
              <span className="font-['Orbitron'] font-bold text-foreground">
                {userLevel.currentXP} / {userLevel.nextLevelXP} XP
              </span>
            </div>
            <div className="h-2 rounded-full bg-card/50 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500"
                style={{ width: `${(userLevel.currentXP / userLevel.nextLevelXP) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-card/50 border border-border text-muted-foreground hover:border-primary'
              }`}
            >
              <Icon name={category.icon} size={16} />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Открыто: {totalUnlocked} из {mockAchievements.length}
          </p>
        </div>

        <div className="space-y-3">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`rounded-2xl border p-4 transition-all ${
                achievement.unlocked
                  ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/10'
                  : 'border-border bg-card/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 h-14 w-14 rounded-full flex items-center justify-center ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-primary via-secondary to-accent'
                      : 'bg-card/50 border border-border'
                  }`}
                >
                  <Icon
                    name={achievement.icon}
                    size={24}
                    className={achievement.unlocked ? 'text-white' : 'text-muted-foreground'}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-['Orbitron'] font-bold text-foreground">
                      {achievement.title}
                    </h3>
                    {achievement.unlocked && (
                      <Icon name="Check" size={20} className="text-primary flex-shrink-0 ml-2" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {achievement.description}
                  </p>

                  {!achievement.unlocked && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {achievement.progress} / {achievement.total}
                        </span>
                        <span className="font-bold text-foreground">
                          {Math.round((achievement.progress / achievement.total) * 100)}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-card/50 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                          style={{
                            width: `${Math.min((achievement.progress / achievement.total) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1 mt-2">
                    <Icon name="Coins" size={14} className="text-yellow-500" />
                    <span className="text-xs font-bold text-foreground">
                      +{achievement.reward} монет
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
