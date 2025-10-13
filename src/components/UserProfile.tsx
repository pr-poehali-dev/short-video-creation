import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface UserProfileProps {
  username: string;
  avatar: string;
  followers: number;
  following: number;
  videos: number;
  bio?: string;
  isOwnProfile?: boolean;
  onMessageClick?: () => void;
  onAchievementsClick?: () => void;
  onMonetizationClick?: () => void;
  onReferralsClick?: () => void;
}

export default function UserProfile({
  username,
  avatar,
  followers,
  following,
  videos,
  bio,
  isOwnProfile = false,
  onMessageClick,
  onAchievementsClick,
  onMonetizationClick,
  onReferralsClick,
}: UserProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [userLevel] = useState(12);
  const [userCoins] = useState(5000);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide bg-background pb-20">
      <div className="relative">
        <div className="h-36 md:h-48 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30" />
        
        <div className="px-4 md:px-6">
          <div className="relative -mt-16 md:-mt-20 mb-3 md:mb-4">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-background bg-card overflow-hidden">
              <img src={avatar} alt={username} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="mb-4 md:mb-6">
            <h1 className="font-['Orbitron'] text-xl md:text-2xl font-bold text-foreground mb-1">
              {username}
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm mb-2 md:mb-3">@{username.toLowerCase()}</p>
            
            {bio && (
              <p className="text-foreground text-xs md:text-sm mb-3 md:mb-4">{bio}</p>
            )}

            {isOwnProfile && (
              <>
                <div className="grid grid-cols-2 gap-2 md:gap-3 mb-2 md:mb-3">
                  <button
                    onClick={onAchievementsClick}
                    className="rounded-xl md:rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-secondary/10 p-3 md:p-4 hover:border-primary transition-all"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                        <span className="font-['Orbitron'] text-base md:text-lg font-bold text-white">{userLevel}</span>
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] md:text-xs text-muted-foreground">Уровень</p>
                        <p className="font-['Orbitron'] text-sm md:text-base font-bold text-foreground">{userLevel}</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={onMonetizationClick}
                    className="rounded-xl md:rounded-2xl border border-border bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-3 md:p-4 hover:border-yellow-500 transition-all"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <Icon name="Coins" size={28} className="text-yellow-500 flex-shrink-0 md:w-8 md:h-8" />
                      <div className="text-left">
                        <p className="text-[10px] md:text-xs text-muted-foreground">Монеты</p>
                        <p className="font-['Orbitron'] text-sm md:text-base font-bold text-foreground">{userCoins}</p>
                      </div>
                    </div>
                  </button>
                </div>

                <button
                  onClick={onReferralsClick}
                  className="w-full rounded-xl md:rounded-2xl border border-border bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 p-3 md:p-4 hover:border-green-500 transition-all mb-4 md:mb-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Icon name="Users" size={28} className="text-green-500 flex-shrink-0 md:w-8 md:h-8" />
                      <div className="text-left">
                        <p className="font-['Orbitron'] text-sm md:text-base font-bold text-foreground">Реферальная программа</p>
                        <p className="text-[10px] md:text-xs text-muted-foreground">Приглашай друзей и зарабатывай</p>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={18} className="text-muted-foreground md:w-5 md:h-5" />
                  </div>
                </button>
              </>
            )}

            <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
              <div className="text-center">
                <p className="font-['Orbitron'] text-lg md:text-xl font-bold text-foreground">{videos}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Видео</p>
              </div>
              <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
                <p className="font-['Orbitron'] text-lg md:text-xl font-bold text-foreground">{followers}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Подписчики</p>
              </div>
              <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
                <p className="font-['Orbitron'] text-lg md:text-xl font-bold text-foreground">{following}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Подписки</p>
              </div>
            </div>

            {!isOwnProfile && (
              <div className="flex gap-2 md:gap-3">
                <button
                  onClick={handleFollowToggle}
                  className={`flex-1 rounded-xl md:rounded-2xl py-2.5 md:py-3 font-['Orbitron'] text-sm md:text-base font-bold transition-all ${
                    isFollowing
                      ? 'bg-card border border-border text-foreground hover:bg-card/70'
                      : 'bg-gradient-to-r from-primary via-secondary to-accent text-white hover:opacity-90'
                  }`}
                >
                  {isFollowing ? 'Подписан' : 'Подписаться'}
                </button>
                <button
                  onClick={onMessageClick}
                  className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-border bg-card hover:bg-card/70 transition-all flex items-center justify-center"
                >
                  <Icon name="MessageCircle" size={18} className="md:w-5 md:h-5" />
                </button>
              </div>
            )}

            {isOwnProfile && (
              <button className="w-full rounded-xl md:rounded-2xl border border-border bg-card py-2.5 md:py-3 font-['Orbitron'] text-sm md:text-base font-bold text-foreground hover:bg-card/70 transition-all">
                Редактировать профиль
              </button>
            )}
          </div>

          <div className="border-t border-border pt-4 md:pt-6">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Icon name="Grid" size={18} className="text-primary md:w-5 md:h-5" />
              <h2 className="font-['Orbitron'] text-sm md:text-base font-bold text-foreground">Видео</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-1.5 md:gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                <div
                  key={index}
                  className="aspect-[9/16] rounded-lg md:rounded-xl bg-card/30 border border-border backdrop-blur-sm cursor-pointer hover:border-primary transition-all overflow-hidden"
                >
                  <div className="h-full flex items-center justify-center">
                    <Icon name="Play" size={20} className="text-muted-foreground md:w-6 md:h-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}