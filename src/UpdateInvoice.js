import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UpdateInvoice.css";

const UpdateInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:8000/invoices");
      console.log("Fetched invoices:", res.data);
      setInvoices(res.data);
    } catch (err) {
      console.error("Failed to fetch invoices", err);
    }
  };

  const handleInvoiceChange = (invoiceIndex, field, value) => {
    const updated = [...invoices];
    updated[invoiceIndex][field] = value;
    setInvoices(updated);
  };

  const handleItemChange = (invoiceIndex, itemIndex, field, value) => {
    const updated = [...invoices];
    updated[invoiceIndex].items[itemIndex][field] = value;
    setInvoices(updated);
  };

  const deleteItem = (invoiceIndex, itemIndex) => {
    const updated = [...invoices];
    updated[invoiceIndex].items.splice(itemIndex, 1);
    setInvoices(updated);
  };

  const saveInvoice = async (invoiceIndex) => {
    const invoice = invoices[invoiceIndex];
    try {
      await axios.put(`http://localhost:8000/invoices/${invoice.id}`, invoice);
      alert("Invoice updated successfully.");
      setEditIndex(null);
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  const deleteInvoice = async (invoiceIndex) => {
    const invoice = invoices[invoiceIndex];
    try {
      await axios.delete(`http://localhost:8000/invoices/${invoice.id}`);
      const updated = [...invoices];
      updated.splice(invoiceIndex, 1);
      setInvoices(updated);
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  return (
    <div className="invoice-table">
      <h2>Update Invoice</h2>

      {invoices.length === 0 ? (
        <p>No invoices available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Client Name</th>
              <th>Invoice Date</th>
              <th>Customer Type</th>
              <th>GST Type</th>
              <th>Particulars & Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, invoiceIndex) => (
              <tr key={invoice.id}>
                <td>{invoiceIndex + 1}</td>
                <td>
                  <input
                    type="text"
                    value={invoice.client_name}
                    disabled={editIndex !== invoiceIndex}
                    onChange={(e) =>
                      handleInvoiceChange(invoiceIndex, "client_name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={invoice.invoice_date}
                    disabled={editIndex !== invoiceIndex}
                    onChange={(e) =>
                      handleInvoiceChange(invoiceIndex, "invoice_date", e.target.value)
                    }
                  />
                </td>
                <td>{invoice.customer_type}</td>
                <td>{invoice.gst_type}</td>
                <td colSpan={2}>
                  {invoice.items.map((item, itemIndex) => (
                    <div key={item.id} className="item-row">
                      <input
                        type="text"
                        value={item.particulars}
                        disabled={editIndex !== invoiceIndex}
                        onChange={(e) =>
                          handleItemChange(invoiceIndex, itemIndex, "particulars", e.target.value)
                        }
                      />
                      <input
                        type="number"
                        value={item.amount}
                        disabled={editIndex !== invoiceIndex}
                        onChange={(e) =>
                          handleItemChange(invoiceIndex, itemIndex, "amount", e.target.value)
                        }
                      />
                      {editIndex === invoiceIndex && (
                        <button
                          className="delete-btn"
                          onClick={() => deleteItem(invoiceIndex, itemIndex)}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  ))}
                </td>
                <td>
                  {editIndex === invoiceIndex ? (
                    <button
                      className="save-btn"
                      onClick={() => saveInvoice(invoiceIndex)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="edit-btn"
                      onClick={() => setEditIndex(invoiceIndex)}
                    >
                      Edit
                    </button>
                  )}
                  <br />
                  <button
                    className="delete-invoice-btn"
                    onClick={() => deleteInvoice(invoiceIndex)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UpdateInvoice;
