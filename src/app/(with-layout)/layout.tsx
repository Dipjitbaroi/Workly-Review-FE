import { Footer } from "@/components/common/footer";
import { MyHeader } from "@/components/common/header";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <MyHeader />
      {children}
      <Footer />
    </div>
  );
}
