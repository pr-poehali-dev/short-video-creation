import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarned: number;
  monthlyEarnings: number;
  currentTier: string;
  nextTierProgress: number;
}

interface ReferralUser {
  id: string;
  name: string;
  avatar: string;
  joinDate: string;
  earned: number;
  status: 'active' | 'inactive';
}

const ReferralProgram = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const referralCode = 'COSMIC2024';
  const referralLink = 'https://cosmicclips.app/ref/COSMIC2024';

  const stats: ReferralStats = {
    totalReferrals: 47,
    activeReferrals: 35,
    totalEarned: 12450,
    monthlyEarnings: 3200,
    currentTier: 'Звезда',
    nextTierProgress: 68
  };

  const tiers = [
    { name: 'Новичок', referrals: 0, bonus: '5%', icon: 'Sparkles', color: 'text-gray-400' },
    { name: 'Комета', referrals: 10, bonus: '10%', icon: 'Flame', color: 'text-blue-400' },
    { name: 'Звезда', referrals: 25, bonus: '15%', icon: 'Star', color: 'text-yellow-400' },
    { name: 'Галактика', referrals: 50, bonus: '20%', icon: 'Sparkles', color: 'text-purple-400' },
    { name: 'Вселенная', referrals: 100, bonus: '30%', icon: 'Zap', color: 'text-pink-400' }
  ];

  const referralUsers: ReferralUser[] = [
    { id: '1', name: 'Анна Космос', avatar: '🌟', joinDate: '15 окт 2024', earned: 450, status: 'active' },
    { id: '2', name: 'Макс Орбита', avatar: '🚀', joinDate: '12 окт 2024', earned: 380, status: 'active' },
    { id: '3', name: 'Лиза Звезда', avatar: '⭐', joinDate: '10 окт 2024', earned: 520, status: 'active' },
    { id: '4', name: 'Дима Комета', avatar: '☄️', joinDate: '8 окт 2024', earned: 290, status: 'inactive' },
    { id: '5', name: 'Катя Луна', avatar: '🌙', joinDate: '5 окт 2024', earned: 610, status: 'active' }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = (platform: string) => {
    const text = `Присоединяйся к CosmicClips! Используй мой код: ${referralCode}`;
    const url = referralLink;
    
    const shareUrls: { [key: string]: string } = {
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      vk: `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`
    };

    window.open(shareUrls[platform], '_blank');
  };

  return (
    <div className="h-screen overflow-y-auto bg-background pb-20">
      <div className="sticky top-0 z-10 bg-gradient-to-b from-background via-background to-transparent backdrop-blur-sm border-b border-border">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-['Orbitron'] font-bold bg-gradient-to-r from-primary via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Реферальная программа
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Приглашай друзей и зарабатывай вместе
          </p>
        </div>
      </div>

      <div className="px-4 space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-primary/20 to-pink-500/20 p-4 rounded-2xl border border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Users" size={20} className="text-primary" />
              <span className="text-xs text-muted-foreground">Всего рефералов</span>
            </div>
            <div className="text-2xl font-['Orbitron'] font-bold">{stats.totalReferrals}</div>
            <div className="text-xs text-green-500 mt-1">+5 за неделю</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-4 rounded-2xl border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Coins" size={20} className="text-yellow-500" />
              <span className="text-xs text-muted-foreground">Всего заработано</span>
            </div>
            <div className="text-2xl font-['Orbitron'] font-bold">{stats.totalEarned.toLocaleString()}</div>
            <div className="text-xs text-green-500 mt-1">+{stats.monthlyEarnings.toLocaleString()} за месяц</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4 rounded-2xl border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="UserCheck" size={20} className="text-green-500" />
              <span className="text-xs text-muted-foreground">Активных</span>
            </div>
            <div className="text-2xl font-['Orbitron'] font-bold">{stats.activeReferrals}</div>
            <div className="text-xs text-muted-foreground mt-1">{((stats.activeReferrals / stats.totalReferrals) * 100).toFixed(0)}% активность</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-2xl border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="TrendingUp" size={20} className="text-purple-500" />
              <span className="text-xs text-muted-foreground">Этот месяц</span>
            </div>
            <div className="text-2xl font-['Orbitron'] font-bold">{stats.monthlyEarnings.toLocaleString()}</div>
            <div className="text-xs text-green-500 mt-1">+28% к прошлому</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm p-5 rounded-2xl border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-['Orbitron'] font-bold text-lg">Твой реферальный код</h2>
            <div className="flex items-center gap-1 px-3 py-1 bg-primary/20 rounded-full">
              <Icon name="Star" size={14} className="text-yellow-500" />
              <span className="text-xs font-bold">{stats.currentTier}</span>
            </div>
          </div>

          <div className="bg-background/80 p-4 rounded-xl border border-border mb-3">
            <div className="flex items-center justify-between">
              <div className="font-['Orbitron'] text-2xl font-bold tracking-wider text-primary">
                {referralCode}
              </div>
              <button
                onClick={handleCopyCode}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <Icon name={copiedCode ? "Check" : "Copy"} size={16} />
                <span className="text-sm font-medium">{copiedCode ? 'Скопировано' : 'Копировать'}</span>
              </button>
            </div>
          </div>

          <div className="bg-background/80 p-3 rounded-xl border border-border mb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Icon name="Link" size={14} />
              <span>Реферальная ссылка</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm truncate flex-1 text-primary">{referralLink}</div>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-card border border-border rounded-lg hover:bg-background transition-all flex items-center gap-1.5"
              >
                <Icon name={copiedLink ? "Check" : "Copy"} size={14} />
                <span className="text-xs">{copiedLink ? 'OK' : 'Копировать'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleShare('telegram')}
              className="py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Icon name="Send" size={16} />
              <span className="text-sm font-medium">Telegram</span>
            </button>
            <button
              onClick={() => handleShare('whatsapp')}
              className="py-2.5 bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Icon name="MessageCircle" size={16} />
              <span className="text-sm font-medium">WhatsApp</span>
            </button>
            <button
              onClick={() => handleShare('vk')}
              className="py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Icon name="Share2" size={16} />
              <span className="text-sm font-medium">VK</span>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm p-5 rounded-2xl border border-border">
          <h2 className="font-['Orbitron'] font-bold text-lg mb-4">Уровни партнёра</h2>
          
          <div className="space-y-3">
            {tiers.map((tier, index) => {
              const isCompleted = stats.totalReferrals >= tier.referrals;
              const isCurrent = stats.currentTier === tier.name;
              
              return (
                <div
                  key={tier.name}
                  className={`p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-r from-primary/20 to-pink-500/20 border-primary'
                      : isCompleted
                      ? 'bg-card/50 border-green-500/30'
                      : 'bg-card/30 border-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl ${tier.color}`}>
                        <Icon name={tier.icon as any} size={24} />
                      </div>
                      <div>
                        <div className="font-['Orbitron'] font-bold flex items-center gap-2">
                          {tier.name}
                          {isCurrent && (
                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                              Текущий
                            </span>
                          )}
                          {isCompleted && !isCurrent && (
                            <Icon name="CheckCircle2" size={16} className="text-green-500" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {tier.referrals === 0 ? 'Начальный уровень' : `${tier.referrals}+ рефералов`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-['Orbitron'] font-bold text-lg text-primary">
                        {tier.bonus}
                      </div>
                      <div className="text-xs text-muted-foreground">бонус</div>
                    </div>
                  </div>
                  
                  {isCurrent && index < tiers.length - 1 && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">
                          До уровня "{tiers[index + 1].name}"
                        </span>
                        <span className="font-medium">
                          {stats.totalReferrals}/{tiers[index + 1].referrals}
                        </span>
                      </div>
                      <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-pink-500 transition-all duration-500"
                          style={{ width: `${(stats.totalReferrals / tiers[index + 1].referrals) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm p-5 rounded-2xl border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-['Orbitron'] font-bold text-lg">Твои рефералы</h2>
            <div className="px-3 py-1 bg-primary/20 rounded-full">
              <span className="text-sm font-medium">{referralUsers.length}</span>
            </div>
          </div>

          <div className="space-y-2">
            {referralUsers.map((user) => (
              <div
                key={user.id}
                className="p-3 bg-card/50 rounded-xl border border-border hover:bg-card transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{user.avatar}</div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {user.name}
                        {user.status === 'active' && (
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        С {user.joinDate}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-['Orbitron'] font-bold text-yellow-500">
                      +{user.earned}
                    </div>
                    <div className="text-xs text-muted-foreground">монет</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-pink-500/10 p-5 rounded-2xl border border-primary/30">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div className="flex-1">
              <h3 className="font-['Orbitron'] font-bold mb-2">Как работает программа</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Получай бонус от заработка каждого приглашённого друга</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Чем больше рефералов, тем выше твой уровень и процент бонуса</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Активные рефералы приносят пассивный доход каждый месяц</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Твой друг получает 500 монет за регистрацию по твоей ссылке</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;
