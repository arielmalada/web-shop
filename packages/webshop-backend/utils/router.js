// emulates router for a backend server similar to Express
const router = {
  routes: [],
  get(path, handler) {
    this.routes.push({ method: 'GET', path, handler });
  },
  post(path, handler) {
    this.routes.push({ method: 'POST', path, handler });
  },
  put(path, handler) {
    this.routes.push({ method: 'PUT', path, handler });
  },
  delete(path, handler) {
    this.routes.push({ method: 'DELETE', path, handler });
  },
};

module.exports = router;

