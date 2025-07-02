const BASE_URL = "https://three-stair-agriculture.onrender.com"; // Your backend API

export const getFishData = async () => {
  const response = await fetch(`${BASE_URL}/fish`);
  return response.json();
};

export const getPoultryData = async () => {
  const response = await fetch(`${BASE_URL}/poultry`);
  return response.json();
};

export const getInventoryData = async () => {
  const response = await fetch(`${BASE_URL}/inventory`);
  return response.json();
};

export const getSolarData = async () => {
  const response = await fetch(`${BASE_URL}/solar`);
  return response.json();
};
