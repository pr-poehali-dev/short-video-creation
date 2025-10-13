import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface EarningStats {
  totalEarnings: number;
  monthlyEarnings: number;
  todayEarnings: number;
  giftsReceived: number;
  subscribers: number;
  viewsRevenue: number;
}

interface Transaction {
  id: number;
  type: 'gift' | 'subscription' | 'donation' | 'views';
  from: string;
  amount: number;
  timestamp: string;
  giftName?: string;
}

const mockStats: EarningStats = {
  totalEarnings: 125340,
  monthlyEarnings: 23500,
  todayEarnings: 1250,
  giftsReceived: 456,
  subscribers: 1234,
  viewsRevenue: 8900,
};

const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: 'gift',
    from: 'User123',
    amount: 1000,
    timestamp: '5 мин назад',
    giftName: 'Корона 👑',
  },
  {
    id: 2,
    type: 'subscription',
    from: 'TechFan99',
    amount: 500,
    timestamp: '15 мин назад',
  },
  {
    id: 3,
    type: 'donation',
    from: 'CoolViewer',
    amount: 2000,
    timestamp: '1 ч назад',
  },
  {
    id: 4,
    type: 'views',
    from: 'Система',
    amount: 350,
    timestamp: '2 ч назад',
  },
];

export default function MonetizationDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'month' | 'all'>('month');

  const periods = [
    { id: 'today', label: 'Сегодня' },
    { id: 'month', label: 'Месяц' },
    { id: 'all', label: 'Все время' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'gift':
        return 'Gift';
      case 'subscription':
        return 'Star';
      case 'donation':
        return 'Heart';
      case 'views':
        return 'Eye';
      default:
        return 'DollarSign';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'gift':
        return 'Подарок';
      case 'subscription':
        return 'Подписка';
      case 'donation':
        return 'Донат';
      case 'views':
        return 'Просмотры';
      default:
        return type;
    }
  };

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide bg-background pb-20">
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-['Orbitron'] text-2xl font-bold text-foreground">
            Монетизация
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold hover:opacity-90 transition-opacity">
            <Icon name="Download" size={16} />
            Вывести
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Общий баланс</p>
              <div className="flex items-center gap-2">
                <Icon name="Coins" size={28} className="text-yellow-500" />
                <span className="font-['Orbitron'] text-3xl font-bold text-foreground">
                  {mockStats.totalEarnings.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <Icon name="TrendingUp" size={32} className="text-white" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Сегодня</p>
              <p className="font-['Orbitron'] text-lg font-bold text-foreground">
                +{mockStats.todayEarnings}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">За месяц</p>
              <p className="font-['Orbitron'] text-lg font-bold text-primary">
                +{mockStats.monthlyEarnings.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Подписчики</p>
              <p className="font-['Orbitron'] text-lg font-bold text-secondary">
                {mockStats.subscribers}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-2xl border border-border bg-card/30 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <Icon name="Gift" size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Подарки</p>
                <p className="font-['Orbitron'] text-xl font-bold text-foreground">
                  {mockStats.giftsReceived}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/30 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Icon name="Eye" size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Просмотры</p>
                <p className="font-['Orbitron'] text-xl font-bold text-foreground">
                  {mockStats.viewsRevenue}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="font-['Orbitron'] text-lg font-bold text-foreground mb-3">
            История транзакций
          </h2>

          <div className="flex gap-2 mb-4">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id as any)}
                className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedPeriod === period.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-card/50 border border-border text-muted-foreground hover:border-primary'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {mockTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="rounded-2xl border border-border bg-card/30 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name={getTypeIcon(transaction.type)} size={20} className="text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-['Orbitron'] font-bold text-foreground text-sm">
                      {getTypeLabel(transaction.type)}
                    </span>
                    {transaction.giftName && (
                      <span className="text-xs text-muted-foreground">
                        {transaction.giftName}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      от {transaction.from}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {transaction.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <Icon name="Coins" size={16} className="text-yellow-500" />
                  <span className="font-['Orbitron'] text-lg font-bold text-foreground">
                    +{transaction.amount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border/50 bg-card/20 p-4">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong className="text-foreground">Как заработать больше:</strong>
              </p>
              <ul className="space-y-1 ml-4">
                <li>• Проводите регулярные прямые эфиры</li>
                <li>• Загружайте качественный контент</li>
                <li>• Взаимодействуйте с подписчиками</li>
                <li>• Используйте трендовые хештеги</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
