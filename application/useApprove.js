import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AccountContext, ContractContext } from "../pages/_app";

const useApprove = () => {
  const { account } = useContext(AccountContext);
  const { ERC721, STAKE } = useContext(ContractContext);
  const mutation = useMutation(async () => {
    if (!ERC721 || !STAKE || !account) {
      return;
    }
    try {
      const stakingAddress = await STAKE.getAddress();
      const isApproved = await ERC721.isApprovedForAll(account, stakingAddress);
      if (isApproved) {
        return true;
      }
      await ERC721.setApprovalForAll(stakingAddress, true);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  });
  return mutation;
};

export default useApprove;
