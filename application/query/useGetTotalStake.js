import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AccountContext } from "../../pages/_app";

const useGetTotalStake = () => {
  const { account } = useContext(AccountContext);
  return useQuery(["getTotalStake", account], async () => {
    const response = await fetch(`http://35.78.200.94/getTotalStake`, {
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
