export default {
  data(propsToValidate, propName, componentName) {
    if (Object.keys(propsToValidate[propName]).length === 0) {
      return new Error(`props.data is malformed in ${componentName}`);
    } return null;
  },
  path: React.PropTypes.string,
  query(propsToValidate, propName, componentName) {
    const ourQuery = propsToValidate[propName];
    if (!((typeof ourQuery === 'string') ||
          (typeof ourQuery === 'object'))) {
      return new Error(`props.query is malformed in ${componentName}`);
    } return null;
  },
  dispatch: React.PropTypes.func,
};
