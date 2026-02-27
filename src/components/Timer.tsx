import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
      <div className="font-mono text-xl font-bold text-slate-700 w-16 text-center">
        {formatTime(time)}
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`p-1.5 rounded-full transition-colors ${
            isRunning 
              ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
              : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
          }`}
          title={isRunning ? "Pause" : "Start"}
        >
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          onClick={reset}
          className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
          title="Reset"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
