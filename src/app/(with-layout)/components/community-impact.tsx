import { MyLinkButton } from "@/components/common/my-link-button";
import MySpacer from "@/components/common/my-spacer";
import { STATIC_IMG } from "@/constants/static-image.constant";
import Image from "next/image";

export const CommunityImpact = () => {
  return (
    <div className="py-16 md:py-20">
      <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:gap-32 items-center justify-center">
        <div className="space-y-5">
          <p className="font-bold text-black text-center md:text-left text-2xl">
            Community Impact
          </p>
          <p className="text-gray-600 text-sm md:w-2/3 text-center md:text-left">
            Help shape a culture of transparency and accountability. By sharing
            feedback on peers and supervisors, you contribute to a workplace
            that values respect, collaboration, and growth.
          </p>

          <MySpacer className="md:h-5" />
          <MyLinkButton href={"/employee"} className="mx-auto md:mx-0">
            Join Community
          </MyLinkButton>
        </div>

        <div className="flex justify-end">
          <Image
            src={STATIC_IMG.teamWork}
            alt="meeting"
            className="w-[450px]"
          />
        </div>
      </div>
    </div>
  );
};
