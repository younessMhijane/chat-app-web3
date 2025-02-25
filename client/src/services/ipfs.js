import axios from 'axios';

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

// Fonction pour uploader un message sur IPFS via Pinata
export const uploadToIPFS = async (message, sender) => {
    try {
      const data = {
        pinataContent: {
          message,
          sender,
        },
        pinataMetadata: {
          name: "message.json",
        },
      };
  
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY,
          },
        }
      );
      return response.data.IpfsHash; // Retourne le CID (Content Identifier)
    } catch (error) {
      console.error("Erreur lors de l'upload sur Pinata :", error);
      throw error;
    }
  };

// Fonction pour récupérer un message depuis IPFS via Pinata
export const retrieveFromIPFS = async (cid) => {
  try {
    const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération depuis Pinata :", error);
    throw error;
  }
};