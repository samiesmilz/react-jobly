import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Home.css";

const Home = ({ companies, jobs }) => {
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  useEffect(() => {
    const companyInterval = setInterval(() => {
      setCurrentCompanyIndex((prevIndex) => (prevIndex + 1) % companies.length);
    }, 10000);

    const jobInterval = setInterval(() => {
      setCurrentJobIndex((prevIndex) => (prevIndex + 1) % jobs.length);
    }, 10000);

    return () => {
      clearInterval(companyInterval);
      clearInterval(jobInterval);
    };
  }, [companies.length, jobs.length]);

  return (
    <div className="Home">
      <div className="Home-wrapper">
        <div>
          <div>
            <h1 className="Home-title">Welcome to Jobly.</h1>
            <p className="Home-slogan">
              Your one-stop shop for landing your dream job.
            </p>
          </div>
          <div>
            <Link to="/login">
              <button className="Home-buttons">Login</button>
            </Link>
            <Link to="/signup">
              <button className="Home-buttons">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="Home-showcase">
        <div className="Home-companies">
          <div className="card">
            <h2>Companies</h2>
            <h3>{companies[currentCompanyIndex].name}</h3>
            <p>
              {companies[currentCompanyIndex].description.substring(0, 100)}...
            </p>
          </div>
        </div>
        <div className="Home-jobs">
          <div className="card">
            <h2>Jobs</h2>
            <h3>{jobs[currentJobIndex].title}</h3>
            <p>@{jobs[currentJobIndex].companyHandle}</p>
          </div>
        </div>
        <div className="Home-companies">
          <div className="card">
            <h2>Companies</h2>
            <h3>{companies[currentCompanyIndex].name}</h3>
            <p>
              {companies[currentCompanyIndex].description.substring(0, 100)}...
            </p>
          </div>
        </div>
        <div className="Home-jobs">
          <div className="card">
            <h2>Jobs</h2>
            <h3>{jobs[currentJobIndex].title}</h3>
            <p>@{jobs[currentJobIndex].companyHandle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  companies: PropTypes.array.isRequired,
  jobs: PropTypes.array.isRequired,
};

export default Home;
