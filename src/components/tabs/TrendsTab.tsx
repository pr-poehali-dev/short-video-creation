export default function TrendsTab() {
  return (
    <div className="flex h-screen items-center justify-center px-6">
      <div className="w-full max-w-md space-y-4 animate-fade-in">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-accent">
            <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h2 className="mb-2 font-['Orbitron'] text-2xl font-bold text-foreground">
            Актуальное сейчас
          </h2>
        </div>
        {['#FutureTech', '#CyberVibes', '#NeonLife', '#DigitalArt', '#TechMusic'].map((tag, index) => (
          <div
            key={tag}
            className="rounded-2xl border border-border bg-card/30 p-4 backdrop-blur-sm transition-all hover:bg-card/50 hover:border-primary cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-['Orbitron'] text-lg font-bold text-primary">{tag}</p>
                <p className="text-sm text-muted-foreground">
                  {Math.floor(Math.random() * 500 + 100)}К просмотров
                </p>
              </div>
              <div className="text-2xl">🔥</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
