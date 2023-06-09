import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AccountContext } from "../../pages/_app";

const useGetAllStake = () => {
  const { account } = useContext(AccountContext);
  return useQuery(["getAllStake", account], async () => {
    const response = await fetch(`https://ahegao.love/api/getAllStake`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    const json = await response.json();
    return json?.allStake;
  });
};

export default useGetAllStake;
