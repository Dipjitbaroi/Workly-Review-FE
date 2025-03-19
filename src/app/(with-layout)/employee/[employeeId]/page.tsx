import { MyContainerSection } from "@/components/common/container-section";
import MySpacer from "@/components/common/my-spacer";
import { EmployeeAvgRating } from "./components/employee-avg-rating";
import { Reviews } from "./components/reviews";
import { UserInfo } from "./components/user-info";

const EmployeePage = () => {
  return (
    <MyContainerSection>
      <MySpacer className="h-5" />
      <div className="lg:grid grid-cols-3 gap-5 space-y-5 lg:space-y-0">
        <div className="col-span-2">
          <UserInfo />

          <Reviews />
        </div>

        <div className="lg:col-span-1">
          <EmployeeAvgRating />
        </div>
      </div>
    </MyContainerSection>
  );
};

export default EmployeePage;
