import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [invoiceDropdown, setInvoiceDropdown] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setInvoiceDropdown(false);
  };

  return (
    <div className="sidebar">
      
      <ul className="nav-links">
        <li>
          <button onClick={() => handleNavigation("/")}>Home</button>
        </li>
        <li>
          <button onClick={() => handleNavigation("/dashboard")}>Dashboard</button>
        </li>
        <li>
          <button onClick={() => handleNavigation("/client")}>Client</button>
        </li>
        <li>
          <button onClick={() => handleNavigation("/users")}>User</button>
        </li>
                  <li className={`dropdown ${invoiceDropdown ? "active" : ""}`}>
            <button className="dropdown-btn" onClick={() => setInvoiceDropdown(!invoiceDropdown)}>
              Invoice
            </button>
            <ul className="dropdown-menu">
              <li>
                <button onClick={() => handleNavigation("/create-invoice")}>Create Invoice</button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/update-invoice")}>Update Invoice</button>
              </li>
            </ul>
          </li>

        <li>
        <button onClick={() =>  handleNavigation("/print")}>Print</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
