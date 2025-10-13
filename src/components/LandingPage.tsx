import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function LandingPage({ onLogin, onRegister }: LandingPageProps) {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: 'Video',
      title: 'Короткие видео',
      description: 'Смотрите и создавайте вертикальные видео',
    },
    {
      icon: 'Radio',
      title: 'Прямые эфиры',
      description: 'Общайтесь со зрителями в реальном времени',
    },
    {
      icon: 'Gift',
      title: 'Виртуальные подарки',
      description: 'Поддерживайте любимых авторов',
    },
    {
      icon: 'Trophy',
      title: 'Достижения',
      description: 'Получайте награды за активность',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 overflow-y-auto">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      
      <div className="relative">
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                  <Icon name="Play" size={24} className="text-white" />
                </div>
                <h1 className="font-['Orbitron'] text-2xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Peeky
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onLogin}
                  className="px-6 py-2 rounded-full border border-border hover:bg-card/50 transition-all font-medium text-foreground"
                >
                  Войти
                </button>
                <button
                  onClick={onRegister}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold hover:opacity-90 transition-opacity"
                >
                  Регистрация
                </button>
              </div>
            </div>
          </div>
        </header>

        <section className="pt-32 pb-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-['Orbitron'] text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
                Создавай. Делись. Вдохновляй.
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Присоединяйся к сообществу креативных людей. Делись короткими видео, проводи прямые эфиры и зарабатывай на своём творчестве.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onRegister}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-['Orbitron'] font-bold text-lg hover:opacity-90 transition-opacity hover:scale-105 active:scale-95 transform"
                >
                  Начать сейчас
                </button>
                <button
                  onClick={onLogin}
                  className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-border hover:bg-card/50 transition-all font-['Orbitron'] font-bold text-lg"
                >
                  У меня есть аккаунт
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 hover:border-primary transition-all hover:scale-105 cursor-pointer"
                  onClick={() => setCurrentFeature(index)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                    <Icon name={feature.icon} size={28} className="text-primary" />
                  </div>
                  <h3 className="font-['Orbitron'] text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="font-['Orbitron'] text-4xl font-bold text-foreground mb-6">
                  Создавай контент, который вдохновляет
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Простая загрузка</h4>
                      <p className="text-muted-foreground">Загружай видео одним нажатием</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Прямые эфиры</h4>
                      <p className="text-muted-foreground">Общайся с аудиторией в реальном времени</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Монетизация</h4>
                      <p className="text-muted-foreground">Зарабатывай на своём творчестве</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-secondary/10 aspect-[9/16] max-w-sm mx-auto overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center animate-pulse">
                    <Icon name="Play" size={40} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-12">
              <h3 className="font-['Orbitron'] text-3xl md:text-4xl font-bold text-foreground mb-4">
                Готов начать?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Присоединяйся к тысячам создателей, которые уже делятся своим творчеством на Peeky
              </p>
              <button
                onClick={onRegister}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-['Orbitron'] font-bold text-lg hover:opacity-90 transition-opacity hover:scale-105 active:scale-95 transform"
              >
                Создать аккаунт бесплатно
              </button>
            </div>
          </div>
        </section>

        <footer className="border-t border-border bg-background/80 backdrop-blur-xl py-8 px-4">
          <div className="max-w-7xl mx-auto text-center text-muted-foreground">
            <p className="mb-2">© 2024 Peeky. Все права защищены.</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <a href="#" className="hover:text-primary transition-colors">О нас</a>
              <a href="#" className="hover:text-primary transition-colors">Помощь</a>
              <a href="#" className="hover:text-primary transition-colors">Конфиденциальность</a>
              <a href="#" className="hover:text-primary transition-colors">Условия</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
