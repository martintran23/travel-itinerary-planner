import { useMemo } from "react";

function ProgressBar({ completed, total }) {
  const percentage = useMemo(
    () => (total === 0 ? 0 : Math.round((completed / total) * 100)),
    [completed, total]
  );

  return (
    <section className="rounded-2xl bg-[#00274C] p-3 shadow-sm ring-1 ring-[#001C36]">
      <div className="rounded-xl bg-slate-100 p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Trip Progress</h2>
          <span className="text-sm font-medium text-slate-600">
            {completed} / {total} completed
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[#FF7900] transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-2 text-right text-sm font-semibold text-[#FF7900]">{percentage}%</p>
      </div>
    </section>
  );
}

export default ProgressBar;
