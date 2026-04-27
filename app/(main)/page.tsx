import FilterBar from "@/components/filterBar";
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

  const totalProducts = await fetch(
    buildApiUrl(0, 9999),
    { next: { revalidate: 300 } },
  )
    .then(async (response) => {
      if (!response.ok) {
        return 0;
      }

      const data: unknown = await response.json();
      return Array.isArray(data) ? data.length : 0;
    })
    .catch(() => 0);

  const maxPage = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE));

  if (requestedPage > maxPage) {
    redirect(maxPage === 1 ? "/" : `/?page=${maxPage}`);
  }

  const offset = (requestedPage - 1) * PRODUCTS_PER_PAGE;

  const products: ApiProduct[] = await fetch(
    buildApiUrl(offset, PRODUCTS_PER_PAGE),
    { next: { revalidate: 300 } },
  )
    .then(async (response) => {
      if (!response.ok) {
        return [];
      }

      const data: unknown = await response.json();
      return Array.isArray(data) ? (data as ApiProduct[]) : [];
    })
    .catch(() => []);

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
        </section>
      </div>
    </main>
  );
}
