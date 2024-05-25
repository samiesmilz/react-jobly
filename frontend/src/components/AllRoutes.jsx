// AllRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Home from "./Home";
import Companies from "./Companies";
import FindElement from "./FindElement";
import JoblyApi from "./JoblyAPI";
import Jobs from "./Jobs";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import AuthContext from "./AuthContext";
import Profile from "./Profile";

const AllRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const { setUser, localUser } = useContext(AuthContext);
  // const [user, setUser] = useState({ username: "", token: "" });
  // const [localUser, setLocalUser] = useLocalStorage("localUser", null);

  useEffect(() => {
    if (localUser) {
      setUser(localUser);
    }
  }, [localUser, setUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesData = await JoblyApi.getCompanies();
        const jobsData = await JoblyApi.getJobs();
        setCompanies(companiesData);
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home companies={companies} jobs={jobs} />} />
      <Route path="/companies" element={<Companies companies={companies} />} />
      <Route
        path="/companies/:name"
        element={<FindElement companies={companies} jobs={jobs} />}
      />
      <Route path="/jobs" element={<Jobs jobs={jobs} />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AllRoutes;
