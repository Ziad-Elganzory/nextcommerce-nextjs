export default function MainLoading() {
  return (
    <main className="w-full px-4 md:px-8 lg:px-16 xl:px-24 py-8 animate-pulse">
      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
        <aside className="w-full lg:w-64 xl:w-72 shrink-0 self-start rounded-2xl border border-gray-200 bg-white p-4">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="mt-5 space-y-3">
            <div className="h-9 w-full rounded bg-gray-100" />
            <div className="h-9 w-full rounded bg-gray-100" />
            <div className="h-9 w-full rounded bg-gray-100" />
          </div>
        </aside>

        <section className="w-full flex-1 lg:pl-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-full max-w-72 rounded-2xl border border-gray-200 bg-white p-4"
              >
                <div className="h-52 rounded-xl bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
                <div className="mt-4 h-4 w-20 rounded bg-gray-100" />
                <div className="mt-2 h-4 w-40 rounded bg-gray-100" />
                <div className="mt-2 h-3 w-full rounded bg-gray-100" />
                <div className="mt-1 h-3 w-4/5 rounded bg-gray-100" />
                <div className="mt-4 h-9 w-full rounded-full bg-gray-200" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
