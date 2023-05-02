import axios from "axios";

const EXAMPLE_URL = `https://api.coinpaprika.com/v1`;

export const fetchExample = async () => {
  const response = await axios.get(`${EXAMPLE_URL}/coins`);
  const json = response.data;
  return json;
};


