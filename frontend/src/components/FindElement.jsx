import "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import CompanyDetails from "./CompanyDetails";
import NotFound from "./NotFound";

const FindElement = ({ companies, jobs }) => {
  const { name } = useParams();

  if (name) {
    let company = companies.find(
      (comp) => comp.handle.toLowerCase() === name.toLowerCase()
    );
    if (company === undefined) return <NotFound item={name} />;
    return <CompanyDetails company={company} jobs={jobs} />;
  }

  return null;
};
FindElement.propTypes = {
  companies: PropTypes.array.isRequired,
};
FindElement.propTypes = {
  jobs: PropTypes.array.isRequired,
};
export default FindElement;
