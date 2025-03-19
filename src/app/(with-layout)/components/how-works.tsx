import MySpacer from "@/components/common/my-spacer";
import { STATIC_IMG } from "@/constants/static-image.constant";
import Image from "next/image";

export const HowItWorks = () => {
  return (
    <div>
      <h2 className="text-black font-bold text-3xl text-center">
        How it works section
      </h2>
      <MySpacer className="h-12" />
      <div className="grid md:grid-cols-5 gap-10 md:gap-0 justify-between">
        <div className="space-y-5 text-center">
          <div className="p-4 w-fit text-white rounded-md bg-primary-500 mx-auto">
            <Image
              src={STATIC_IMG.searchCircle}
              alt="search"
              loading="lazy"
              className="object-cover w-4 md:w-6 h-4 md:h-6 rounded-md"
            />
          </div>
          <p className="font-bold text-black text-lg md:text-2xl capitalize">
            Search for a Peer or <br /> Supervisor
          </p>
          <p className="text-gray-600 text-sm">
            Users can find specific colleagues or leaders they want to review
          </p>
        </div>

        <div className="bg-[url(/img/right-down.svg)] bg-contain bg-no-repeat hidden md:block"></div>

        <div className="space-y-5 text-center">
          <div className="p-4 w-fit text-white rounded-md bg-primary-500 mx-auto">
            <Image
              src={STATIC_IMG.stars}
              alt="stars"
              loading="lazy"
              className="object-cover w-4 md:w-6 h-4 md:h-6 rounded-md"
            />
          </div>
          <p className="font-bold text-black text-lg md:text-2xl capitalize">
            Leave a Constructive <br /> Rating
          </p>
          <p className="text-gray-600 text-sm">
            Users can rate aspects like communication, professionalism, and
            technical skills for a well-rounded review.
          </p>
        </div>

        <div className="bg-[url(/img/right-up.svg)] mt-12 bg-contain bg-no-repeat hidden md:block"></div>

        <div className="space-y-5 text-center">
          <div className="p-4 w-fit text-white rounded-md bg-primary-500 mx-auto">
            <Image
              src={STATIC_IMG.eye}
              alt="eye"
              loading="lazy"
              className="object-cover w-4 md:w-6 h-4 md:h-6 rounded-md"
            />
          </div>
          <p className="font-bold text-black text-lg md:text-2xl capitalize">
            Gain True <br /> Insight
          </p>
          <p className="text-gray-600 text-sm">
            Emphasizes making decisions based on the real dynamics of teams and
            leadership.
          </p>
        </div>
      </div>
    </div>
  );
};
