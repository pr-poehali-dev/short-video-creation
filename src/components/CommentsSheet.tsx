import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  timeAgo: string;
  isLiked?: boolean;
}

interface CommentsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  videoAuthor: string;
  totalComments: number;
}

export default function CommentsSheet({ 
  isOpen, 
  onClose, 
  videoAuthor,
  totalComments 
}: CommentsSheetProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'TechEnthusiast',
      avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/fb14cd1e-e818-437f-8c4a-78714db04196.jpg',
      text: 'This is absolutely amazing! 🔥 Love the aesthetic!',
      likes: 124,
      timeAgo: '2h ago',
      isLiked: false,
    },
    {
      id: 2,
      author: 'CreativeVibes',
      avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/f6887c05-c23f-48ba-9c37-f82ecfc71348.jpg',
      text: 'Can you share how you made this? Tutorial please! 🙏',
      likes: 89,
      timeAgo: '4h ago',
      isLiked: false,
    },
    {
      id: 3,
      author: 'NeonDreamer',
      avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/b7be10cb-cafa-4dee-b9f7-6f4194b5c3c5.jpg',
      text: 'Pure talent right here 💜 Keep creating!',
      likes: 56,
      timeAgo: '6h ago',
      isLiked: true,
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleLikeComment = (id: number) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: 'You',
      avatar: '',
      text: newComment,
      likes: 0,
      timeAgo: 'Just now',
      isLiked: false,
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="bottom" 
        className="h-[85vh] rounded-t-3xl border-t-2 border-border bg-background p-0"
      >
        <SheetHeader className="border-b border-border/50 px-6 py-4">
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="MessageCircle" size={24} className="text-primary" />
              <span className="font-['Orbitron'] text-lg font-bold">Comments</span>
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                {totalComments}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="rounded-full p-1 transition-colors hover:bg-card/50"
            >
              <Icon name="X" size={20} className="text-muted-foreground" />
            </button>
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-[calc(100%-140px)] flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 animate-fade-in">
                  <Avatar className="h-9 w-9 border-2 border-primary/30">
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback className="bg-primary/20 text-xs font-['Orbitron'] text-primary">
                      {comment.author.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="rounded-2xl bg-card/30 px-4 py-3 backdrop-blur-sm">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-['Orbitron'] text-sm font-semibold text-foreground">
                          {comment.author}
                        </span>
                        {comment.author === videoAuthor && (
                          <span className="rounded-full bg-gradient-to-r from-primary to-secondary px-2 py-0.5 text-[10px] font-bold text-white">
                            Creator
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-foreground/90">{comment.text}</p>
                    </div>

                    <div className="mt-2 flex items-center gap-4 px-2">
                      <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className="flex items-center gap-1 transition-transform active:scale-95"
                      >
                        <Icon
                          name="Heart"
                          size={14}
                          className={`${
                            comment.isLiked ? 'fill-current text-secondary' : 'text-muted-foreground'
                          }`}
                        />
                        <span className={`text-xs font-medium ${
                          comment.isLiked ? 'text-secondary' : 'text-muted-foreground'
                        }`}>
                          {comment.likes}
                        </span>
                      </button>
                      <button className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border/50 bg-background/95 p-4 backdrop-blur-xl">
            <div className="flex gap-3">
              <Avatar className="h-9 w-9 border-2 border-primary">
                <AvatarFallback className="bg-primary/20 font-['Orbitron'] text-xs text-primary">
                  YU
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  className="rounded-2xl border-border bg-card/50 text-sm backdrop-blur-sm focus:border-primary"
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  size="icon"
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50"
                >
                  <Icon name="Send" size={18} className="text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
