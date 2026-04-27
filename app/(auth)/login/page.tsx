"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/features/auth/authSlice";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await dispatch(login({ email, password }));

    if (login.fulfilled.match(result)) {
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Welcome back</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="email"
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            id="password"
            className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error ? <p className="mt-3 text-center text-red-500">{error}</p> : null}
          <div className="py-6 text-center">
            <button
              type="submit"
              className="w-56 mb-3 bg-indigo-500 py-2.5 rounded-full text-white disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
