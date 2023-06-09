import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AccountContext } from "../../pages/_app";

const useGetTotalStake = () => {
  const { account } = useContext(AccountContext);
  return useQuery(["getTotalStake", account], async () => {
    const response = await fetch(`https://ahegao.love/api/getTotalStake`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    const json = await response.json();
    return json.num;
  });
};

export default useGetTotalStake;
