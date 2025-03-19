import { MyContainerSection } from "@/components/common/container-section";
import { AvgRating } from "./components/avg-rating";
import { UserInfo } from "./components/user-info";

export default function ProfilePage() {
  return (
    <MyContainerSection>
      <div className="grid md:grid-cols-5 gap-5">
        <div className="md:col-span-3">
          <UserInfo />
        </div>
        <div className="md:col-span-2">
          <AvgRating />
        </div>
      </div>
    </MyContainerSection>
  );
}
