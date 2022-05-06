import { Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import { baseAPILink } from "./constants";

interface RefreshTokenResponse extends Response {
  accessToken?: string;
}

export const AuthenticationValidation = () => {
  const { data, error } = useQuery<RefreshTokenResponse>(
    "user",
    () =>
      fetch(`${baseAPILink}/refresh`, {
        credentials: "include"
      })
        .then((res) => res.json())
        .then((res) => res),
    { cacheTime: Infinity, staleTime: Infinity }
  );

  if (data && data.accessToken) localStorage.setItem("token", data.accessToken);

  return error ? <Navigate to="/signin" replace={true} /> : null;
};
