import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ContractContext } from "../../pages/_app";

const replaceIPFS = (url) => {
  return url.replace("ipfs://", "https://ipfs.io/ipfs");
};

const useGetNFTInfo = async (tokenId = "1", options = {}) => {
  const { ERC721 } = useContext(ContractContext);
  return useQuery(
    ["getNFTInfo", tokenId],
    async (tokenId) => {
      if (!ERC721) {
        return {};
      }
      try {
        const uri = await ERC721.tokenURI(tokenId);
        const res = await fetch(uri);
        const json = await res.json();
        const imageUrl = json.image;
        return res.ok ? { ...json, image: replaceIPFS(imageUrl) } : {};
        // const response = await fetch(replaceIPFS(imageUrl));
        //image
        // console.log(response);
      } catch (e) {
        console.log(e);
      }
    },
    { ...options }
  );
};

export default useGetNFTInfo;
