const BackgroundEffects = ({ intensity = 'normal' }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Base background */}
      <div className="absolute inset-0 w-full h-full bg-pure-white dark:bg-pure-black"></div>
      
      {/* Subtle texture overlay - Solo en modo claro */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0]" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             backgroundSize: '300px 300px'
           }}>
      </div>

      {/* Subtle cloud effects with proper full-screen coverage */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Light mode effects - Tamaño reducido */}
        <div className="dark:hidden">
          {/* Base coverage gradients - Reducido */}
          <div className="absolute top-0 left-0 w-[40vw] h-[50vh] bg-gradient-radial from-warm-orange/8 via-warm-pink/4 to-transparent blur-3xl animate-cloud-glow"></div>
          <div className="absolute top-0 right-0 w-[35vw] h-[45vh] bg-gradient-radial from-warm-red/6 via-warm-orange/3 to-transparent blur-2xl animate-cloud-glow" style={{animationDelay: '2s'}}></div>
          
          {/* Additional right side coverage - Reducido */}
          <div className="absolute inset-y-0 right-0 w-[25vw] bg-gradient-radial from-warm-pink/10 via-warm-red/5 to-transparent blur-3xl animate-cloud-glow" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/4 right-0 w-[30vw] h-1/2 bg-gradient-radial from-warm-orange/12 via-warm-pink/6 to-transparent blur-2xl animate-cloud-glow" style={{animationDelay: '4s'}}></div>
        </div>

        {/* Dark mode effects */}
        <div className="hidden dark:block">
          {/* Base coverage gradients - Tamaño reducido */}
          <div className="absolute top-0 left-0 w-[40vw] h-[50vh] bg-gradient-radial from-white/6 via-white/3 to-transparent blur-3xl animate-cloud-glow"></div>
          <div className="absolute top-0 right-0 w-[35vw] h-[45vh] bg-gradient-radial from-white/4 via-white/2 to-transparent blur-2xl animate-cloud-glow" style={{animationDelay: '2s'}}></div>
          
          {/* Additional right side coverage - Tamaño reducido */}
          <div className="absolute inset-y-0 right-0 w-[25vw] bg-gradient-radial from-white/8 via-white/4 to-transparent blur-3xl animate-cloud-glow" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/4 right-0 w-[30vw] h-1/2 bg-gradient-radial from-white/10 via-white/5 to-transparent blur-2xl animate-cloud-glow" style={{animationDelay: '4s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundEffects; 