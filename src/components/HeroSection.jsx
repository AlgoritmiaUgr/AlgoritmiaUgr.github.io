const WHATSAPP_INVITE_URL = process.env.NEXT_PUBLIC_WHATSAPP_INVITE_URL || 'https://chat.whatsapp.com/EJP8DQe7Zqe2nk9QTO17z0';

const HeroSection = () => {
  return (
    // Hero section with more centered positioning
    <section className="min-h-[60vh] flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
      {/* Background Effects - FIXED like in Comparte */}
      <div className="fixed inset-0 bg-pure-white dark:bg-pure-black pointer-events-none">
        {/* Fine grain texture for glass effect - Solo en modo claro */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0]" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
               backgroundSize: '300px 300px'
             }}>
        </div>
        
        {/* Secondary texture layer for depth - Solo en modo claro */}
        <div className="absolute inset-0 opacity-[0.008] dark:opacity-[0]" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)'/%3E%3C/svg%3E")`,
               backgroundSize: '500px 500px'
             }}>
        </div>
        
        {/* Gradient Cloud Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Light mode clouds - Tamaño reducido */}
          <div className="dark:hidden">
            {/* Large diffused gradient blob - top center - Reducido */}
            <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-gradient-radial from-warm-orange/30 via-warm-pink/20 to-transparent blur-3xl animate-cloud-glow"></div>
            
            {/* Medium gradient blob - center left - Reducido */}
            <div className="absolute top-1/3 -left-32 w-40 h-40 sm:w-[250px] sm:h-[250px] bg-gradient-radial from-warm-red/25 via-warm-orange/15 to-transparent blur-2xl animate-cloud-glow" style={{animationDelay: '1s'}}></div>
            
            {/* Small gradient blob - bottom center - Reducido */}
            <div className="absolute bottom-20 left-1/4 w-32 h-32 sm:w-[200px] sm:h-[200px] bg-gradient-radial from-warm-pink/35 via-warm-red/20 to-transparent blur-xl animate-cloud-glow" style={{animationDelay: '2s'}}></div>
            
            {/* Additional atmospheric effect - Reducido */}
            <div className="absolute top-1/2 left-1/3 w-36 h-36 sm:w-[225px] sm:h-[225px] bg-gradient-radial from-warm-orange/40 via-transparent to-transparent blur-3xl animate-cloud-glow" style={{animationDelay: '0.5s'}}></div>
            
            {/* Extra large background cloud - Reducido */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-warm-pink/20 via-warm-orange/12 to-transparent blur-3xl animate-cloud-glow" style={{animationDelay: '1.5s'}}></div>
            
            {/* Right side gradient for balance - Reducido */}
            <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-gradient-radial from-warm-red/22 via-warm-pink/12 to-transparent blur-3xl animate-cloud-glow" style={{animationDelay: '3s'}}></div>
            
            {/* Extra warm accent - bottom right - Reducido */}
            <div className="absolute bottom-0 right-1/3 w-[250px] h-[250px] bg-gradient-radial from-warm-orange/35 via-warm-pink/18 to-transparent blur-3xl animate-cloud-glow" style={{animationDelay: '2.5s'}}></div>
            
            {/* ADDITIONAL RIGHT COVERAGE - Reducido */}
            <div className="absolute top-0 right-0 w-[40vw] h-1/2 bg-gradient-radial from-warm-red/15 via-warm-orange/8 to-transparent blur-3xl animate-cloud-glow" style={{animationDelay: '4s'}}></div>
            <div className="absolute inset-y-0 right-0 w-[20vw] bg-gradient-radial from-warm-pink/20 via-warm-red/10 to-transparent blur-3xl animate-cloud-glow" style={{animationDelay: '5s'}}></div>
          </div>

          {/* Dark mode clouds - ONLY WHITE - Tamaño reducido */}
          <div className="hidden dark:block">
            {/* Large diffused gradient blob - top center - Reducido */}
            <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-gradient-radial from-white/20 via-white/10 to-transparent blur-3xl animate-cloud-glow"></div>
            
            {/* Medium gradient blob - center left - Reducido */}
            <div className="absolute top-1/3 -left-32 w-40 h-40 sm:w-[250px] sm:h-[250px] bg-gradient-radial from-white/18 via-white/8 to-transparent blur-2xl animate-cloud-glow" style={{animationDelay: '1s'}}></div>
            
            {/* Small gradient blob - bottom center - Reducido */}
            <div className="absolute bottom-20 left-1/4 w-32 h-32 sm:w-[200px] sm:h-[200px] bg-gradient-radial from-white/25 via-white/12 to-transparent blur-xl animate-cloud-glow" style={{animationDelay: '2s'}}></div>
            
            {/* Additional atmospheric effect - Reducido */}
            <div className="absolute top-1/2 left-1/3 w-36 h-36 sm:w-[225px] sm:h-[225px] bg-gradient-radial from-white/30 via-transparent to-transparent blur-3xl animate-cloud-glow" style={{animationDelay: '0.5s'}}></div>
            
            {/* Extra large background cloud - Reducido */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-white/15 via-white/6 to-transparent blur-3xl animate-cloud-glow" style={{animationDelay: '1.5s'}}></div>
            
            {/* Right side gradient for balance - Reducido */}
            <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-gradient-radial from-white/22 via-white/10 to-transparent blur-3xl animate-cloud-glow" style={{animationDelay: '3s'}}></div>
            
            {/* Extra warm accent - bottom right - Reducido */}
            <div className="absolute bottom-0 right-1/3 w-[250px] h-[250px] bg-gradient-radial from-white/16 via-white/6 to-transparent blur-3xl animate-cloud-glow" style={{animationDelay: '2.5s'}}></div>
            
            {/* ADDITIONAL RIGHT COVERAGE - Reducido */}
            <div className="absolute top-0 right-0 w-[40vw] h-1/2 bg-gradient-radial from-white/12 via-white/6 to-transparent blur-3xl animate-cloud-glow" style={{animationDelay: '4s'}}></div>
            <div className="absolute inset-y-0 right-0 w-[20vw] bg-gradient-radial from-white/15 via-white/8 to-transparent blur-3xl animate-cloud-glow" style={{animationDelay: '5s'}}></div>
          </div>
        </div>
      </div>

      {/* Content - Centered and more compact */}
      <div className="relative z-10 max-w-4xl w-full text-center px-4 sm:px-8 lg:px-12 xl:px-16 mx-auto">
        {/* Main Heading - More compact */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-black dark:text-pure-white leading-tight mb-4 drop-shadow-sm">
          Lleva tu programación
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-red via-warm-orange to-warm-pink">más</span> allá de los límites
        </h1>

        {/* Subtitle - Moved closer */}
        <p className="text-sm sm:text-base lg:text-lg text-black dark:text-pure-white/90 font-light max-w-xl mb-6 mx-auto">
          Forma parte de nuestra comunidad de programadores.
        </p>

        {/* CTA - More compact spacing */}
        <div className="flex items-center justify-center gap-4">
          <a href={WHATSAPP_INVITE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm shadow-lg shadow-green-500/25 hover:scale-[1.02] transition-all">
            Únete a nuestra comunidad de WhatsApp
            <span className="text-white/80">↗</span>
          </a>
          <a href="#sobre-nosotros" className="text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors">
            Conócenos
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 