import { useState, useContext, useEffect } from "react";
import "./Profile.css";
import JoblyApi from "./JoblyAPI";
import AuthContext from "./AuthContext";

const Profile = () => {
  const { user, setUser, setLocalUser } = useContext(AuthContext);
  const [locked, setLocked] = useState(true);

  // Handling form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        JoblyApi.token = user.token;
        const userData = await JoblyApi.getUser(user.username);
        console.log(`Current user: ${userData.username}`);
        setFormData({
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user && user.username) {
      fetchUserData();
    }
  }, [user]);

  const unLock = () => {
    setLocked(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully");
      //   // Remove confirm password field from data before sending
      const userData = formData;
      delete userData.username;
      delete userData.confirmPassword;

      //Check data
      console.log(user.username);
      console.log(user.token);
      console.log(userData);

      JoblyApi.token = user.token;
      const updatedUser = await JoblyApi.updateUser(user.username, userData);
      setUser({ username: formData.username, token: user.token });
      setLocalUser({ ...updatedUser, token: user.token });
      setLocked(true);

      try {
        // await JoblyApi.updateUser(user.username, userData);
        console.log("Profile updated successfully.");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="Profile-Div">
      <h1>Hi, {user.username}.</h1>
      <h3 className="Profile-title">
        Manage your <span className="title-span">Jobly</span> profile here.
      </h3>
      <button onClick={unLock} className="Profile-unlock">
        Edit profile
      </button>
      <form onSubmit={handleSubmit} className="Profile">
        <div>
          <h5 className="Profile-heading">Manage your account</h5>
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
            disabled
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            {...{ disabled: locked }}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First name"
            autoComplete="firstname"
            value={formData.firstName}
            onChange={handleChange}
            {...{ disabled: locked }}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last name"
            autoComplete="lastname"
            value={formData.lastName}
            onChange={handleChange}
            {...{ disabled: locked }}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            autoComplete="password"
            value={formData.password}
            onChange={handleChange}
            {...{ disabled: locked }}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
