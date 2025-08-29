import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!form.name.trim()) {
      alert("Name is required!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      alert("Enter a valid email address!");
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      alert("Phone number must be 10 digits!");
      return;
    }

    try {
      await addDoc(collection(db, "registrations"), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        createdAt: serverTimestamp(), // ✅ Firestore server time
      });
      alert("🎉 Registration successful!");
      setForm({ name: "", email: "", phone: "" });
      navigate("/users"); // redirect to User List page
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Donor Registration</h3>

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Enter 10-digit phone number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    Register
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
