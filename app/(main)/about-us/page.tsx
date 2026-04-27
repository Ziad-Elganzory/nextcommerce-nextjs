import type { Metadata } from "next";
import { buildSeoMetadata } from "@/components/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "About Us",
  description:
    "Learn how NextCommerce focuses on fast discovery, clean shopping flows, and customer-centered design.",
  path: "/about-us",
});

export default function AboutUs() {
  return (
      <div className="py-32">
          <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          
              * {
                  font-family: 'Poppins', sans-serif;
              }
          `}</style>
          <h1 className="text-3xl font-semibold text-center mx-auto">About NextCommerce</h1>
          <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">
              NextCommerce is a modern online store focused on clear shopping flows, fast browsing, and trusted checkout experiences.
          </p>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-0 py-10">
              <img className="max-w-sm w-full rounded-xl h-auto"
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=830&h=844&auto=format&fit=crop"
                  alt="Shoppers browsing products in a modern retail store" />
              <div>
                  <h1 className="text-3xl font-semibold">What defines our store</h1>
                  <p className="text-sm text-slate-500 mt-2">
                      We combine curated products, practical filters, and a lightweight cart experience so shoppers can discover and buy with confidence.
                  </p>
          
                  <div className="flex flex-col gap-10 mt-6">
                      <div className="flex items-center gap-4">
                          <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                              <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="" />
                          </div>
                          <div>
                              <h3 className="text-base font-medium text-slate-600">Fast Product Discovery</h3>
                              <p className="text-sm text-slate-500">Quick loading pages with pagination and search tools that help shoppers find the right item faster.</p>
                          </div>
                      </div>
                      <div className="flex items-center gap-4">
                          <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                              <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png" alt="" />
                          </div>
                          <div>
                              <h3 className="text-base font-medium text-slate-600">Clarity-First Shopping UI</h3>
                              <p className="text-sm text-slate-500">A clean, responsive layout keeps product details, pricing, and categories easy to scan on any device.</p>
                          </div>
                      </div>
                      <div className="flex items-center gap-4">
                          <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                              <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png" alt="" />
                          </div>
                          <div>
                              <h3 className="text-base font-medium text-slate-600">Customer-Centered Experience</h3>
                              <p className="text-sm text-slate-500">From browsing to cart review, every step is designed to be straightforward, reliable, and user-friendly.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};