"use client";

import { useEffect, useState } from "react";

type HomeLoadGateProps = {
  children: React.ReactNode;
};

const MIN_LOADING_MS = 750;

export default function HomeLoadGate({ children }: HomeLoadGateProps) {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowOverlay(false);
    }, MIN_LOADING_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {showOverlay ? (
        <div className="fixed inset-0 z-[60] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center">
          <div className="rounded-2xl border border-gray-200 bg-white px-8 py-7 shadow-xl">
            <div className="mx-auto relative h-12 w-12">
              <span className="absolute inset-0 rounded-full border-4 border-indigo-100" />
              <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 animate-spin" />
            </div>
            <p className="mt-4 text-center text-sm font-semibold tracking-wide text-gray-800">
              Preparing your products
            </p>
          </div>
        </div>
      ) : null}
      {children}
    </>
  );
}
