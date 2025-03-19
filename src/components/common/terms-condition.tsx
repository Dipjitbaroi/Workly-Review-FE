import { X } from "lucide-react";
import MyButton from "./form/my-button";
import MySpacer from "./my-spacer";

export const TermsCondition = ({
  setTerms,
}: {
  setTerms: (v: boolean) => void;
}) => {
  return (
    <div className="">
      <div className="fixed top-0 left-0 flex flex-1 w-full bg-gray-50/50 p-2 md:p-5 lg:p-10 h-screen">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-white h-[80vh] md:h-[60vh] mx-auto rounded-lg overflow-y-auto p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold ">Terms and Conditions</h2>
            <MyButton onClick={() => setTerms(false)} variant="ghost">
              <X />
            </MyButton>
          </div>

          <div className="text-gray-700/80">
            <p>
              Welcome to <span className="text-blue-500 font-bold">Workly</span>
              . By signing in and using this website, you agree to these Terms
              and Conditions. Please read them carefully, as they define your
              rights, responsibilities, and obligations as a user.
            </p>

            <MySpacer className="h-6" />
            <h2 className="text-base font-bold">1. Purpose of the Platform</h2>
            <p>
              Welcome to Workly. By signing in and using this website, you agree
              to these Terms and Conditions. Please read them carefully, as they
              define your rights, responsibilities, and obligations as a user.
            </p>

            <MySpacer className="h-6" />
            <h2 className="text-lg font-bold">2. User Responsibilities</h2>
            <p>By signing in, you agree to: </p>

            <ul className="list-disc px-5">
              <li>Share accurate, respectful, and truthful experiences.</li>
              <li>Avoid posting defamatory, harmful, or offensive content.</li>
              <li>Abide by all applicable laws and regulations.</li>
              <li>
                Use the Platform for its intended purpose and not for malicious,
                harassing, or otherwise harmful actions.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
