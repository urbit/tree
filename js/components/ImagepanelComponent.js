const name = (displayName, component) =>
  _.extend(component, { displayName });

export default name('ImagePanel', ({ src }) => {
  const style = `backgroundImage:url('${src}')`;
  return (<div
    className="image-container"
    style={style}
  />);
});
