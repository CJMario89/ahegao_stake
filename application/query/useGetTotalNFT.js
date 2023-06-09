import { useContext } from "react";
import { AccountContext, ContractContext } from "../../pages/_app";
import { useQuery } from "@tanstack/react-query";

const useGetTotalNFT = () => {
  const { account } = useContext(AccountContext);
  const { ERC721 } = useContext(ContractContext);
  return useQuery(["getTotalNFT", account], async () => {
    if (!ERC721) {
      return 0;
    }
    // const totalSupply = await ERC721.totalSupply();
    // return totalSupply.toString();
    return 3000;
  });
};

export default useGetTotalNFT;
