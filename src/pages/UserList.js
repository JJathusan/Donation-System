import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [view, setView] = useState("table"); // table or cards
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch users
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "registrations"));
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "registrations", id));
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  // ✅ Edit
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  };

  // ✅ Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "registrations", editingUser.id);
      await updateDoc(userRef, formData);
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...u, ...formData } : u
        )
      );
      setEditingUser(null);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // ✅ Sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.key === "name") {
      const nameA = a.name?.toLowerCase() || "";
      const nameB = b.name?.toLowerCase() || "";
      return sortConfig.direction === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }
    if (sortConfig.key === "createdAt") {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
      return sortConfig.direction === "asc"
        ? dateA - dateB
        : dateB - dateA;
    }
    return 0;
  });

  // ✅ Search filter applied after sorting
  const filteredUsers = sortedUsers.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Registered Donors</h2>

      {/* Search + View Toggle */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control w-50"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <button
            className={`btn btn-sm me-2 ${view === "table" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setView("table")}
          >
            Table View
          </button>
          <button
            className={`btn btn-sm ${view === "cards" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setView("cards")}
          >
            Card View
          </button>
        </div>
      </div>

      {/* 📋 Table View */}
      {view === "table" && (
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "▲" : "▼")}
              </th>
              <th>Email</th>
              <th>Phone</th>
              <th onClick={() => handleSort("createdAt")} style={{ cursor: "pointer" }}>
                Created At {sortConfig.key === "createdAt" && (sortConfig.direction === "asc" ? "▲" : "▼")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {user.createdAt?.toDate
                      ? user.createdAt.toDate().toLocaleString()
                      : "N/A"}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(user)}
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* 🃏 Card View */}
      {view === "cards" && (
        <div className="row">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div className="col-md-4 mb-3" key={user.id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">
                      <strong>Email:</strong> {user.email} <br />
                      <strong>Phone:</strong> {user.phone} <br />
                      <strong>Created:</strong>{" "}
                      {user.createdAt?.toDate
                        ? user.createdAt.toDate().toLocaleString()
                        : "N/A"}
                    </p>
                    <div>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEdit(user)}
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No users found</p>
          )}
        </div>
      )}

      {/* ✏️ Edit Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleUpdate}>
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  Edit User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setEditingUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="name"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: e.target.value })
                  }
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  name="phone"
                  className="form-control mb-2"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: e.target.value })
                  }
                  required
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
