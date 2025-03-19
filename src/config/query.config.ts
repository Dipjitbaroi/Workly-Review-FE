import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false, // true
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const QueryKeys = {
  CURRENT_USER: "qk-current-user",
  COMPANY_BY_NAME: "qk-company-by-name",
  DEPARTMENT_BY_NAME: "qk-department-by-name",
  POSITION_BY_NAME: "qk-position-by-name",
  FIND_EMPLOYEE: "qk-find-employee",
  SINGLE_EMPLOYEE: "qk-single-employee",
  GET_PROFILE: "qk-get-profile",
  GET_PROFILE_RATINGS: "qk-get-profile-ratings",
  GET_SAVED_EMPLOYEE: "qk-get-saved-employee",
};
