import FilterBar from "@/components/filterBar";
import HomeLoadGate from "@/components/homeLoadGate";
import Pagination from "@/components/pagination";
import ProductCard from "@/components/productCard";
import { redirect } from "next/navigation";

type ApiProduct = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  category?: {
    id?: number;
    name?: string;
  };
};

type ApiCategory = {
  id: number;
  name: string;
};

type HomeProps = {
  searchParams?: Promise<{
    page?: string;
    title?: string;
    categoryId?: string;
    min?: string;
    max?: string;
  }>;
};

const PRODUCTS_PER_PAGE = 12;

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const requestedPage = Math.max(1, Number(resolvedSearchParams.page ?? "1") || 1);
  const title = resolvedSearchParams.title?.trim() ?? "";
  const categoryId = resolvedSearchParams.categoryId?.trim() ?? "";
  const min = resolvedSearchParams.min?.trim() ?? "";
  const max = resolvedSearchParams.max?.trim() ?? "";

  const hasMin = min !== "" && !Number.isNaN(Number(min));
  const hasMax = max !== "" && !Number.isNaN(Number(max));

  const buildApiUrl = (offset: number, limit: number) => {
    const params = new URLSearchParams();
    params.set("offset", String(offset));
    params.set("limit", String(limit));

    if (title) {
      params.set("title", title);
    }

    if (categoryId) {
      params.set("categoryId", categoryId);
    }

    if (hasMin) {
      params.set("price_min", min);
    }

    if (hasMax) {
      params.set("price_max", max);
    }

    return `https://api.escuelajs.co/api/v1/products?${params.toString()}`;
  };

  const retryParams = new URLSearchParams();
  if (requestedPage > 1) retryParams.set("page", String(requestedPage));
  if (title) retryParams.set("title", title);
  if (categoryId) retryParams.set("categoryId", categoryId);
  if (min) retryParams.set("min", min);
  if (max) retryParams.set("max", max);
  const retryHref = retryParams.toString() ? `/?${retryParams.toString()}` : "/";

  let totalProductsRequestFailed = false;

  const totalProducts = await fetch(
    buildApiUrl(0, 9999),
    { next: { revalidate: 300 } },
  )
    .then(async (response) => {
      if (!response.ok) {
        totalProductsRequestFailed = true;
        return 0;
      }

      const data: unknown = await response.json();
      return Array.isArray(data) ? data.length : 0;
    })
    .catch(() => {
      totalProductsRequestFailed = true;
      return 0;
    });

  const maxPage = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE));

  if (requestedPage > maxPage) {
    redirect(maxPage === 1 ? "/" : `/?page=${maxPage}`);
  }

  const offset = (requestedPage - 1) * PRODUCTS_PER_PAGE;

  let productsRequestFailed = false;

  const products: ApiProduct[] = await fetch(
    buildApiUrl(offset, PRODUCTS_PER_PAGE),
    { next: { revalidate: 300 } },
  )
    .then(async (response) => {
      if (!response.ok) {
        productsRequestFailed = true;
        return [];
      }

      const data: unknown = await response.json();
      return Array.isArray(data) ? (data as ApiProduct[]) : [];
    })
    .catch(() => {
      productsRequestFailed = true;
      return [];
    });

  const categorySourceProducts: ApiProduct[] = await fetch(
    "https://api.escuelajs.co/api/v1/products?offset=0&limit=9999",
    { next: { revalidate: 300 } },
  )
    .then(async (response) => {
      if (!response.ok) {
        return [];
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        return [];
      }

      return data as ApiProduct[];
    })
    .catch(() => []);

  const categoriesMap = new Map<number, string>();

  for (const product of categorySourceProducts) {
    const category = product.category;

    if (
      category &&
      typeof category.id === "number" &&
      typeof category.name === "string" &&
      category.name.trim() !== ""
    ) {
      categoriesMap.set(category.id, category.name.trim());
    }
  }

  const categories: ApiCategory[] = Array.from(categoriesMap.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <HomeLoadGate>
      <main className="w-full px-4 md:px-8 lg:px-16 xl:px-24 py-8">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
          <FilterBar
            title={title}
            categoryId={categoryId}
            min={min}
            max={max}
            categories={categories}
          />

          <section className="w-full flex-1 lg:pl-2">
            {productsRequestFailed ? (
              <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <svg
                      className="h-4 w-4 text-red-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M5.1 19h13.8c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.37 16c-.77 1.33.19 3 1.73 3Z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-gray-900">Unable to load products</p>
                    <p className="mt-1 text-sm text-gray-600">
                      We could not reach the catalog service. Please try again.
                    </p>
                    <a
                      href={retryHref}
                      className="mt-4 inline-flex rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      Retry
                    </a>
                  </div>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-base font-semibold text-gray-900">No products found</p>
                <p className="mt-1 text-sm text-gray-600">
                  Try broadening your filters or clear them to see all products.
                </p>
                <a
                  href="/"
                  className="mt-4 inline-flex rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Clear filters
                </a>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      description={product.description}
                      category={product.category?.name ?? "Uncategorized"}
                      image={product.images?.[0] ?? "https://placehold.co/600x400?text=No+Image"}
                      hoverImage={product.images?.[1] ?? product.images?.[0] ?? "https://placehold.co/600x400?text=No+Image"}
                    />
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <Pagination
                    currentPage={requestedPage}
                    maxPage={maxPage}
                    hasPrevious={requestedPage > 1}
                    hasNext={requestedPage < maxPage}
                    title={title}
                    categoryId={categoryId}
                    min={min}
                    max={max}
                  />
                </div>
              </>
            )}

            {totalProductsRequestFailed ? (
              <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                Total product count is temporarily unavailable, so pagination may
                be limited until the API is reachable.
              </p>
            ) : null}
          </section>
        </div>
      </main>
    </HomeLoadGate>
  );
}
