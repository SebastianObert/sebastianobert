export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex items-center justify-center animate-zoomOut overflow-hidden">
      <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>
      
      <div className="flex flex-col items-center gap-8 md:gap-12 relative z-10 px-6">
        <div className="relative">
          <span className="text-4xl md:text-6xl font-bold text-white glitch-text" data-text="SoC">
            So<span className="text-cyan-400 animate-pulsing-glow">C</span>
          </span>
        </div>
        
        <div className="w-48 md:w-64 h-1.5 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/30 relative">
          <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-fill-bar rounded-full"></div>
        </div>
        
        <p className="text-cyan-400 text-xs md:text-sm font-medium tracking-widest animate-pulse-text">
          INITIALIZING<span className="animate-dots">...</span>
        </p>
      </div>
    </div>
  );
}
