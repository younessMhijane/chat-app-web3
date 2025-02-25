import React from 'react';
import ChatInterface from './components/ChatInterface'; // Import par défaut
import WalletConnector from './components/WalletConnector'; // Import par défaut
import { WalletProvider } from './contexts/WalletContext'; // Import nommé

function App() {
  return (
    <WalletProvider>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Chat Web3</h1>
        <WalletConnector />
        <ChatInterface />
      </div>
    </WalletProvider>
  );
}

export default App; // Export par défaut