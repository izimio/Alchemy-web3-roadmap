import React, { createContext, useState, useContext, useEffect } from "react";
import server from "../server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [logged, setLogged] = useState(false);

  const getAddresse = (publicKey) => {
    let address = keccak256(publicKey.slice(1)).slice(-20);
    return "0x" + toHex(address);
  };

  useEffect(() => {
    if (!privateKey) return;
    localStorage.setItem("privateKey", privateKey);
    setLogged(true);
  }, [privateKey]);

  useEffect(() => {
    const pk = localStorage.getItem("privateKey");
    if (!pk) return;
    recoverFromPrivateKey(pk);
  }, []);

  const defineBalance = async (address) => {
    const {data} = await server.get("/balance/" + address);
    console.log(data);
    setBalance(data.balance);
  };

  const generateWallet = async () => {
    const tmpPvtKey = secp256k1.utils.randomPrivateKey();
    const publicK = secp256k1.getPublicKey(tmpPvtKey);
    const addr = getAddresse(publicK);

    setPublicKey(toHex(publicK));
    setPrivateKey(toHex(tmpPvtKey));
    setAddress(addr);
  
    await server.post("/wallet", {
      address: addr,
    });
    setBalance(50);
  };

  const recoverFromPrivateKey = (privateK) => {
    let publicK = "";
    try {
      publicK = secp256k1.getPublicKey(privateK);
    } catch (e) {
      return e.message;
    }
    const addr = getAddresse(publicK);
    setPublicKey(toHex(publicK));
    setAddress(addr);
    setPrivateKey(privateK);
  
    defineBalance(addr);
    return "";
  };

  const isLogged = () => {
    return logged;
  };

  return (
    <WalletContext.Provider
      value={{
        privateKey,
        publicKey,
        address,
        generateWallet,
        recoverFromPrivateKey,
        isLogged,
        setLogged,
        balance,
        setBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
