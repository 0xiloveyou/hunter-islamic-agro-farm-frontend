import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getMe,
  googleOAuth,
  userLogin,
  userLogout,
  userRegistration,
  verifyAccount,
} from "@/api";

const USER_QUERY_KEY = ["user"];
const LOGGED_OUT_KEY = ["auth", "loggedOut"];

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogin,
    onSuccess: async () => {
      queryClient.setQueryData(LOGGED_OUT_KEY, false);
      await queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY,
      });
    },
  });
}

export function useVerifyAccount() {
  return useMutation({
    mutationFn: verifyAccount,
  });
}

export function useRegistration() {
  return useMutation({
    mutationFn: userRegistration,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogout,
    onSuccess: async () => {
      queryClient.setQueryData(LOGGED_OUT_KEY, true);

      await queryClient.cancelQueries({
        queryKey: USER_QUERY_KEY,
      });

      queryClient.setQueryData(USER_QUERY_KEY, null);
    },
  });
}

export function useGoogleOAuth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: googleOAuth,
    onSuccess: async () => {
      queryClient.setQueryData(LOGGED_OUT_KEY, false);
      await queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY,
      });
    },
  });
}

export function useGetMe() {
  const queryClient = useQueryClient();

  const loggedOut = queryClient.getQueryData<boolean>(["auth", "loggedOut"]);

  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    enabled: loggedOut !== true,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
