import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AccountContext } from "../../pages/_app";

const useGetUserPoint = () => {
  const { account } = useContext(AccountContext);
  return useQuery(["getUserPoint", account], async () => {
    const response = await fetch(`http://localhost:5050 /getUserPoint`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    const json = await response.json();
    return json.point;
  });
};

export default useGetUserPoint;
