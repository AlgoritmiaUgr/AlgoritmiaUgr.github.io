const Compite = () => {
  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-black dark:text-white mb-5 bg-gradient-to-r from-warm-orange via-warm-pink to-warm-red bg-clip-text text-transparent">
          Compite
        </h1>
        <p className="text-lg sm:text-xl text-black/70 dark:text-white/70 max-w-3xl mx-auto leading-relaxed mb-6">
          Sección en preparación.
        </p>
        <div className="flex justify-center">
          <div className="w-28 h-[3px] bg-gradient-to-r from-warm-orange via-warm-pink to-warm-red rounded-full"></div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl p-8 bg-white/60 dark:bg-white/[0.05] backdrop-blur-lg border border-white/10 dark:border-white/10 text-center shadow">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-gradient-to-br from-warm-orange to-warm-red flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 8v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h2 className="text-xl font-light text-black dark:text-white mb-2">Próximamente.</h2>
          <p className="text-sm text-black/70 dark:text-white/70 max-w-2xl mx-auto">
            Estamos preparando retos, rondas y el ranking del club. Vuelve pronto para participar.
          </p>
        </div>
      </div>
    </>
  );
};

export default Compite; 
