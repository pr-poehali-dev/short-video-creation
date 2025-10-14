import TrendsSection from '@/components/TrendsSection';
import Icon from '@/components/ui/icon';

interface SearchTabProps {
  onLeaderboardClick: () => void;
  onChallengesClick: () => void;
}

export default function SearchTab({ onLeaderboardClick, onChallengesClick }: SearchTabProps) {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <div className="flex items-center gap-2 px-3 md:px-4 pt-3 md:pt-4 pb-2 border-b border-border">
        <button
          onClick={onLeaderboardClick}
          className="flex-1 py-2.5 md:py-3 rounded-xl border border-border bg-card/50 hover:bg-card transition-all flex items-center justify-center gap-1.5 md:gap-2"
        >
          <Icon name="Trophy" size={18} className="text-yellow-500 md:w-5 md:h-5" />
          <span className="font-['Orbitron'] font-bold text-xs md:text-sm">Рейтинг</span>
        </button>
        <button
          onClick={onChallengesClick}
          className="flex-1 py-2.5 md:py-3 rounded-xl border border-border bg-card/50 hover:bg-card transition-all flex items-center justify-center gap-1.5 md:gap-2"
        >
          <Icon name="Award" size={18} className="text-primary md:w-5 md:h-5" />
          <span className="font-['Orbitron'] font-bold text-xs md:text-sm">Конкурсы</span>
        </button>
      </div>
      <div className="h-[calc(100vh-70px)] md:h-[calc(100vh-80px)] overflow-y-auto">
        <TrendsSection />
      </div>
    </div>
  );
}
