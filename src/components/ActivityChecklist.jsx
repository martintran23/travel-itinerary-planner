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

function ActivityChecklist({ activities, checkedIds, onToggleChecked }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-slate-800">Checklist</h2>
      {activities.length === 0 ? (
        <div className="rounded-xl bg-white p-6 text-center text-slate-600 shadow-sm ring-1 ring-slate-200">
          No activities to check off yet.
        </div>
      ) : (
        <ul className="space-y-2">
          {activities.map((activity) => {
            const checked = checkedIds.has(activity.id);
            return (
              <li key={activity.id}>
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md ${
                    checked ? "opacity-60" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleChecked(activity.id)}
                    className="mt-0.5 h-4 w-4 accent-[#FF7900]"
                  />
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-semibold text-slate-900 ${
                        checked ? "line-through" : ""
                      }`}
                    >
                      {activity.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDateTime(activity.date, activity.time)}
                    </p>
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ActivityChecklist;
