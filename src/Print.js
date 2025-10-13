import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Print.css";


const Print = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:8000/invoices");
      setInvoices(res.data);
    } catch (err) {
      console.error("Failed to fetch invoices", err);
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  };

  const handlePrint = (invoice) => {
    const newWindow = window.open("", "_blank");
  
    const invoiceHTML = `
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              line-height: 1.6;
              color: #333;
            }
            h2, h4 {
              text-align: center;
            }
            .invoice-info {
              margin-bottom: 20px;
            }
            .invoice-info p {
              margin: 5px 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #004aad;
              color: #fff;
            }
            .total {
              text-align: right;
              font-weight: bold;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <h2>Invoice</h2>
          <div class="invoice-info">
            <p><strong>Client Name:</strong> ${invoice.client_name}</p>
            <p><strong>GSTIN:</strong> ${invoice.gstin || "N/A"}</p>
            <p><strong>Invoice Date:</strong> ${invoice.invoice_date}</p>
            <p><strong>Invoice No:</strong> ${invoice.invoice_no || "N/A"}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Particulars</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.items
                .map(
                  (item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.particulars}</td>
                  <td>${parseFloat(item.amount || 0).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <h4 class="total">Total: ₹${calculateTotal(invoice.items).toFixed(2)}</h4>
        </body>
      </html>
    `;
  
    newWindow.document.write(invoiceHTML);
    newWindow.document.close();
    newWindow.print();
  };
  

  return (
    <div className="print-page">
      <h2>Print Invoice Details</h2>
      <input
        type="text"
        placeholder="Search here..."
        className="search-input"
      />
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Client Name</th>
            <th>Client Type</th>
            <th>GST Type</th>
            <th>Total Amount</th>
            <th>Invoice Date</th>
            <th>Invoice No</th>
            <th>Print</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={invoice.id}>
              <td>{index + 1}</td>
              <td>{invoice.client_name}</td>
              <td>{invoice.customer_type}</td>
              <td>{invoice.gst_type}</td>
              <td>{calculateTotal(invoice.items)}</td>
              <td>{invoice.invoice_date}</td>
              <td>{invoice.invoice_no || `000${index + 16}/20-21`}</td>
              <td>
              <span className="print-icon" onClick={() => handlePrint(invoice)} style={{ cursor: "pointer" }}>
               🖨️
              </span>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Print;
