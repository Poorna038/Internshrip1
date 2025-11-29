import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./Signin";
import Login from "./Login";
import Sidebar from "./Sidebar";
import TaskBar from "./TaskBar";
import Client from "./Client";
import CreateClient from "./CreateClient";
import ClientUpdate from "./ClientUpdate";
import CreateUser from "./CreateUser";
import Users from "./Users";
import UpdateUser from "./UpdateUser";
import InvoiceForm from "./InvoiceForm";
import UpdateInvoice from "./UpdateInvoice";
import Print from "./Print";
import BusinessHome from "./BusinessHome";
import Dashboard from "./Dashboard";

const AppLayout = ({ children }) => {
  const location = useLocation();

  
  const noSidebarRoutes = ["/login", "/signin"];
  const shouldHideSidebar = noSidebarRoutes.includes(location.pathname);

  return (
    <div className="app-container" style={{ display: "flex" }}>
      {!shouldHideSidebar && <Sidebar />}
      <div className="main-content" style={{ flexGrow: 1 }}>
        {!shouldHideSidebar && <TaskBar />}
        <div className="content" style={{ padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [invoices, setInvoices] = useState([]);

  const addInvoice = (newInvoice) => {
    setInvoices([...invoices, newInvoice]);
  };

  const updateInvoice = (index, field, value) => {
    const updatedInvoices = [...invoices];
    updatedInvoices[index][field] = value;
    setInvoices(updatedInvoices);
  };

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<BusinessHome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/client" element={<Client />} />
          <Route path="/create-client" element={<CreateClient />} />
          <Route path="/update-client/:id" element={<ClientUpdate />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/users" element={<Users />} />
          <Route path="/update-user/" element={<UpdateUser />} />
          <Route path="/create-invoice" element={<InvoiceForm addInvoice={addInvoice} />} />
          <Route path="/update-invoice/" element={<UpdateInvoice invoices={invoices} updateInvoice={updateInvoice} />}/>
          <Route path="/print" element={<Print />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
