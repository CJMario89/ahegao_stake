import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AccountContext, ContractContext } from "../pages/_app";

const useUnstake = () => {
  const { STAKE } = useContext(ContractContext);
  const { account } = useContext(AccountContext);
  const mutation = useMutation(async ({ unstakes }) => {
    if (
      !STAKE ||
      !account ||
      !(Array.isArray(unstakes) && unstakes.length > 0)
    ) {
      return;
    }
    try {
      const tokenIds = unstakes.map((unstake) => unstake.tokenId);
      const stakes = await STAKE.getStakes(account, tokenIds);
      const verified = stakes.every((stake) => {
        return stake[0];
      });

      if (!verified) {
        throw "You don't own this NFT";
      }

      try {
        const execution = await STAKE.unstake(tokenIds);
        const tx = await execution.wait();
        console.log(tx);
      } catch (e) {
        if (e?.code !== "ACTION_REJECTED") {
          alert("Stake has not ended");
        }
        throw "User rejected";
      }
      const response = await fetch("http://localhost:5050/getStakeReward", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ tokenIds }),
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
