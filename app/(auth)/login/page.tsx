import type { Metadata } from "next";
import LoginForm from "@/components/loginForm";
import { buildSeoMetadata } from "@/components/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "Login",
  description:
    "Log in to NextCommerce to continue browsing products and managing your shopping cart.",
  path: "/login",
  noIndex: true,
});

export default function Login() {
  return (
    <LoginForm />
  );
}
