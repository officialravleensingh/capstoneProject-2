import { useState, useEffect } from "react";
import { NavBar } from "./NavBar";

const PomodoroTimer = () => {
  const [activeMode, setActiveMode] = useState("pomodoro");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [timerSettings, setTimerSettings] = useState({pomodoro: 25,shortBreak: 5});
  useEffect(() => {
    let time;
    switch (activeMode) {
      case "pomodoro":
        time = timerSettings.pomodoro * 60;
        break;
      case "shortBreak":
        time = timerSettings.shortBreak * 60;
        break;
      default:
        time = timerSettings.pomodoro * 60;
    }
    setTimeLeft(time);
    setIsRunning(false);
  }, [activeMode, timerSettings]);
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      if (activeMode === "pomodoro") {
        setCompletedPomodoros((prev) => prev + 1);
        setActiveMode("shortBreak");
        setIsRunning(false);
      } else {
        setActiveMode("pomodoro");
        setIsRunning(false);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, activeMode, completedPomodoros]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateProgress = () => {
    let totalTime;
    switch (activeMode) {
      case "pomodoro":
        totalTime = timerSettings.pomodoro * 60;
        break;
      case "shortBreak":
        totalTime = timerSettings.shortBreak * 60;
        break;
      default:
        totalTime = timerSettings.pomodoro * 60;
    }
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const resetTimer = () => {
    let time;
    switch (activeMode) {
      case "pomodoro":
        time = timerSettings.pomodoro * 60;
        break;
      case "shortBreak":
        time = timerSettings.shortBreak * 60;
        break;
      default:
        time = timerSettings.pomodoro * 60;
    }
    setTimeLeft(time);
    setIsRunning(false);
  };

  const updateTimerSettings = (newSettings) => {
    setTimerSettings(newSettings);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex mb-8 shadow-md">
        <button
          onClick={() => setActiveMode("pomodoro")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeMode === "pomodoro"
            ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}>Focus</button>
        <button
          onClick={() => setActiveMode("shortBreak")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeMode === "shortBreak"
            ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-green-400 shadow-sm"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}>Short Break</button>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle className="text-gray-200 dark:text-gray-700 stroke-current" strokeWidth="4" cx="50" cy="50" r="46" fill="transparent" />
          <circle
            className={`stroke-current ${activeMode === "pomodoro"
              ? "text-blue-500"
              : "text-green-500"}`}
            strokeWidth="4" strokeLinecap="round" cx="50" cy="50" r="46" fill="transparent" strokeDasharray="289.02"
            strokeDashoffset={289.02 - (289.02 * calculateProgress()) / 100} />
        </svg>

        <div className="text-center z-10">
          <div className="text-5xl font-bold">{formatTime(timeLeft)}</div>
          <div className="mt-2 text-sm font-medium uppercase text-gray-500 dark:text-gray-400">
            {activeMode === "pomodoro" ? "Focus" : "Short Break"}</div>
        </div>
      </div>

      <div className="flex space-x-4 mb-8">
        <button onClick={() => setIsRunning(!isRunning)}
          className={`px-6 py-3 rounded-full font-medium shadow-md transition-all ${isRunning
            ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`} >
          {isRunning ? "Pause" : timeLeft !== (activeMode === "pomodoro" ? timerSettings.pomodoro * 60 : timerSettings.shortBreak * 60)
              ? "Resume": "Start"} </button>
        <button onClick={resetTimer}
          className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center justify-center shadow-md transition-colors text-sm font-medium" >Reset</button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 max-w-md shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-center">Timer Settings</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Focus Time: {timerSettings.pomodoro} minutes</label>
            <input
              type="range"
              min="15"
              max="45"
              step="5"
              value={timerSettings.pomodoro}
              onChange={(e) => updateTimerSettings({ ...timerSettings, pomodoro: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>15min</span>
              <span>30min</span>
              <span>45min</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Short Break: {timerSettings.shortBreak} minutes
            </label>
            <input
              type="range"
              min="5"
              max="15"
              step="5"
              value={timerSettings.shortBreak}
              onChange={(e) => updateTimerSettings({ ...timerSettings, shortBreak: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>5min</span>
              <span>10min</span>
              <span>15min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = ({ toggleTheme, isDarkMode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <NavBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      <main className="flex-1 py-12 container max-w-4xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">FocusFlow</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enhance your productivity with the proven Pomodoro technique. Focus intensely,
            take strategic breaks, and achieve more.
          </p>
        </div>
        <PomodoroTimer />
      </main>

      <footer className="py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Design with focus in mind. Use FocusFlow to boost your productivity.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;