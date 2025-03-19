import { useUserStore } from "@/hooks/user.store";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const user = useUserStore((s) => s.user);
  const loading = useUserStore((s) => s.loading);

  if (loading) {
    return (
      <div className="space-y-5 mt-10 container mx-auto">
        <div className="bg-gray-200 h-4 animate-pulse rounded-md"></div>
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-gray-200 h-72 animate-pulse rounded-md col-span-2"></div>
          <div className="bg-gray-200 h-52 animate-pulse rounded-md col-span-1"></div>
        </div>
      </div>
    );
  }
  if (!user) {
    redirect("/login");
  }

  return children;
};

export default AuthGuard;
