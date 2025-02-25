import React, { createContext, useState } from 'react';
import { ethers } from 'ethers'; // Importez ethers

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      // Créez un provider avec ethers.js
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Demandez la permission de se connecter
      await provider.send("eth_requestAccounts", []);
      
      // Récupérez le signer (compte connecté)
      const signer = await provider.getSigner();
      
      // Mettez à jour l'état
      setProvider(provider);
      setAccount(await signer.getAddress());
    } else {
      alert("Veuillez installer MetaMask !");
    }
  };

  return (
    <WalletContext.Provider value={{ account, connectWallet, provider }}>
      {children}
    </WalletContext.Provider>
  );
};