import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* ✅ Hero Section */}
      <section className="bg-light text-dark text-center p-5 mb-5">
        <div className="container">
          <h1 className="fw-bold text-primary">Make a Difference Today</h1>
          <p className="lead mt-3">
            Your help can empower disadvantaged communities with healthcare, education, and sustainable futures.
          </p>
          <Link to="/registration" className="btn btn-primary btn-lg mt-3">
            Start Donating
          </Link>
        </div>
      </section>

      {/* ✅ Quote */}
      <div className="container mb-5">
        <div className="bg-primary text-white p-4 rounded text-center shadow-sm">
          “Do your little bit of good where you are; it's those little bits of good put together
          that overwhelm the world.”
          <br />
          <small className="fw-bold">– Archbishop Desmond Tutu</small>
        </div>
      </div>

      

      {/* ✅ Campaigns Section (Static placeholder for now) */}
      <section className="container mb-5">
        <h2 className="text-center mb-4">Active Campaigns</h2>
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Education for All</h5>
                <p className="card-text">Supporting children with access to quality education.</p>
                <Link to="/registration" className="btn btn-success btn-sm">
                  Donate Now
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Healthcare Support</h5>
                <p className="card-text">Providing healthcare aid for underprivileged families.</p>
                <Link to="/registration" className="btn btn-success btn-sm">
                  Donate Now
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Food & Nutrition</h5>
                <p className="card-text">Ensuring food security for vulnerable communities.</p>
                <Link to="/registration" className="btn btn-success btn-sm">
                  Donate Now
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Disaster Relief</h5>
                <p className="card-text">Helping families recover from natural disasters.</p>
                <Link to="/registration" className="btn btn-success btn-sm">
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-light text-center p-3 mt-5 border-top">
        <p className="mb-0">© {new Date().getFullYear()} Donation Management System. All rights reserved.</p>
        <p>
          <Link to="/about" className="text-primary text-decoration-none me-2">
            About
          </Link>
          |
          <Link to="/registration" className="text-primary text-decoration-none ms-2">
            Donate
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Home;
