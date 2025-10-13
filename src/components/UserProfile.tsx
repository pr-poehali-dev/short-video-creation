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
}: UserProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide bg-background pb-20">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30" />
        
        <div className="px-6">
          <div className="relative -mt-20 mb-4">
            <div className="h-32 w-32 rounded-full border-4 border-background bg-card overflow-hidden">
              <img src={avatar} alt={username} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="mb-6">
            <h1 className="font-['Orbitron'] text-2xl font-bold text-foreground mb-1">
              {username}
            </h1>
            <p className="text-muted-foreground text-sm mb-3">@{username.toLowerCase()}</p>
            
            {bio && (
              <p className="text-foreground text-sm mb-4">{bio}</p>
            )}

            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <p className="font-['Orbitron'] text-xl font-bold text-foreground">{videos}</p>
                <p className="text-xs text-muted-foreground">Видео</p>
              </div>
              <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
                <p className="font-['Orbitron'] text-xl font-bold text-foreground">{followers}</p>
                <p className="text-xs text-muted-foreground">Подписчики</p>
              </div>
              <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
                <p className="font-['Orbitron'] text-xl font-bold text-foreground">{following}</p>
                <p className="text-xs text-muted-foreground">Подписки</p>
              </div>
            </div>

            {!isOwnProfile && (
              <div className="flex gap-3">
                <button
                  onClick={handleFollowToggle}
                  className={`flex-1 rounded-2xl py-3 font-['Orbitron'] font-bold transition-all ${
                    isFollowing
                      ? 'bg-card border border-border text-foreground hover:bg-card/70'
                      : 'bg-gradient-to-r from-primary via-secondary to-accent text-white hover:opacity-90'
                  }`}
                >
                  {isFollowing ? 'Подписан' : 'Подписаться'}
                </button>
                <button
                  onClick={onMessageClick}
                  className="flex-shrink-0 w-12 h-12 rounded-2xl border border-border bg-card hover:bg-card/70 transition-all flex items-center justify-center"
                >
                  <Icon name="MessageCircle" size={20} />
                </button>
              </div>
            )}

            {isOwnProfile && (
              <button className="w-full rounded-2xl border border-border bg-card py-3 font-['Orbitron'] font-bold text-foreground hover:bg-card/70 transition-all">
                Редактировать профиль
              </button>
            )}
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Grid" size={20} className="text-primary" />
              <h2 className="font-['Orbitron'] font-bold text-foreground">Видео</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                <div
                  key={index}
                  className="aspect-[9/16] rounded-xl bg-card/30 border border-border backdrop-blur-sm cursor-pointer hover:border-primary transition-all overflow-hidden"
                >
                  <div className="h-full flex items-center justify-center">
                    <Icon name="Play" size={24} className="text-muted-foreground" />
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