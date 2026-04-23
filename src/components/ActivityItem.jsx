import { useState } from "react";

function formatDateTime(date, time) {
  const value = new Date(`${date}T${time}`);
  return value.toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function ActivityItem({ activity, onDeleteActivity, onEditActivity }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    title: activity.title,
    date: activity.date,
    time: activity.time,
    notes: activity.notes
  });
  const [error, setError] = useState("");

  const handleDraftChange = (event) => {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!draft.title.trim() || !draft.date || !draft.time) {
      setError("Activity name, date, and time are required.");
      return;
    }

    onEditActivity(activity.id, {
      title: draft.title.trim(),
      date: draft.date,
      time: draft.time,
      notes: draft.notes.trim()
    });

    setError("");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft({
      title: activity.title,
      date: activity.date,
      time: activity.time,
      notes: activity.notes
    });
    setError("");
    setIsEditing(false);
  };

  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md sm:p-5">
      {isEditing ? (
        <div className="space-y-3">
          <input
            name="title"
            type="text"
            value={draft.title}
            onChange={handleDraftChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              name="date"
              type="date"
              value={draft.date}
              onChange={handleDraftChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            <input
              name="time"
              type="time"
              value={draft.time}
              onChange={handleDraftChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <textarea
            name="notes"
            rows={2}
            value={draft.notes}
            onChange={handleDraftChange}
            placeholder="Notes"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg bg-slate-200 px-3 py-1.5 text-sm font-medium text-slate-800 transition hover:bg-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{activity.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{formatDateTime(activity.date, activity.time)}</p>
            {activity.notes ? <p className="mt-2 text-sm text-slate-700">{activity.notes}</p> : null}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDeleteActivity(activity.id)}
              className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-rose-500"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default ActivityItem;
