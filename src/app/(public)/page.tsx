export default function Home() {
  return (
    <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-950/20 text-red-200 text-sm shadow-[0_0_20px_-3px_rgba(220,38,38,0.4)] backdrop-blur-md animate-fade-in-up">
        <span className="tracking-wide font-medium">Добро пожаловать!</span>
      </div>
      <h1 className="text-6xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-[0.95]">
        Стартовый набор next.js
      </h1>
      <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl font-light mx-auto">
        Boost Productivity With AI-Powered Suggestions, Real-Time Debugging, And Intelligent Automation—Focus On What Truly Matters: <span className="text-red-200">Innovation.</span>
      </p>
    </div>
  );
}