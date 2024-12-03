import Quiz from './components/Quiz';
import { Spotlight } from './components/ui/Spotlight';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700 overflow-hidden">
      <Spotlight
        className="absolute inset-0 z-0 w-full h-full opacity-80"
        fill="rgba(255, 255, 255, 0.2)"
      />
      <Spotlight
        className="absolute -top-1/4 -left-1/4 z-0 w-[150%] h-[150%] opacity-70"
        fill="rgba(255, 255, 255, 0.15)"
      />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <Quiz />
      </div>
    </div>
  );
}
