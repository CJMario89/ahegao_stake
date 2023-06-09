import { useContext, useEffect } from "react";
import { ethers } from "ethers";
import { staking_abi } from "../constant/staking_abi";
import { erc721_abi } from "../constant/basic_erc721_abi";
import { AccountContext, ContractContext } from "../pages/_app";

const useConnect = () => {
  const { setSTAKE, setERC721 } = useContext(ContractContext);
  const { setSigner, setStatus, setAccount } = useContext(AccountContext);
  const init = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    setSigner(signer);
    const erc721Contract = new ethers.Contract(
      "0x8b0f78Dc900b27455cC5a7E5f58d4de989DB6E76",
      erc721_abi,
      signer
    );
    const stakingContract = new ethers.Contract(
      "0x7F57387342C2ADabaD64Cb0eD9387136a359172A",
      staking_abi,
      signer
    );
    setSTAKE(stakingContract);
    setERC721(erc721Contract);
    return signer;
  };

  const connect = async () => {
    if (window?.ethereum) {
      try {
        setStatus("isConnecting");
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        //sign message jwt
        const signer = await init();
        console.log(signer);
        const response = await fetch("https://ahegao.love/api/getMessage", {
          method: "POST",
          body: JSON.stringify({ address: accounts[0] }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const signature = await signer.signMessage(data.message);
        const response_ = await fetch("https://ahegao.love/api/sign-in", {
          method: "POST",
          body: JSON.stringify({ address: accounts[0], signature }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const json_ = await response_.json();
        setAccount(accounts[0]);
        setStatus("isConnected");
      } catch (e) {
        console.log(e);
        setStatus("isDisconnected");
      }
    } else {
      window
        .open(
          `https://metamask.app.link/dapp/${window?.location.host}/stake`,
          "_blank"
        )
        .focus();
      setStatus("isDisconnected");
      // alert("Please use browser supported wallets");
    }
  };

  const disconnect = () => {
    setAccount();
    setStatus("isDisconnected");
  };

  // useEffect(() => {
  //   (async () => {
  //     if (window?.ethereum) {
  //       setStatus("isConnecting");
  //       try {
  //         const accounts = await window.ethereum.request({
  //           method: "eth_requestAccounts",
  //         });
  //         //check jwt
  //         const response = await fetch("https://ahegao.love/api/getJWTAddress", {
  //           method: "GET",
  //           credentials: "include",
  //           headers: {
  //             Accept: "application/json",
  //           },
  //         });
  //         const json = await response.json();
  //         const address = json.address;
  //         console.log(address);
  //         if (address?.toLowerCase() !== accounts[0].toLowerCase()) {
  //           setStatus("isDisconnected");
  //           connect();
  //           return;
  //         }
  //         console.log("same");
  //         await init();
  //         console.log("account", accounts);
  //         setAccount(accounts[0]);
  //         setStatus("isConnected");
  //         console.log(address);
  //       } catch (e) {
  //         console.log(e);
  //         connect();
  //         return;
  //       }
  //     } else {
  //       setStatus("isDisconnected");
  //       alert("Please use browser supported wallets");
  //     }
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return {
    connect,
    disconnect,
  };
};

export default useConnect;
