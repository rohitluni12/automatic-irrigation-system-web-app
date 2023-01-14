import React, { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Context/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await logIn(email, password);
      navigate("/Home");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="head_section">
          <div className="back" id="back_btn">
            Back
          </div>
          <div id="google_translate_element"></div>
        </div>
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="title">Sign In</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                id="password"
              />
            </div>
            {error && <p className="">{error}</p>}

            <input
              type="submit"
              value="Login"
              disabled={loading}
              className="btn solid"
              id="login"
            />
            <p className="social-text">Or Sign In with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
