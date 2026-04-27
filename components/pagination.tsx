import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  maxPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  title?: string;
  categoryId?: string;
  min?: string;
  max?: string;
};

function getPageLink(
  page: number,
  filters: { title?: string; categoryId?: string; min?: string; max?: string },
) {
  const params = new URLSearchParams();

  if (page > 1) {
    params.set("page", String(page));
  }

  if (filters.title) {
    params.set("title", filters.title);
  }

  if (filters.categoryId) {
    params.set("categoryId", filters.categoryId);
  }

  if (filters.min) {
    params.set("min", filters.min);
  }

  if (filters.max) {
    params.set("max", filters.max);
  }

  const query = params.toString();
  return query ? `/?${query}` : "/";
}

export default function Pagination({
  currentPage,
  maxPage,
  hasPrevious,
  hasNext,
  title,
  categoryId,
  min,
  max,
}: PaginationProps) {
  const filters = { title, categoryId, min, max };
  const visiblePages = Array.from({ length: 5 }, (_, index) => {
    const page = currentPage - 2 + index;
    return page > 0 && page <= maxPage ? page : null;
  }).filter((page): page is number => page !== null);

  return (
    <div className="flex items-center justify-between w-full max-w-80 text-gray-500 font-medium">
      {hasPrevious ? (
        <Link href={getPageLink(currentPage - 1, filters)} aria-label="Previous page" className="rounded-full bg-slate-200/50">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" strokeWidth=".078" />
          </svg>
        </Link>
      ) : (
        <span aria-hidden className="rounded-full bg-slate-200/50 opacity-40">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" strokeWidth=".078" />
          </svg>
        </span>
      )}

      <div className="flex items-center gap-2 text-sm font-medium">
        {visiblePages.map((page) => (
          <Link
            key={page}
            href={getPageLink(page, filters)}
            className={`h-10 w-10 flex items-center justify-center aspect-square ${
              page === currentPage
                ? "text-indigo-500 border border-indigo-200 rounded-full"
                : ""
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {hasNext ? (
        <Link href={getPageLink(currentPage + 1, filters)} aria-label="Next page" className="rounded-full bg-slate-200/50">
          <svg className="rotate-180" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" strokeWidth=".078" />
          </svg>
        </Link>
      ) : (
        <span aria-hidden className="rounded-full bg-slate-200/50 opacity-40">
          <svg className="rotate-180" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" strokeWidth=".078" />
          </svg>
        </span>
      )}
    </div>
  );
}