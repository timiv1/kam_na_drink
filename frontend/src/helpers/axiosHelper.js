const axios = require("axios");
const serverClient = axios.create({
  baseURL: "https://api.GitHub.com/",
  timeout: 1000,
  headers: {
    //'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  },
});

export default serverClient;
