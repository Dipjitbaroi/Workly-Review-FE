"use client";

import { QueryKeys } from "@/config/query.config";
import { useUserStore } from "@/hooks/user.store";
import { AuthService } from "@/services/auth/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function AuthWrapper({ children }: PropsWithChildren) {
  const router = useRouter();
  const { setCurrentUser, logout, user } = useUserStore();
  // const [isLoading, setLoading] = useState(false)

  const { data, error } = useQuery({
    queryKey: [QueryKeys.CURRENT_USER],
    queryFn: () => {
      return AuthService.getLoggedInUser();
    },
  });

  useEffect(() => {
    if (data?.id) {
      setCurrentUser(data);
    }
    if (error) {
      logout();
    }
  }, [data, error, logout, setCurrentUser]);

  // if (loading) {
  //   return <h1 className="text-center mt-20">loading...</h1>;
  // }

  if (user?.linkedInId && !user.linkedInUrl) {
    router.push("/registration");
  }
  return <>{children}</>;
}
