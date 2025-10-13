import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (email: string, password: string, username?: string) => void;
  onSwitchMode: () => void;
  onBack: () => void;
}

export default function AuthForm({ mode, onSubmit, onSwitchMode, onBack }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onSubmit(email, password, username);
      setIsLoading(false);
    }, 1000);
  };

  const isRegister = mode === 'register';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      
      <div className="relative w-full max-w-md">
        <button
          onClick={onBack}
          className="absolute -top-16 left-0 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="ArrowLeft" size={20} />
          <span>Назад</span>
        </button>

        <div className="rounded-3xl border border-border bg-background/80 backdrop-blur-xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent mb-4">
              <Icon name={isRegister ? 'UserPlus' : 'LogIn'} size={32} className="text-white" />
            </div>
            <h2 className="font-['Orbitron'] text-3xl font-bold text-foreground mb-2">
              {isRegister ? 'Регистрация' : 'Вход в аккаунт'}
            </h2>
            <p className="text-muted-foreground">
              {isRegister 
                ? 'Создайте аккаунт и начните делиться контентом' 
                : 'Добро пожаловать обратно!'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Имя пользователя
                </label>
                <Input
                  type="text"
                  placeholder="Ваше имя"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-12 rounded-xl border-border bg-card/50 backdrop-blur-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-border bg-card/50 backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Пароль
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-12 rounded-xl border-border bg-card/50 backdrop-blur-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-white font-['Orbitron'] font-bold text-base hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Загрузка...
                </>
              ) : (
                isRegister ? 'Создать аккаунт' : 'Войти'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onSwitchMode}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isRegister 
                ? 'Уже есть аккаунт? Войти' 
                : 'Нет аккаунта? Зарегистрироваться'}
            </button>
          </div>

          {!isRegister && (
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Забыли пароль?
              </a>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground mb-4">
              Или продолжите с
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-border bg-card/50 hover:bg-card transition-all">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-border bg-card/50 hover:bg-card transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span className="text-sm font-medium">GitHub</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Продолжая, вы соглашаетесь с{' '}
          <a href="#" className="text-primary hover:underline">Условиями использования</a>
          {' '}и{' '}
          <a href="#" className="text-primary hover:underline">Политикой конфиденциальности</a>
        </p>
      </div>
    </div>
  );
}
