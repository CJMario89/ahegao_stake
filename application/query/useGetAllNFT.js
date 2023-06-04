import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AccountContext } from "../../pages/_app";

const useGetAllNFT = () => {
  const { account } = useContext(AccountContext);
  return useQuery(["allNFT", account], async () => {
    const response = await fetch(`http://35.78.200.94/getAllNFT`, {
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
