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
      const tx = await ERC721.setApprovalForAll(stakingAddress, true);
      await tx.wait();
      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  });
  return mutation;
};

export default useApprove;
