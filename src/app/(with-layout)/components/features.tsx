import { MyLinkButton } from "@/components/common/my-link-button";
import MySpacer from "@/components/common/my-spacer";
import { STATIC_IMG } from "@/constants/static-image.constant";
import { ClipboardList, LayoutGrid, PenLine } from "lucide-react";
import Image from "next/image";

export const Features = () => {
  const features = [
    {
      title: "Understand Your Team",
      description:
        "Bee honest feedback on peers and supervisors to understand the work environment before you join.",
      icon: <ClipboardList size={18} />,
    },
    {
      title: "Voice Your Experience",
      description:
        "Share real insights on your colleagues and supervisors to help others make informed decisions.",
      icon: <PenLine size={18} />,
    },
    {
      title: "Find the Right Fit",
      description:
        "From team culture to leadership styles, discover workplaces where you'll thrive.",
      icon: <LayoutGrid size={18} />,
    },
  ];
  return (
    <div className="py-16 md:py-20">
      <div className="grid md:grid-cols-2 gap-5 bg-[url(/img/line.svg)] bg-cover bg-opacity-30">
        <div>
          <div className="space-y-5">
            <p className="w-fit uppercase text-xs bg-primary-500/10 text-primary-500 px-2 font-medium rounded-full">
              Features
            </p>
            <h2 className="font-bold text-3xl text-black">
              Why FreshWorkplace?
            </h2>
            <p className="text-gray-600 text-sm">
              With a focus on peer and supervisor insights
            </p>
          </div>

          <div className="pb-4 md:pb-16 pt-5 md:pt-0">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-5 my-5">
                <div className="p-3 text-white rounded-md bg-primary-500">
                  {feature.icon}
                </div>
                <div className="space-y-3">
                  <p className="font-bold text-black text-xl">
                    {feature.title}
                  </p>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center md:justify-end md:items-end">
          <Image src={STATIC_IMG.meeting} alt="meeting" className="w-[400px]" />
        </div>
      </div>

      <MySpacer className="h-20" />
      <div className="grid md:grid-cols-2 gap-6 md:gap-32 items-center justify-center">
        <div className="md:flex justify-end hidden">
          <Image src={STATIC_IMG.lock} alt="meeting" className="w-[650px]" />
        </div>

        <div className="space-y-5 text-center md:text-left">
          <p className="font-bold text-black text-2xl">
            Trust and Transparency
          </p>
          <p className="text-gray-600 text-sm md:w-2/3">
            Anonymously share experiences with your peers and supervisors.
            FreshWorkplace is here to create accountability and openness within
            teams and leadership.
          </p>

          <MySpacer className=" md:h-5" />
          <MyLinkButton href={"/employee"} className="mx-auto md:mx-0">
            Start Rating
          </MyLinkButton>
        </div>
      </div>
    </div>
  );
};
