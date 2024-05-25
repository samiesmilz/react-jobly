// LoginForm.jsx
import { useState, useContext } from "react";
import "./LoginForm.css";
import JoblyApi from "./JoblyAPI";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser, setLocalUser } = useContext(AuthContext);
  const initialData = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      const userToken = await JoblyApi.login(formData);

      if (userToken) {
        setUser({ username: formData.username, token: userToken });
        setLocalUser({ username: formData.username, token: userToken });
        navigate("/companies");
      }
      setFormData(initialData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="LoginForm-Div">
      <h3 className="LoginForm-title">
        <span className="title-span">Welcome</span> to Jobly.
      </h3>
      <form onSubmit={handleSubmit} className="LoginForm">
        <div>
          <h5 className="LoginForm-heading">
            Sign in to explore just posted jobs
          </h5>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
