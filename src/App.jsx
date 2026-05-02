import { useMemo, useState } from "react";
import ActivityList from "./components/ActivityList";
import WeeklyCalendar from "./components/WeeklyCalendar";
import ProgressBar from "./components/ProgressBar";

const STORAGE_KEY = "travelpilot.activities";

const getInitialActivities = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const sortActivities = (items) =>
  [...items].sort(
    (a, b) =>
      new Date(`${a.date}T${a.time}`).getTime() -
      new Date(`${b.date}T${b.time}`).getTime()
  );

function App() {
  const [activities, setActivities] = useState(getInitialActivities);
  const [checkedIds, setCheckedIds] = useState(() => new Set());
  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);
    return monday;
  });

  const sortedActivities = useMemo(() => sortActivities(activities), [activities]);

  const saveActivities = (nextActivities) => {
    setActivities(nextActivities);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextActivities));
  };

  const handleAddActivity = (activityData) => {
    const nextActivities = [
      ...activities,
      {
        id: crypto.randomUUID(),
        ...activityData
      }
    ];
    saveActivities(nextActivities);
  };

  const handleDeleteActivity = (id) => {
    const nextActivities = activities.filter((activity) => activity.id !== id);
    saveActivities(nextActivities);
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleEditActivity = (id, updates) => {
    const nextActivities = activities.map((activity) =>
      activity.id === id ? { ...activity, ...updates } : activity
    );
    saveActivities(nextActivities);
  };

  const handleToggleChecked = (id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const shiftWeek = (days) => {
    setWeekStart((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + days);
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-slate-100 py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <header className="rounded-2xl bg-[#00274C] p-6 text-center shadow-sm ring-1 ring-[#001C36] sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            TravelPilot
          </h1>
          <p className="mt-3 text-base text-slate-100">
            Plan your activities with date and time, then keep everything in order.
          </p>
        </header>

        <WeeklyCalendar activities={sortedActivities} weekStart={weekStart} onShiftWeek={shiftWeek} />

        <ProgressBar completed={checkedIds.size} total={sortedActivities.length} />

        <ActivityList
          activities={sortedActivities}
          onAddActivity={handleAddActivity}
          onDeleteActivity={handleDeleteActivity}
          onEditActivity={handleEditActivity}
          checkedIds={checkedIds}
          onToggleChecked={handleToggleChecked}
        />
      </div>
    </main>
  );
}

export default App;
