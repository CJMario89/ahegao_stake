import { useMutation } from "@tanstack/react-query";
import { AccountContext, ContractContext } from "../pages/_app";
import { useContext } from "react";

const useStake = ({ tokenId, month }) => {
  const { STAKE } = useContext(ContractContext);
  const { account, setStatus, setAccount } = useContext(AccountContext);
  const mutation = useMutation(async () => {
    if (!STAKE || !account) {
      return;
    }
    try {
      const stake = await STAKE.getStake(account, tokenId);
      console.log(stake);
      const isStaking = stake[0];
      if (!isStaking) {
        const execution = await STAKE.stake(tokenId, month);
        const tx = await execution.wait();
        console.log(tx);
      }

      const response = await fetch("http://localhost:5050/stake", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ tokenId }),
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
      return {};
    }
  });
  return {
    ...mutation,
  };
};

export default useStake;
