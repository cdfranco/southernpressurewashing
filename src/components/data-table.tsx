import { ReactNode } from "react";

/**
 * Responsive table. On narrow screens it scrolls sideways inside its own
 * rounded frame rather than breaking the page layout.
 */
export function DataTable({
  head,
  rows,
  caption,
  firstColumnWidth = "min-w-[11rem]",
  minWidth = "min-w-[40rem]",
  emphasizeLast = false,
}: {
  head: ReactNode[];
  rows: (ReactNode[] | { section: ReactNode })[];
  caption?: string;
  firstColumnWidth?: string;
  minWidth?: string;
  emphasizeLast?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className={`w-full border-collapse text-left ${minWidth}`}>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="bg-mist">
            {head.map((cell, i) => (
              <th
                key={i}
                scope="col"
                className={`px-5 py-4 text-[12.5px] font-bold uppercase tracking-[0.1em] text-ink-900/70 ${i === 0 ? firstColumnWidth : ""} ${
                  emphasizeLast && i === head.length - 1 ? "text-right" : ""
                }`}
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) =>
            Array.isArray(row) ? (
              <tr key={r} className="border-t border-line align-top">
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={`px-5 py-4 text-[15px] leading-relaxed ${
                      i === 0 ? "font-display font-bold text-ink-900" : "text-body"
                    } ${emphasizeLast && i === row.length - 1 ? "whitespace-nowrap text-right font-display text-base font-bold tabular-nums text-ink-900" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ) : (
              <tr key={r} className="border-t border-line bg-brand-50/60">
                <td colSpan={head.length} className="px-5 py-3 text-[13.5px] font-semibold text-brand-800">
                  {row.section}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
