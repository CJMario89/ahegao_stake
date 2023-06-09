import { useMutation } from "@tanstack/react-query";
import { AccountContext, ContractContext } from "../pages/_app";
import { useContext, useEffect } from "react";

const useStake = ({ nfts, month }) => {
  const { STAKE } = useContext(ContractContext);
  const { account, setStatus, setAccount } = useContext(AccountContext);
  const mutation = useMutation(async () => {
    if (!STAKE || !account) {
      return;
    }
    const tokenIds = nfts.map((nft) => {
      return nft.tokenId;
    });
    try {
      const stakes = await STAKE.getStakes(account, tokenIds);
      const verified = stakes.every((stake) => {
        return !stake[0];
      });

      if (verified) {
        const execution = await STAKE.stake(tokenIds, month);
        const tx = await execution.wait();
        console.log(tx);
      }

      const response = await fetch("https://ahegao.love/api/stake", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ tokenIds }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      const json = await response.json();
      if (json?.err === "no user found") {
        setAccount("");
        setStatus("isDisconnected");
        alert("Your auth has expired");
      }
      return json;
    } catch (e) {
      console.log(e);
      throw e;
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

export default useStake;
