export default function NotificationsTab() {
  const notifications = [
    { text: 'CyberCreator подписался на вас', time: '2м назад', new: true },
    { text: 'Ваше видео набрало 10К просмотров!', time: '1ч назад', new: true },
    { text: 'NeonDancer оценил ваше видео', time: '3ч назад', new: true },
    { text: 'Новый трендовый хештег: #FutureTech', time: '5ч назад', new: false },
  ];

  return (
    <div className="flex h-screen items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-md space-y-3 md:space-y-4 animate-fade-in">
        <div className="text-center mb-6 md:mb-8">
          <div className="mx-auto mb-3 md:mb-4 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent relative">
            <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white animate-pulse-glow">
              3
            </div>
          </div>
          <h2 className="mb-2 font-['Orbitron'] text-2xl font-bold text-foreground">
            Уведомления
          </h2>
        </div>
        {notifications.map((notif, index) => (
          <div
            key={index}
            className={`rounded-2xl border p-4 backdrop-blur-sm transition-all hover:bg-card/50 cursor-pointer ${
              notif.new ? 'border-primary bg-card/30' : 'border-border bg-card/10'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="flex-1 text-sm text-foreground">{notif.text}</p>
              {notif.new && (
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{notif.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
