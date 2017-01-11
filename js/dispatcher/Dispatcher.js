export default _.extend(new Flux.Dispatcher(), {
  handleServerAction(action) {
    return this.dispatch({
      source: 'server',
      action,
    });
  },

  handleViewAction(action) {
    return this.dispatch({
      source: 'view',
      action,
    });
  },
});
