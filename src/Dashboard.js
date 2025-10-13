// src/Dashboard.js
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Supply Chain Dashboard</h1>
        <div className="filters">
          <input type="date" />
          <select>
            <option>Services: All</option>
          </select>
          <select>
            <option>Posts: All</option>
          </select>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Inventory Quantity</h3>
          <p className="main-value">1,478 <span className="up">↑13%</span></p>
          <p>vs previous 7 days</p>
        </div>

        <div className="card">
          <h3>Order Fulfillment Rate</h3>
          <p className="main-value">93% <span className="up">↑8%</span></p>
          <p>vs previous 7 days</p>
        </div>

        <div className="card">
          <h3>Return Rate</h3>
          <p className="main-value">1.4% <span className="down">↓1</span></p>
          <p>vs previous 7 days</p>
        </div>

        <div className="card">
          <h3>Inventory Days of Supply</h3>
          <p className="main-value">53 <span className="up">↑2</span></p>
          <p>vs previous 7 days</p>
        </div>

        <div className="card large">
          <h3>Sales by Region</h3>
          <div className="chart-placeholder">[Pie Chart]</div>
        </div>

        <div className="card large">
          <h3>Fill Rate</h3>
          <div className="chart-placeholder">[Bar Chart]</div>
        </div>

        <div className="card xlarge">
          <h3>Gross Profit Margin</h3>
          <div className="chart-placeholder">[Area Chart]</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
