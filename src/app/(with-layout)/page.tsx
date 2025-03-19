import { MyContainerSection } from "@/components/common/container-section";
import MySpacer from "@/components/common/my-spacer";
import { CommunityImpact } from "./components/community-impact";
import { Features } from "./components/features";
import { HeroSection } from "./components/hero";
import { HomeCarousel } from "./components/home-carousel";
import { HowItWorks } from "./components/how-works";

export default function HomePage() {
  return (
    <div>
      <MyContainerSection>
        <div>
          <MySpacer className="h-5" />
          <HeroSection />
          <Features />
          <HowItWorks />
          <HomeCarousel />
          <CommunityImpact />
        </div>
      </MyContainerSection>
    </div>
  );
}
