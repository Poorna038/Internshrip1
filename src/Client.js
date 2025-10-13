import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Client.css";

const Client = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleNavigateToCreate = () => {
    navigate("/create-client");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/clients/${id}`);
      alert("Client deleted successfully!");
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client.");
    }
  };

  return (
    <div className="update-container">
      <h2 className="update-title">Clients Details List</h2>
      <button onClick={handleNavigateToCreate}>Create Client</button>

      <table className="client-table">
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Mobile</th>
            <th>PAN</th>
            <th>GSTIN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client.id}>
              <td>{index + 1}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.created_at?.slice(0, 10) || "N/A"}</td>
              <td>{client.mobile}</td>
              <td>{client.pan}</td>
              <td>{client.gstin}</td>
              <td>
                <span
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  onClick={() =>
                    navigate(`/update-client/${client.id}`, { state: { client } })
                  }
                  title="Edit"
                >
                  ✏️
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(client.id)}
                  title="Delete"
                >
                  🗑️
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Client;
