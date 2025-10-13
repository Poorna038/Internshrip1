import React, { useState, useEffect } from "react";
import "./InvoiceForm.css";
import { useNavigate } from "react-router-dom";

const InvoiceForm = ({ addInvoice }) => {
  const [customerType, setCustomerType] = useState("regular");
  const [gstType, setGstType] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientGstin, setClientGstin] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [items, setItems] = useState([{ particulars: "", amount: "" }]);
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
    setInvoiceAmount(total);
    setTotalAmount(total); // Could add GST/taxes later if needed
  }, [items]);

  useEffect(() => {
    if (customerType === "regular") {
      setClientAddress("");
      setClientGstin("");
    }
  }, [customerType]);

  const addItem = () => {
    setItems([...items, { particulars: "", amount: "" }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newInvoice = {
      customer_type: customerType,
      gst_type: gstType,
      client_name: clientName,
      client_address: customerType === "onetime" ? clientAddress : null,
      gstin: customerType === "onetime" ? clientGstin : null,
      invoice_date: invoiceDate,
      items: items,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInvoice),
      });

      if (!response.ok) {
        throw new Error("Failed to create invoice");
      }

      alert("Invoice created successfully!");
      navigate("/update-invoice");
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving invoice");
    }
  };

  return (
    <div className="invoice-container">
      <h2>Create Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer Type:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="customerType"
                checked={customerType === "regular"}
                onChange={() => setCustomerType("regular")}
              />
              Regular
            </label>
            <label>
              <input
                type="radio"
                name="customerType"
                checked={customerType === "onetime"}
                onChange={() => setCustomerType("onetime")}
              />
              One-Time
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>GST Type:</label>
          <select value={gstType} onChange={(e) => setGstType(e.target.value)}>
            <option value="">Select GST Type</option>
            <option value="GST1">GST Type 1</option>
            <option value="GST2">GST Type 2</option>
          </select>
        </div>

        <div className="form-group">
          <label>Client Name:</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>

        {customerType === "onetime" && (
          <>
            <div className="form-group">
              <label>Client Address:</label>
              <input
                type="text"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>GSTIN:</label>
              <input
                type="text"
                value={clientGstin}
                onChange={(e) => setClientGstin(e.target.value)}
              />
            </div>
          </>
        )}

        <table>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Particulars</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    value={item.particulars}
                    onChange={(e) =>
                      handleItemChange(index, "particulars", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) =>
                      handleItemChange(index, "amount", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button type="button" onClick={addItem} className="add-btn">
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="form-group">
          <label>Invoice Date:</label>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Invoice Amount:</label>
          <input type="text" value={invoiceAmount.toFixed(2)} readOnly />
        </div>

        <div className="form-group">
          <label>Total Amount:</label>
          <input type="text" value={totalAmount.toFixed(2)} readOnly />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;
