import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateClient.css"; // Keep your CSS file

const CreateClient = () => {
  const [client, setClient] = useState({
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/clients", client);
      alert("Client created successfully!");
      navigate("/client");
    } catch (error) {
      console.error("Error creating client:", error);
      alert("Failed to create client.");
    }
  };

  return (
    <div className="create-client-container">
      <h2>Create Client</h2>
      <form onSubmit={handleSubmit} className="inline-form">
        <div className="column">
          <div className="form-group">
            <label>Client Name:</label>
            <input name="name" placeholder="Client Name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input name="address" placeholder="Address" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input name="city" placeholder="City" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>State:</label>
            <input name="state" placeholder="State" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Pincode:</label>
            <input name="pincode" placeholder="Pin Code" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Mobile:</label>
            <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Telephone:</label>
            <input name="telephone" placeholder="Office Phone Number" onChange={handleChange} />
          </div>
        </div>

        <div className="column">
          <div className="form-group">
            <label>Email:</label>
            <input name="email" placeholder="Email ID" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>PAN No:</label>
            <input name="pan" placeholder="10 Digit PAN Number" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>GSTIN:</label>
            <input name="gstin" placeholder="15 Digit GSTIN Number" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>ST No:</label>
            <input name="st_no" placeholder="15 Digit Service Tax Number" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>VAT No:</label>
            <input name="vat_no" placeholder="Value Added Tax Number" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>CST No:</label>
            <input name="cst_no" placeholder="CST Number" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>TAN No:</label>
            <input name="tan_no" placeholder="TAN Number" onChange={handleChange} />
          </div>
        </div>

        <div className="button-group">
          <button type="submit">Create Client</button>
          <button type="button" onClick={() => navigate("/client")} style={{ marginLeft: "10px" }}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClient;
