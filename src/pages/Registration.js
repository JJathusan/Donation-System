import React from 'react';

const Registration = () => {
  return (
    <div>
      <h1>Registration</h1>
      <form>
        <input type="text" placeholder="Name" /><br />
        <input type="email" placeholder="Email" /><br />
        <input type="password" placeholder="Password" /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
