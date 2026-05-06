import { cn } from "../../lib/utils";

const DataTable = ({
  columns = [],
  data = [],
  className,
  onRowClick,
}) => {
  // Safe Fallbacks
  const safeColumns = columns || [];
  const safeData = data || [];

  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm",
        className
      )}
    >
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            {safeColumns.map((col, idx) => (
              <th
                key={idx}
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {safeData.length > 0 ? (
            safeData.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "group transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40",
                  onRowClick && "cursor-pointer"
                )}
              >
                {safeColumns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300"
                  >
                    {col.cell
                      ? col.cell(row)
                      : row?.[col.accessor] ?? "-"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={safeColumns.length || 1}
                className="px-6 py-12 text-center text-slate-500 italic"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;