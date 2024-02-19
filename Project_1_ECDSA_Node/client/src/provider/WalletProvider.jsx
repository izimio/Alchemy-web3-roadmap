import React, { createContext, useState, useContext, useEffect } from "react";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import server from "../server";
export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [address, setAddress] = useState("");
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
    if (pk) {
      recoverFromPrivateKey(pk);
    }
  }, []);

  const generateWallet = () => {
    const tmpPvtKey = secp256k1.utils.randomPrivateKey();
    const publicK = secp256k1.getPublicKey(tmpPvtKey);

    setPublicKey(toHex(publicK));
    setPrivateKey(toHex(tmpPvtKey));
    setAddress(getAddresse(publicK));
  };

  const recoverFromPrivateKey = (privateK) => {
    let publicK = "";
    try {
      publicK = secp256k1.getPublicKey(privateK);
    } catch (e) {
      return e.message;
    }

    setPublicKey(toHex(publicK));
    setAddress(getAddresse(publicK));
    setPrivateKey(privateK);
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
