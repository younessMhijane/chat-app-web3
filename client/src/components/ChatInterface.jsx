import React, { useState, useContext } from 'react';
import { WalletContext } from '../contexts/WalletContext';
import { uploadToIPFS, retrieveFromIPFS } from '../services/ipfs';

const ChatInterface = () => {
  const { account, provider } = useContext(WalletContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return; // Ignorer les messages vides
  
    try {
      // 1. Uploader le message sur IPFS via Pinata
      const cid = await uploadToIPFS(message, account);
  
      // 2. Afficher le message localement
      setMessages([...messages, { cid, content: message, sender: account }]);
      setMessage(''); // Réinitialiser le champ de texte
  
      // 3. (Optionnel) Enregistrer le CID sur la blockchain
      // Vous pouvez utiliser un smart contract pour stocker le CID.
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{msg.sender.slice(0, 6)}...{msg.sender.slice(-4)}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tapez votre message..."
          style={{ width: '80%', padding: '10px' }}
        />
        <button
          onClick={handleSendMessage}
          style={{ padding: '10px 20px', marginLeft: '10px' }}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;