"use client";
import AuthGuard from "@/app/layouts/auth-guard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Network, User } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ReactNode } from "react";

export type ITabType = "profile" | "ratings" | "saved" | undefined;

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const tabList = [
    {
      title: "My Profile",
      value: "/",
      icon: <User size={16} />,
    },
    {
      title: "My Ratings",
      value: "ratings",
      icon: <Network size={16} />,
    },
    {
      title: "Saved",
      value: "saved",
      icon: <Bookmark size={16} />,
    },
  ];

  const pathName = usePathname();
  const params = useParams();
  const activeTab = pathName.split("/");

  return (
    <AuthGuard>
      <div>
        <div className="container mx-auto py-4">
          <Tabs
            defaultValue={
              activeTab.length > 3 ? activeTab[activeTab.length - 1] : "/"
            }
            className="text-center md:text-left"
          >
            <TabsList>
              {tabList.map((item) => (
                <Link
                  key={item.value}
                  href={`/u/${params.userId}/${item.value}`}
                >
                  <TabsTrigger
                    value={item.value}
                    className="data-[state=active]:bg-primary-500 data-[state=active]:text-white text-[#373B3F] font-normal md:w-fit flex gap-1 items-center"
                  >
                    {item.icon} {item.title}
                  </TabsTrigger>
                </Link>
              ))}
            </TabsList>
          </Tabs>
        </div>
        {children}
      </div>
    </AuthGuard>
  );
};

export default ProfileLayout;
