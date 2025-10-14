import { ReactNode } from 'react';
import Icon from '@/components/ui/icon';

interface ScreenWithBackButtonProps {
  onBack: () => void;
  children: ReactNode;
}

export default function ScreenWithBackButton({ onBack, children }: ScreenWithBackButtonProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <button
        onClick={onBack}
        className="absolute left-4 top-4 z-50 h-10 w-10 rounded-full bg-card/50 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-all"
      >
        <Icon name="ArrowLeft" size={24} />
      </button>
      {children}
    </div>
  );
}
