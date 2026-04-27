function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-4 border-b border-gray-100 last:border-none">
      <div className="flex items-center justify-between w-full group">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 group-hover:text-gray-600 transition-colors">
          {label}
        </span>
        <svg
          className="w-3.5 h-3.5 text-gray-400 rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default function FilterBar() {
  return (
    <aside className="w-full lg:w-64 xl:w-72 shrink-0 self-start">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 12h10M11 20h2" />
          </svg>
          <h2 className="text-sm font-semibold text-gray-800">Filters</h2>
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] font-bold">
            3
          </span>
        </div>
        <button
          type="button"
          className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear all
        </button>
      </div>

      <Section label="Search">
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="m21 21-4.35-4.35" />
          </svg>
          <input
            id="title-filter"
            type="text"
            defaultValue=""
            placeholder="Search products..."
            className="w-full rounded-lg bg-gray-50 border border-gray-200 pl-8 pr-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>
      </Section>

      <Section label="Category">
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-colors bg-indigo-50 text-indigo-700 font-medium">
            <input
              type="radio"
              name="category"
              value="all"
              defaultChecked
              className="accent-indigo-600"
            />
            All categories
          </label>
          {["T-Shirts", "Hoodies", "Jeans", "Shirts", "Pants"].map((item) => (
            <label
              key={item}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-colors text-gray-600 hover:bg-gray-50"
            >
              <input
                type="radio"
                name="category"
                value={item}
                className="accent-indigo-600"
              />
              {item}
            </label>
          ))}
        </div>
      </Section>

      <Section label="Price Range">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">$</span>
            <input
              type="number"
              min="0"
              defaultValue=""
              placeholder="Min"
              className="w-full rounded-lg bg-gray-50 border border-gray-200 pl-6 pr-2 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>
          <span className="text-gray-300 text-sm">—</span>
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">$</span>
            <input
              type="number"
              min="0"
              defaultValue=""
              placeholder="Max"
              className="w-full rounded-lg bg-gray-50 border border-gray-200 pl-6 pr-2 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>
        </div>
      </Section>
    </aside>
  );
}
