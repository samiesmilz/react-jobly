import "react";
import PropTypes from "prop-types";

import "./CompanyDetails.css";
import Job from "./Job";

const CompanyDetails = ({ company, jobs }) => {
  return (
    <div className="CompanyDetails">
      <div className="CompanyDetails-heading">
        <h2 className="CompanyDetails-title">{company.name}</h2>
      </div>
      <div className="CompanyDetails-info">
        <p className="CompanyDetails-desc">{company.description}</p>
        <h6 className="CompanyDetails-numEmployees">
          Number of employees: {company.numEmployees}
        </h6>
      </div>
      <h3 className="CompanyDetails-avJobs">Available jobs</h3>

      {jobs
        .filter((job) => job.companyHandle === company.handle)
        .map((job) => (
          <div to={job.id} key={job.id} className="CompanyDetails-jobs">
            <Job job={job} />
          </div>
        ))}
    </div>
  );
};
CompanyDetails.propTypes = {
  jobs: PropTypes.array.isRequired,
};
CompanyDetails.propTypes = {
  company: PropTypes.object.isRequired,
};
export default CompanyDetails;
