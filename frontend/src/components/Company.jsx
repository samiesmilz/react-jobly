import "react";
import PropTypes from "prop-types";
import "./Company.css";
const Company = ({ company }) => {
  return (
    <div className="Company">
      <h5 className="Company-name">{company.name}</h5>
      <button className="Company-jobs">Jobs</button>
      <p className="Company-description">{company.description}</p>
      <h6 className="Company-employees">
        Number of employees: {company.numEmployees}
      </h6>
    </div>
  );
};
Company.propTypes = {
  company: PropTypes.object.isRequired,
};
export default Company;
