import PropTypes from "prop-types";
const InnerComponentWrapper = props => {
  return props.inner;
};
InnerComponentWrapper.propTypes = {
  inner: PropTypes.element.isRequired
};
export default InnerComponentWrapper;
