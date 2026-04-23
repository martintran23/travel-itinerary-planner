import { useMemo, useState } from "react";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";

const STORAGE_KEY = "travel-itinerary-planner.activities";

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
  };

  const handleEditActivity = (id, updates) => {
    const nextActivities = activities.map((activity) =>
      activity.id === id ? { ...activity, ...updates } : activity
    );
    saveActivities(nextActivities);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Travel Itinerary Planner
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Plan your activities with date and time, then keep everything in order.
          </p>
        </header>

        <ActivityForm onAddActivity={handleAddActivity} />

        <ActivityList
          activities={sortedActivities}
          onDeleteActivity={handleDeleteActivity}
          onEditActivity={handleEditActivity}
        />
      </div>
    </main>
  );
}

export default App;
