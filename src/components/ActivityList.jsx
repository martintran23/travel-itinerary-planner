import ActivityItem from "./ActivityItem";

function ActivityList({ activities, onDeleteActivity, onEditActivity }) {
  return (
    <section className="space-y-3">
      {activities.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 text-center text-slate-600 shadow-sm ring-1 ring-slate-200">
          No activities yet. Add your first plan above.
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
    </section>
  );
}

export default ActivityList;
