import FilterBar from "@/components/filterBar";
import Pagination from "@/components/pagination";
import ProductCard from "@/components/productCard";

const PRODUCTS = [
  {
    id: 1,
    title: "White Crew-Neck T-Shirt",
    slug: "white-crew-neck-tshirt",
    description: "Soft cotton t-shirt with a clean regular fit for daily wear.",
    category: "T-Shirts",
    price: 29,
    image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/hoverCardImg1.png",
    hoverImage: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/hoverCardImg2.png",
  },
  {
    id: 2,
    title: "Black Oversized Hoodie",
    slug: "black-oversized-hoodie",
    description: "Heavyweight oversized hoodie with a cozy brushed interior.",
    category: "Hoodies",
    price: 59,
    image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/hoverCardImg1.png",
    hoverImage: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/hoverCardImg2.png",
  },
  {
    id: 3,
    title: "Slim Fit Denim Jeans",
    slug: "slim-fit-denim-jeans",
    description: "Stretch denim jeans tailored with a modern slim silhouette.",
    category: "Jeans",
    price: 49,
    image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/hoverCardImg1.png",
    hoverImage: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/hoverCardImg2.png",
  },
  {
    id: 4,
    title: "Classic Blue Shirt",
    slug: "classic-blue-shirt",
    description: "Button-down shirt in breathable fabric for smart-casual looks.",
    category: "Shirts",
    price: 39,
    image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/hoverCardImg1.png",
    hoverImage: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/hoverCardImg2.png",
  },
  {
    id: 5,
    title: "Athletic Jogger Pants",
    slug: "athletic-jogger-pants",
    description: "Lightweight joggers with a tapered cut and all-day comfort.",
    category: "Pants",
    price: 45,
    image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/hoverCardImg1.png",
    hoverImage: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/hoverCardImg2.png",
  },
  {
    id: 6,
    title: "Minimal Polo Shirt",
    slug: "minimal-polo-shirt",
    description: "Minimal polo shirt with a structured collar and soft texture.",
    category: "Shirts",
    price: 34,
    image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/hoverCardImg1.png",
    hoverImage: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/hoverCardImg2.png",
  },
];

export default function Home() {
  return (
    <main className="w-full px-4 md:px-8 lg:px-16 xl:px-24 py-8">
      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
        <FilterBar />

        <section className="w-full flex-1 lg:pl-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                slug={product.slug}
                price={product.price}
                description={product.description}
                category={product.category}
                image={product.image}
                hoverImage={product.hoverImage}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination />
          </div>
        </section>
      </div>
    </main>
  );
}
