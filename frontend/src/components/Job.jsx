import "react";
import PropTypes from "prop-types";

import "./Job.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const Job = ({ job }) => {
  const [apply, setApply] = useState("Apply");
  const [hasApplied, setHasApplied] = useState(false);

  const handleClick = () => {
    setApply("Applied");
    setHasApplied(true);
  };

  return (
    <div className="Job">
      <h4 className="Job-title">
        <b>Job title: </b>
        {job.title}
        <button
          className="Job-apply"
          {...{ disabled: hasApplied }}
          onClick={handleClick}
        >
          {apply}
        </button>
      </h4>
      <h5 className="Job-salary">Salary: ${job.salary}</h5>
      <h6 className="Job-equity">
        Job equity:
        {job.equity}
      </h6>

      {job.companyHandle && (
        <Link to={`/companies/${job.companyHandle}`}>
          <p className="Job-posted-by">Posted by: @{job.companyHandle}</p>
        </Link>
      )}
    </div>
  );
};
Job.propTypes = {
  job: PropTypes.object.isRequired,
};
export default Job;
