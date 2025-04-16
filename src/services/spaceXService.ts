import axios from 'axios'

const API_URL = 'https://api.spacexdata.com/v4'

export const fetchRockets = async () => {
  const response = await axios.get(`${API_URL}/rockets`)
  return response.data
} 