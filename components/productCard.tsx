"use client";

type ProductCardProps = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: string;
  image: string;
  hoverImage: string;
};

export default function ProductCard({ id, title, slug, price, description, category, image, hoverImage }: ProductCardProps) {
  return (
    <article className="w-full max-w-72 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <div className="group relative overflow-hidden rounded-t-2xl">
        <img
          className="w-full h-52 object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
          src={image}
          alt={title}
        />
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          src={hoverImage}
          alt={`${title} alternate view`}
        />
      </div>
      <div className="p-4 text-sm">
        <p className="text-indigo-600 font-medium">{category}</p>
        <p className="text-gray-900 text-base font-semibold mt-1">{title}</p>
        <p className="text-gray-500 mt-1 line-clamp-2">{description}</p>
        <p className="text-gray-900 text-lg font-semibold mt-3">${price.toFixed(2)}</p>

        <button
          type="button"
          onClick={() => console.log(`Add to cart: ${id} - ${slug}`)}
          className="mt-3 w-full rounded-full bg-indigo-500 text-white py-2.5 hover:bg-indigo-600 active:scale-[0.98] transition-all"
          aria-label={`Add ${title} to cart`}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}