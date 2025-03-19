import { MyContainerSection } from "@/components/common/container-section";
import MySpacer from "@/components/common/my-spacer";
import { AddColleague } from "./components/add-colleague";
import { EmployeeFilter } from "./components/employee-filter";
import { EmployeeList } from "./components/employee-list";

export default async function EmployeePage() {
  // const { search } = React.use(searchParams);
  return (
    <div className="bg-gray-100 py-10">
      <MyContainerSection>
        <EmployeeFilter />

        <MySpacer className="h-6" />

        <div className="lg:grid grid-cols-4 gap-8 justify-start space-y-6 lg:space-y-0">
          <div className="col-span-3 space-y-5">
            <EmployeeList />
          </div>
          <div className="col-span-1">
            <AddColleague />
          </div>
        </div>
      </MyContainerSection>
    </div>
  );
}
