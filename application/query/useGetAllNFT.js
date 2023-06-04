import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AccountContext } from "../../pages/_app";

const useGetAllNFT = () => {
  const { account } = useContext(AccountContext);
  return useQuery(["allNFT", account], async () => {
    const response = await fetch(`http://13.115.250.186/api/getAllNFT`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    const json = await response.json();
    console.log(json?.nfts);
    const allNFTs = json?.nfts.sort((a, b) => {
      return Number(a.tokenId) - Number(b.tokenId);
    });
    return allNFTs;
  });
};

export default useGetAllNFT;
