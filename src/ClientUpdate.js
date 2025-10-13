import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./CreateClient.css";

const ClientUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [client, setClient] = useState({
    id: "",
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
    telephone: "",
    email: "",
    pan: "",
    gstin: "",
    st_no: "",
    vat_no: "",
    cst_no: "",
    tan_no: ""
  });

  useEffect(() => {
    // Set initial state from location.state
    if (location.state && location.state.client) {
      setClient(location.state.client);
    } else {
      alert("No client data provided!");
      navigate("/client");
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/clients/${client.id}`, client);
      alert("Client updated successfully!");
      navigate("/client");
    } catch (error) {
      console.error("Error updating client:", error);
      alert("Failed to update client.");
    }
  };

  return (
    <div className="create-client-container">
      <h2>Client Update</h2>
      <form onSubmit={handleSubmit} className="inline-form">
        {[
          ["name", "Client Name", true],
          ["address", "Address"],
          ["city", "City"],
          ["state", "State"],
          ["pincode", "Pincode"],
          ["mobile", "Mobile"],
          ["telephone", "Telephone"],
          ["email", "Email"],
          ["pan", "PAN"],
          ["gstin", "GSTIN"],
          ["stNo", "ST No"],
          ["vatNo", "VAT No"],
          ["cstNo", "CST No"],
          ["tanNo", "TAN No"]
        ].map(([key, label, isDisabled = false]) => (
          <div className="inline-field" key={key}>
            <label>{label}:</label>
            <input
              type="text"
              name={key}
              value={client[key] || ""}
              onChange={handleChange}
              placeholder={`Enter ${label}`}
              disabled={isDisabled}
              required={!isDisabled}
            />
          </div>
        ))}

        <div className="button-group">
          <button type="submit">Update Client</button>
          <button type="button" onClick={() => navigate("/client")} style={{ marginLeft: "10px" }}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientUpdate;
