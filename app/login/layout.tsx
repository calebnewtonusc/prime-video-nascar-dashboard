import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | NASCAR Analytics · Prime Video",
  description: "Amazon Midway federated identity sign-in for Prime Video NASCAR analytics dashboard",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
