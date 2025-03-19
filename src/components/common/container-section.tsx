import { ReactNode } from "react";

export const MyContainerSection = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto min-h-[calc(100vh-200px)] px-6 md:px-0 pb-5">
      {children}
    </div>
  );
};
