import { queryClient, QueryKeys } from "@/config/query.config";
import {
  ILoginWithEmailSchema,
  LoginWithEmailSchema,
} from "@/services/auth/auth.schema";
import { AuthService } from "@/services/auth/auth.service";
import { ErrorUtil } from "@/utils/error.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useLoginController = () => {
  // const logout = useUserStore((s) => s.logout)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ILoginWithEmailSchema>({
    resolver: zodResolver(LoginWithEmailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (input: ILoginWithEmailSchema) => {
    try {
      console.log(input);

      await AuthService.loginWithEmail(input);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] }),
      ]);
      toast.success("login successful");
    } catch (error) {
      console.error("login with email:onSubmit:->", error);
      const message = ErrorUtil.getErrorMessage(error as Error).message;
      toast.error(message);
    }
  };

  // const logoutUser = async () => {
  //     try {
  //         await LoginService.logoutUser()
  //         await Promise.all([queryClient.invalidateQueries([QUERY_KEYS.CURRENT_USER], { type: "all" })])
  //         logout()
  //         queryClient.clear()
  //     } catch (error) {
  //         console.log(error)
  //         const errorObject = ErrorUtil.getErrorMessage(error as Error)
  //         const message = errorObject?.message
  //         toast.error(message)
  //     }
  // }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting,
  };
};
