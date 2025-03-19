"use client";

import MyButton from "@/components/common/form/my-button";
import { MyInputWithRHF } from "@/components/common/form/my-input";
import MySpacer from "@/components/common/my-spacer";
import { useProfileController } from "../profile.controller";

export const UserEditForm = () => {
  const {
    control,
    handleSubmit,
    isSubmitting,
    isDirty,
    passControl,
    passHandleSubmit,
    isPassSubmitting,
  } = useProfileController();
  return (
    <div className="py-4">
      <h3 className="text-xl font-semibold text-center md:text-left">
        Edit Profile
      </h3>

      <MySpacer className="h-5" />
      <div>
        <p className="text-xs font-semibold pb-3">Profile info</p>
        <div className="grid md:grid-cols-2 gap-3">
          <MyInputWithRHF placeholder="Email" control={control} name="email" />
          <MyInputWithRHF
            placeholder="Linkedin"
            control={control}
            name="linkedInUrl"
          />
          <MyInputWithRHF
            placeholder="Facebook"
            control={control}
            name="facebook"
          />
        </div>
        <MySpacer className="h-4" />
        {isDirty && (
          <MyButton loading={isSubmitting} onClick={handleSubmit}>
            Update
          </MyButton>
        )}
      </div>

      <MySpacer className="h-5" />
      <div>
        <p className="text-xs font-semibold pb-3">Security</p>
        <div className="grid md:grid-cols-2 gap-3">
          <MyInputWithRHF
            type="password"
            placeholder="Current Password"
            control={passControl}
            name="crntPass"
          />
          <div></div>
          <MyInputWithRHF
            type="password"
            placeholder="New Password"
            control={passControl}
            name="newPass"
          />
          <MyInputWithRHF
            type="password"
            placeholder="Confirm Password"
            control={passControl}
            name="confirmPass"
          />
        </div>
        <MySpacer className="h-4" />
        <MyButton loading={isPassSubmitting} onClick={passHandleSubmit}>
          Change password
        </MyButton>
      </div>
    </div>
  );
};
