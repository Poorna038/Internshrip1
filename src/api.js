import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // FastAPI Backend URL

// ✅ Fetch All Clients
export const getClients = async () => {
  return await axios.get(`${API_URL}/clients`);
};

// ✅ Create New Client
export const addClient = async (clientData) => {
  return await axios.post(`${API_URL}/clients`, clientData);
};

// ✅ Update Client
export const updateClient = async (clientId, clientData) => {
  return await axios.put(`${API_URL}/clients/${clientId}`, clientData);
};

// ✅ Delete Client
export const deleteClient = async (clientId) => {
  return await axios.delete(`${API_URL}/clients/${clientId}`);
};
