import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Users.css"; // Style this however you want

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("User deleted successfully");
        fetchUsers();
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const updateUser = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/users/${editUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser),
      });

      if (res.ok) {
        alert("User updated!");
        setEditUser(null);
        fetchUsers();
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleEditChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleNavigateToCreate = () => {
    navigate("/create-user");
  };

  return (
    <div className="manage-users-container">
      <h2>User Details List</h2>
      <button onClick={handleNavigateToCreate} className="create-button">Create User</button>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>User Type</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) =>
              editUser?.id === user.id ? (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td><input name="name" value={editUser.name} onChange={handleEditChange} /></td>
                  <td><input name="userType" value={editUser.user_type} onChange={handleEditChange} /></td>
                  <td><input name="email" value={editUser.email} onChange={handleEditChange} /></td>
                  <td><input name="mobile" value={editUser.mobile} onChange={handleEditChange} /></td>
                  <td><input name="role" value={editUser.role} onChange={handleEditChange} /></td>
                  <td>
                    <button onClick={updateUser}>Save</button>
                    <button onClick={() => setEditUser(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.user_type}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.role}</td>
                  <td>
                  <button onClick={() => navigate("/update-user", { state: { user } })}>
                    Edit </button>


                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
