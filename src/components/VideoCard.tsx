import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import CommentsSheet from './CommentsSheet';

interface VideoCardProps {
  id: number;
  author: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  shares: number;
  videoUrl: string;
  description: string;
}

export default function VideoCard({
  author,
  authorAvatar,
  likes: initialLikes,
  comments: initialComments,
  shares,
  videoUrl,
  description,
}: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play();
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.7 }
    );

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    observer.observe(video);
    
    return () => {
      observer.disconnect();
      video.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="relative h-screen w-full snap-start snap-always overflow-hidden flex items-center justify-center bg-background">
      <div className="relative w-full max-w-[500px] h-full md:h-[calc(100vh-2rem)] md:max-h-[888px] flex items-center justify-center">
        <div className="relative w-full h-full md:rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary/20">
          <video
            ref={videoRef}
            src={videoUrl}
            className="h-full w-full object-cover"
            loop
            playsInline
            muted={isMuted}
            onClick={togglePlay}
          />
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm animate-fade-in">
                <Icon name="Play" size={40} className="text-white ml-1" />
              </div>
            </div>
          )}

          <button
            onClick={toggleMute}
            className="absolute right-4 top-4 md:right-6 md:top-20 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-background/30 backdrop-blur-sm transition-all hover:scale-110 z-40"
          >
            <Icon
              name={isMuted ? 'VolumeX' : 'Volume2'}
              size={18}
              className="text-white"
            />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pb-20 md:pb-24">
            <div className="mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-primary">
                <AvatarImage src={authorAvatar} alt={author} />
                <AvatarFallback className="bg-primary/20 font-['Orbitron'] text-primary text-xs md:text-sm">
                  {author.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-['Orbitron'] text-xs md:text-sm font-semibold text-foreground">
                  {author}
                </p>
              </div>
              <Button
                onClick={() => setIsFollowing(!isFollowing)}
                size="sm"
                variant={isFollowing ? 'outline' : 'default'}
                className={`rounded-full font-['Orbitron'] text-[10px] md:text-xs px-3 md:px-4 h-7 md:h-8 ${
                  isFollowing
                    ? 'border-primary text-primary hover:bg-primary/10'
                    : 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            </div>
            <p className="text-xs md:text-sm text-foreground/90">{description}</p>
          </div>

          <div className="absolute bottom-24 md:bottom-32 right-3 md:right-6 flex flex-col gap-4 md:gap-6">
            <button
              onClick={handleLike}
              className="group flex flex-col items-center gap-1 transition-transform hover:scale-110 active:scale-95"
            >
              <div
                className={`flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full ${
                  isLiked
                    ? 'bg-gradient-to-br from-secondary to-accent'
                    : 'bg-background/30 backdrop-blur-sm'
                } transition-all`}
              >
                <Icon
                  name={isLiked ? 'Heart' : 'Heart'}
                  size={22}
                  className={isLiked ? 'fill-current text-white' : 'text-white'}
                />
              </div>
              <span className="font-['Orbitron'] text-[10px] md:text-xs font-semibold text-white">
                {likes > 999 ? `${(likes / 1000).toFixed(1)}K` : likes}
              </span>
            </button>

            <button 
              onClick={() => setShowComments(true)}
              className="group flex flex-col items-center gap-1 transition-transform hover:scale-110 active:scale-95"
            >
              <div className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-background/30 backdrop-blur-sm">
                <Icon name="MessageCircle" size={22} className="text-white" />
              </div>
              <span className="font-['Orbitron'] text-[10px] md:text-xs font-semibold text-white">
                {initialComments}
              </span>
            </button>

            <button className="group flex flex-col items-center gap-1 transition-transform hover:scale-110 active:scale-95">
              <div className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-background/30 backdrop-blur-sm">
                <Icon name="Share2" size={22} className="text-white" />
              </div>
              <span className="font-['Orbitron'] text-[10px] md:text-xs font-semibold text-white">
                {shares}
              </span>
            </button>

            <button className="group flex flex-col items-center gap-1 transition-transform hover:scale-110 active:scale-95">
              <div className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                <Icon name="Music" size={22} className="text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <CommentsSheet
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        videoAuthor={author}
        totalComments={initialComments}
      />
    </div>
  );
}