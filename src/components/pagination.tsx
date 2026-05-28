interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPaginationRange(currentPage: number, totalPages: number) {
  const delta = 2; // Pages to show on each side of current page
  const range: (number | string)[] = [];
  const rangeWithDots: (number | string)[] = [];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    rangeWithDots.push(1, "...");
  } else {
    rangeWithDots.push(1);
  }

  rangeWithDots.push(...range);

  if (currentPage + delta < totalPages - 1) {
    rangeWithDots.push("...", totalPages);
  } else if (totalPages > 1) {
    rangeWithDots.push(totalPages);
  }

  return rangeWithDots;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex gap-2 items-center justify-center w-full flex-wrap bg-slate-900 border-slate-800 border-t pt-8 pb-16 mt-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-slate-700 text-white disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors cursor-pointer"
      >
        Previous
      </button>

      {getPaginationRange(currentPage, totalPages).map((pageNum, idx) =>
        pageNum === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-slate-400">
            ...
          </span>
        ) : (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum as number)}
            className={`min-w-10 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              currentPage === pageNum
                ? "bg-blue-600 text-white font-semibold"
                : "bg-slate-700 text-white hover:bg-slate-600"
            }`}
          >
            {pageNum}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-slate-700 text-white disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};
