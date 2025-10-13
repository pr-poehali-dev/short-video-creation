import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="relative h-screen w-full snap-start snap-always overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <img
          src={videoUrl}
          alt="Video content"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 pb-24">
        <div className="mb-4 flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage src={authorAvatar} alt={author} />
            <AvatarFallback className="bg-primary/20 font-['Orbitron'] text-primary">
              {author.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-['Orbitron'] text-sm font-semibold text-foreground">
              {author}
            </p>
          </div>
          <Button
            onClick={() => setIsFollowing(!isFollowing)}
            size="sm"
            variant={isFollowing ? 'outline' : 'default'}
            className={`rounded-full font-['Orbitron'] text-xs ${
              isFollowing
                ? 'border-primary text-primary hover:bg-primary/10'
                : 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>
        <p className="text-sm text-foreground/90">{description}</p>
      </div>

      <div className="absolute bottom-32 right-6 flex flex-col gap-6">
        <button
          onClick={handleLike}
          className="group flex flex-col items-center gap-1 transition-transform hover:scale-110"
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              isLiked
                ? 'bg-gradient-to-br from-secondary to-accent'
                : 'bg-background/30 backdrop-blur-sm'
            } transition-all`}
          >
            <Icon
              name={isLiked ? 'Heart' : 'Heart'}
              size={24}
              className={isLiked ? 'fill-current text-white' : 'text-white'}
            />
          </div>
          <span className="font-['Orbitron'] text-xs font-semibold text-white">
            {likes}
          </span>
        </button>

        <button className="group flex flex-col items-center gap-1 transition-transform hover:scale-110">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/30 backdrop-blur-sm">
            <Icon name="MessageCircle" size={24} className="text-white" />
          </div>
          <span className="font-['Orbitron'] text-xs font-semibold text-white">
            {initialComments}
          </span>
        </button>

        <button className="group flex flex-col items-center gap-1 transition-transform hover:scale-110">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/30 backdrop-blur-sm">
            <Icon name="Share2" size={24} className="text-white" />
          </div>
          <span className="font-['Orbitron'] text-xs font-semibold text-white">
            {shares}
          </span>
        </button>

        <button className="group flex flex-col items-center gap-1 transition-transform hover:scale-110">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
            <Icon name="Music" size={24} className="text-white" />
          </div>
        </button>
      </div>
    </div>
  );
}
