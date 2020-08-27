const HttpVerb = {
  get get() { return 'GET'; },
  get post() { return 'POST'; },
  get put() { return 'PUT'; },
  get patch() { return 'PATCH'; },
  get head() { return 'HEAD'; },
  get delete() { return 'DELETE'; },
  get options() { return 'OPTIONS'; },
  get all() { return '*'; },
};

export default HttpVerb;
