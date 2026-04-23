import { useMemo, useState } from "react";
import ActivityForm from "./ActivityForm";
import ActivityItem from "./ActivityItem";

function ActivityList({ activities, onAddActivity, onDeleteActivity, onEditActivity }) {
  const [showForm, setShowForm] = useState(false);

  const panelTitle = useMemo(
    () => (activities.length ? `${activities.length} activities` : "Activities"),
    [activities.length]
  );

  return (
    <section className="rounded-2xl bg-[#00274C] p-3 shadow-sm ring-1 ring-[#001C36]">
      <div className="rounded-xl bg-slate-100 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-800">{panelTitle}</h2>
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF7900] text-white transition hover:bg-[#E66D00]"
            aria-label={showForm ? "Close add activity form" : "Add activity"}
          >
            {showForm ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            )}
          </button>
        </div>

        {showForm ? (
          <div className="mb-4 rounded-xl bg-white p-4 ring-1 ring-slate-200">
            <ActivityForm
              onAddActivity={(activityData) => {
                onAddActivity(activityData);
                setShowForm(false);
              }}
              compact
            />
          </div>
        ) : null}

        <div className="space-y-3">
          {activities.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-center text-slate-600 shadow-sm ring-1 ring-slate-200">
              No activities yet. Use the + button to add one.
            </div>
          ) : (
            activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                onDeleteActivity={onDeleteActivity}
                onEditActivity={onEditActivity}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default ActivityList;
