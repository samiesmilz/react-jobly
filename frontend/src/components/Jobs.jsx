import "react";
import PropTypes from "prop-types";

import "./Jobs.css";
import Job from "./Job";

const Jobs = ({ jobs }) => {
  return (
    <div className="Jobs">
      <div className="Jobs-heading">
        <h2 className="Jobs-title">Find your dream job today!</h2>
      </div>
      <div className="Jobs-info">
        <p className="Jobs-desc">
          Take control of your career journey. Our interactive dashboard gives
          you valuable insights into your applications, helping you tailor your
          approach and land your dream job.
        </p>
        <h6 className="Jobs-slogan">
          Get ready to swipe right on your future career!
        </h6>
      </div>
      <h3 className="Jobs-avJobs">Available jobs.</h3>
      {jobs.map((job) => (
        <div to={job.id} key={job.id} className="Job-instance">
          {<Job job={job} />}
        </div>
      ))}
    </div>
  );
};
Jobs.propTypes = {
  jobs: PropTypes.array.isRequired,
};

export default Jobs;
