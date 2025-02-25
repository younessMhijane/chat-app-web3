import React, { useContext } from 'react';
import { WalletContext } from '../contexts/WalletContext';

const WalletConnector = () => {
  const { account, connectWallet } = useContext(WalletContext);

  return (
    <div>
      {account ? (
        <p>Connecté avec : {account.slice(0, 6)}...{account.slice(-4)}</p>
      ) : (
        <button 
          onClick={connectWallet}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Connecter Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnector; // Export par défaut