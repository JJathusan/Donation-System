import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "registrations"), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        createdAt: new Date()
      });
      alert("Registration successful!");
      setForm({ name: "", email: "", phone: "" });
      navigate("/"); // redirect to Home after registration
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
