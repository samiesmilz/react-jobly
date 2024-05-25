import "react";
import PropTypes from "prop-types";
const NotFound = ({ item }) => {
  return (
    <div>
      <h3>Oops - {item} Not found!</h3>
    </div>
  );
};

NotFound.propTypes = {
  item: PropTypes.array.isRequired,
};
export default NotFound;
