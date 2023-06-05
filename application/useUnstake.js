import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AccountContext, ContractContext } from "../pages/_app";

const useUnstake = () => {
  const { STAKE } = useContext(ContractContext);
  const { account } = useContext(AccountContext);
  const mutation = useMutation(async ({ tokenId }) => {
    if (!STAKE || !account || isNaN(Number(tokenId))) {
      return;
    }
    try {
      const stake = await STAKE.getStake(account, tokenId);
      console.log(stake);
      const isStaking = stake[0];
      console.log(isStaking);
      if (isStaking) {
        try {
          const execution = await STAKE.unstake(tokenId);
          const tx = await execution.wait();
          console.log(tx);
        } catch (e) {
          if (e?.code !== "ACTION_REJECTED") {
            alert("Stake has not ended");
          }
          throw "User rejected";
        }
      }
      const response = await fetch("http://13.115.250.186/api/getStakeReward", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ tokenId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      console.log(json);

      return true;
    } catch (e) {
      console.log(e);
      throw "User rejected";
    }
  });
  useEffect(() => {
    if (mutation.isSuccess) {
      mutation.reset();
    }
  }, [mutation, mutation.isSuccess]);
  return {
    ...mutation,
  };
};

export default useUnstake;
