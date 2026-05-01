import { useEffect, useMemo, useRef } from "react";

function getWeekDates(weekStart) {
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + index);
    return day;
  });
}

function formatDateKey(date) {
  return date.toISOString().split("T")[0];
}

function buildCalendarMap(activities) {
  const map = {};
  activities.forEach((activity) => {
    const hour = Number(activity.time.split(":")[0]);
    if (Number.isNaN(hour)) {
      return;
    }
    const key = `${activity.date}-${hour}`;
    if (!map[key]) {
      map[key] = [];
    }
    map[key].push(activity);
  });
  return map;
}

function getWeekLabel(weekDates) {
  if (!weekDates.length) {
    return "";
  }
  const first = weekDates[0];
  const last = weekDates[6];
  return `${first.toLocaleDateString([], { month: "short", day: "numeric" })} - ${last.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}`;
}

function WeeklyCalendar({ activities, checkedIds, weekStart, onShiftWeek }) {
  const weekDates = getWeekDates(weekStart);
  const weekLabel = getWeekLabel(weekDates);
  const calendarMap = buildCalendarMap(activities);
  const hours = useMemo(() => Array.from({ length: 24 }, (_, idx) => idx), []);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }
    const currentHour = new Date().getHours();
    const rowHeight = 49;
    scrollRef.current.scrollTop = Math.max(0, (currentHour - 2) * rowHeight);
  }, [weekStart]);

  return (
    <section className="relative flex items-center gap-3">
      <button
        type="button"
        onClick={() => onShiftWeek(-7)}
        className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00274C] text-white shadow-sm transition hover:bg-[#003769] sm:flex"
        aria-label="Previous week"
      >
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
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="w-full rounded-2xl bg-[#00274C] p-3 shadow-sm ring-1 ring-[#001C36]">
        <div className="rounded-xl bg-white p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onShiftWeek(-7)}
              className="rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-200 sm:hidden"
            >
              Prev
            </button>
            <h2 className="text-center text-sm font-semibold text-slate-700 sm:text-base">{weekLabel}</h2>
            <button
              type="button"
              onClick={() => onShiftWeek(7)}
              className="rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-200 sm:hidden"
            >
              Next
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[680px] rounded-lg border border-slate-200">
              <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                <div className="p-2 text-center">Time</div>
                {weekDates.map((date) => (
                  <div key={formatDateKey(date)} className="border-l border-slate-200 p-2 text-center">
                    <div>{date.toLocaleDateString([], { weekday: "short" })}</div>
                    <div className="text-[11px] text-slate-500">
                      {date.toLocaleDateString([], { month: "short", day: "numeric" })}
                    </div>
                  </div>
                ))}
              </div>

              <div ref={scrollRef} className="max-h-[420px] overflow-y-auto">
                {hours.map((hour) => (
                  <div key={hour} className="grid grid-cols-8 border-b border-slate-100 last:border-b-0">
                    <div className="p-2 text-center text-xs text-slate-500">
                      {new Date(2024, 0, 1, hour).toLocaleTimeString([], {
                        hour: "numeric"
                      })}
                    </div>
                    {weekDates.map((date) => {
                      const key = `${formatDateKey(date)}-${hour}`;
                      const cellActivities = calendarMap[key] || [];
                      return (
                        <div key={key} className="min-h-12 border-l border-slate-100 p-1">
                          {cellActivities.map((activity) => {
                            const checked = checkedIds.has(activity.id);
                            return (
                              <div
                                key={activity.id}
                                className={`mb-1 truncate rounded-md bg-[#FFEDD5] px-2 py-1 text-[11px] font-medium text-[#9A3412] ${
                                  checked ? "line-through opacity-70" : ""
                                }`}
                                title={activity.title}
                              >
                                {activity.time} {activity.title}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onShiftWeek(7)}
        className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00274C] text-white shadow-sm transition hover:bg-[#003769] sm:flex"
        aria-label="Next week"
      >
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
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </section>
  );
}

export default WeeklyCalendar;
