import "react";
import PropTypes from "prop-types";

import "./Companies.css";
import Company from "./Company";
import { Link } from "react-router-dom";

const Companies = ({ companies }) => {
  return (
    <div className="Companies">
      <div className="Companies-heading">
        <h2 className="Companies-title">Companies On Jobly</h2>
        <button className="Companies-add-button">Add your company</button>
      </div>
      {companies.map((company) => (
        <Link to={company.handle} key={company.handle}>
          <Company company={company} />
        </Link>
      ))}
    </div>
  );
};
Companies.propTypes = {
  companies: PropTypes.array.isRequired,
};
export default Companies;
