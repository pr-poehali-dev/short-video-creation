import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Challenge {
  id: number;
  title: string;
  description: string;
  prize: number;
  prizeType: 'coins' | 'money' | 'item';
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  participants: number;
  endDate: string;
  timeLeft: string;
  progress?: number;
  total?: number;
  status: 'active' | 'completed' | 'upcoming';
  icon: string;
}

const mockChallenges: Challenge[] = [
  {
    id: 1,
    title: 'Миллион просмотров',
    description: 'Набери 1 млн просмотров за неделю',
    prize: 50000,
    prizeType: 'coins',
    category: 'Популярность',
    difficulty: 'hard',
    participants: 1234,
    endDate: '2024-12-31',
    timeLeft: '3 дня',
    progress: 456000,
    total: 1000000,
    status: 'active',
    icon: 'Eye',
  },
  {
    id: 2,
    title: 'Танцевальный челлендж',
    description: 'Создай видео с танцем #DanceChallenge',
    prize: 10000,
    prizeType: 'coins',
    category: 'Танцы',
    difficulty: 'easy',
    participants: 5678,
    endDate: '2024-12-25',
    timeLeft: '7 дней',
    progress: 1,
    total: 1,
    status: 'completed',
    icon: 'Music',
  },
  {
    id: 3,
    title: 'Топ недели',
    description: 'Попади в топ-10 создателей недели',
    prize: 100000,
    prizeType: 'coins',
    category: 'Рейтинг',
    difficulty: 'hard',
    participants: 892,
    endDate: '2024-12-28',
    timeLeft: '5 дней',
    progress: 15,
    total: 10,
    status: 'active',
    icon: 'Trophy',
  },
  {
    id: 4,
    title: 'Подарочная щедрость',
    description: 'Отправь 50 подарков в прямых эфирах',
    prize: 25000,
    prizeType: 'coins',
    category: 'Социальность',
    difficulty: 'medium',
    participants: 3456,
    endDate: '2024-12-30',
    timeLeft: '2 дня',
    progress: 23,
    total: 50,
    status: 'active',
    icon: 'Gift',
  },
  {
    id: 5,
    title: 'Новогодний конкурс',
    description: 'Создай лучшее новогоднее видео',
    prize: 500,
    prizeType: 'money',
    category: 'Конкурс',
    difficulty: 'medium',
    participants: 0,
    endDate: '2025-01-05',
    timeLeft: 'Скоро',
    status: 'upcoming',
    icon: 'Sparkles',
  },
];

const difficulties = {
  easy: { label: 'Лёгкий', color: 'from-green-400 to-green-600' },
  medium: { label: 'Средний', color: 'from-yellow-400 to-yellow-600' },
  hard: { label: 'Сложный', color: 'from-red-400 to-red-600' },
};

export default function ChallengesScreen() {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'completed' | 'upcoming'>('active');

  const statuses = [
    { id: 'all', label: 'Все' },
    { id: 'active', label: 'Активные' },
    { id: 'upcoming', label: 'Скоро' },
    { id: 'completed', label: 'Завершённые' },
  ];

  const filteredChallenges = mockChallenges.filter(
    (challenge) => selectedStatus === 'all' || challenge.status === selectedStatus
  );

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide bg-background pb-20">
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-['Orbitron'] text-2xl font-bold text-foreground mb-1">
              Конкурсы и челленджи
            </h1>
            <p className="text-sm text-muted-foreground">
              Участвуй и выигрывай призы
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
            <Icon name="Award" size={24} className="text-white" />
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-border bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Icon name="Star" size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-['Orbitron'] text-lg font-bold text-foreground mb-1">
                Твоя статистика
              </h3>
              <p className="text-sm text-muted-foreground">
                Активных конкурсов: {mockChallenges.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center rounded-xl bg-card/50 p-3">
              <p className="font-['Orbitron'] text-2xl font-bold text-foreground">
                {mockChallenges.filter(c => c.status === 'completed').length}
              </p>
              <p className="text-xs text-muted-foreground">Завершено</p>
            </div>
            <div className="text-center rounded-xl bg-card/50 p-3">
              <p className="font-['Orbitron'] text-2xl font-bold text-primary">3</p>
              <p className="text-xs text-muted-foreground">В процессе</p>
            </div>
            <div className="text-center rounded-xl bg-card/50 p-3">
              <p className="font-['Orbitron'] text-2xl font-bold text-secondary">85K</p>
              <p className="text-xs text-muted-foreground">Выиграно</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
          {statuses.map((status) => (
            <button
              key={status.id}
              onClick={() => setSelectedStatus(status.id as any)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedStatus === status.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-card/50 border border-border text-muted-foreground hover:border-primary'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredChallenges.map((challenge, index) => (
            <div
              key={challenge.id}
              className={`rounded-2xl border overflow-hidden transition-all hover:scale-[1.02] cursor-pointer ${
                challenge.status === 'completed'
                  ? 'border-green-500/50 bg-green-500/10'
                  : challenge.status === 'upcoming'
                  ? 'border-border bg-card/20'
                  : 'border-border bg-card/30 hover:border-primary'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${difficulties[challenge.difficulty].color} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={challenge.icon} size={28} className="text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-['Orbitron'] text-lg font-bold text-foreground">
                        {challenge.title}
                      </h3>
                      {challenge.status === 'completed' && (
                        <Icon name="CheckCircle" size={24} className="text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {challenge.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`px-2 py-1 rounded-full bg-gradient-to-r ${difficulties[challenge.difficulty].color} text-white font-bold`}>
                        {difficulties[challenge.difficulty].label}
                      </span>
                      <span className="text-muted-foreground">{challenge.category}</span>
                    </div>
                  </div>
                </div>

                {challenge.progress !== undefined && challenge.total !== undefined && challenge.status === 'active' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Прогресс</span>
                      <span className="font-bold text-foreground">
                        {challenge.progress.toLocaleString()} / {challenge.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-card/50 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                        style={{ width: `${Math.min((challenge.progress / challenge.total) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Icon name={challenge.prizeType === 'money' ? 'DollarSign' : 'Coins'} size={18} className={challenge.prizeType === 'money' ? 'text-green-500' : 'text-yellow-500'} />
                      <span className="font-['Orbitron'] font-bold text-foreground">
                        {challenge.prizeType === 'money' ? `$${challenge.prize}` : challenge.prize.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Users" size={14} />
                      <span className="text-xs">{challenge.participants.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {challenge.status === 'upcoming' ? (
                      <span className="text-xs font-medium text-muted-foreground">
                        {challenge.timeLeft}
                      </span>
                    ) : (
                      <>
                        <Icon name="Clock" size={14} className="text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground">
                          {challenge.timeLeft}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {challenge.status === 'active' && (
                  <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-['Orbitron'] font-bold hover:opacity-90 transition-opacity">
                    Участвовать
                  </button>
                )}

                {challenge.status === 'upcoming' && (
                  <button className="w-full mt-4 py-3 rounded-xl border border-border bg-card/50 text-foreground font-['Orbitron'] font-bold hover:bg-card transition-all">
                    Напомнить
                  </button>
                )}

                {challenge.status === 'completed' && (
                  <div className="w-full mt-4 py-3 rounded-xl bg-green-500/20 border border-green-500/50 text-green-500 font-['Orbitron'] font-bold text-center">
                    Завершено
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border/50 bg-card/20 p-4">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong className="text-foreground">Правила конкурсов:</strong>
              </p>
              <ul className="space-y-1 ml-4">
                <li>• Выполняй задания до окончания срока</li>
                <li>• Призы начисляются автоматически</li>
                <li>• Можно участвовать в нескольких конкурсах</li>
                <li>• Следи за новыми челленджами каждую неделю</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
