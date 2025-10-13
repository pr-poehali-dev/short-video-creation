import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Trend {
  id: number;
  hashtag: string;
  views: string;
  posts: number;
  growth: number;
  category: string;
}

export default function TrendsSection() {
  const [trends] = useState<Trend[]>([
    {
      id: 1,
      hashtag: '#FutureTech',
      views: '2.4M',
      posts: 12500,
      growth: 156,
      category: 'Технологии'
    },
    {
      id: 2,
      hashtag: '#CyberVibes',
      views: '1.8M',
      posts: 8900,
      growth: 134,
      category: 'Лайфстайл'
    },
    {
      id: 3,
      hashtag: '#NeonLife',
      views: '1.5M',
      posts: 7200,
      growth: 89,
      category: 'Искусство'
    },
    {
      id: 4,
      hashtag: '#DigitalArt',
      views: '980K',
      posts: 5600,
      growth: 67,
      category: 'Креатив'
    },
    {
      id: 5,
      hashtag: '#TechMusic',
      views: '756K',
      posts: 4300,
      growth: 45,
      category: 'Музыка'
    },
    {
      id: 6,
      hashtag: '#MetaVerse',
      views: '654K',
      posts: 3800,
      growth: 112,
      category: 'Технологии'
    },
    {
      id: 7,
      hashtag: '#AICreative',
      views: '543K',
      posts: 2900,
      growth: 98,
      category: 'ИИ'
    },
  ]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Технологии': 'from-primary to-secondary',
      'Лайфстайл': 'from-secondary to-accent',
      'Искусство': 'from-accent to-primary',
      'Креатив': 'from-primary/80 to-accent/80',
      'Музыка': 'from-secondary/80 to-primary/80',
      'ИИ': 'from-accent/80 to-secondary/80',
    };
    return colors[category] || 'from-primary to-secondary';
  };

  return (
    <div className="flex h-screen items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-md space-y-4 animate-fade-in">
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-accent animate-pulse-glow">
            <Icon name="TrendingUp" size={40} className="text-white" />
          </div>
          <h2 className="mb-2 font-['Orbitron'] text-xl md:text-2xl font-bold text-foreground">
            Актуальное сейчас
          </h2>
          <p className="text-sm text-muted-foreground">
            Узнайте, что популярно в сообществе
          </p>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto scrollbar-hide pr-2">
          {trends.map((trend, index) => (
            <div
              key={trend.id}
              className="group cursor-pointer rounded-2xl border border-border bg-card/30 p-4 backdrop-blur-sm transition-all hover:border-primary hover:bg-card/50 hover:scale-[1.02] active:scale-95 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 font-['Orbitron'] text-xl font-bold text-primary">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="font-['Orbitron'] text-base md:text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                      {trend.hashtag}
                    </p>
                    <span className={`rounded-full bg-gradient-to-r ${getCategoryColor(trend.category)} px-2 py-0.5 text-[10px] font-bold text-white`}>
                      {trend.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Eye" size={14} />
                      <span>{trend.views} просмотров</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Video" size={14} />
                      <span>{trend.posts.toLocaleString()} постов</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-green-500/20 to-green-400/20 px-2 py-1">
                    <Icon name="TrendingUp" size={12} className="text-green-400" />
                    <span className="font-['Orbitron'] text-xs font-bold text-green-400">
                      +{trend.growth}%
                    </span>
                  </div>
                  <Icon 
                    name="ChevronRight" 
                    size={20} 
                    className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border/50 bg-card/20 p-4 backdrop-blur-sm">
          <div className="mb-2 flex items-center gap-2">
            <Icon name="Sparkles" size={18} className="text-accent" />
            <h3 className="font-['Orbitron'] text-sm font-semibold text-foreground">
              Советы по трендам
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Используйте популярные хештеги, чтобы охватить больше людей и повысить видимость. Создавайте контент на популярные темы!
          </p>
        </div>
      </div>
    </div>
  );
}