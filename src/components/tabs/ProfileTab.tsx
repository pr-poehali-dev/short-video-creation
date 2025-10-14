import UserProfile from '@/components/UserProfile';
import Icon from '@/components/ui/icon';

interface User {
  username: string;
}

interface ProfileTabProps {
  currentUser: User | null;
  onLogout: () => void;
  onAchievementsClick: () => void;
  onMonetizationClick: () => void;
  onReferralsClick: () => void;
}

export default function ProfileTab({
  currentUser,
  onLogout,
  onAchievementsClick,
  onMonetizationClick,
  onReferralsClick,
}: ProfileTabProps) {
  return (
    <div className="relative">
      <button
        onClick={onLogout}
        className="absolute right-4 top-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border hover:bg-card transition-all"
      >
        <Icon name="LogOut" size={18} />
        <span className="text-sm font-medium">Выйти</span>
      </button>
      <UserProfile
        username={currentUser?.username || "YourName"}
        avatar="https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/fb14cd1e-e818-437f-8c4a-78714db04196.jpg"
        followers={1200}
        following={856}
        videos={24}
        bio="🚀 Создатель контента | Техно-энтузиаст | Цифровой художник"
        isOwnProfile={true}
        onAchievementsClick={onAchievementsClick}
        onMonetizationClick={onMonetizationClick}
        onReferralsClick={onReferralsClick}
      />
    </div>
  );
}
