// contracts/ChatCore.sol
pragma solidity ^0.8.0;

contract ChatCore {
    struct Message {
        address sender;
        string ipfsHash; // Stocke uniquement le CID IPFS
        uint256 timestamp;
    }

    Message[] public messages;
    
    event NewMessage(uint256 indexed messageId, address indexed sender, string ipfsHash);

    function sendMessage(string memory _ipfsHash) public {
        messages.push(Message({
            sender: msg.sender,
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp
        }));
        emit NewMessage(messages.length - 1, msg.sender, _ipfsHash);
    }

    function getMessageCount() public view returns (uint256) {
        return messages.length;
    }
}