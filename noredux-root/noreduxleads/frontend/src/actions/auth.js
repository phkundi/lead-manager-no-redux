// setup config with token - helper function

export const tokenConfig = (auth) => {
  // get token from state
  const token = auth.token;

  // headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // IF token add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
