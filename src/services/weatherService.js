// src/services/weatherService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/weather';

// Configure axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
apiClient.interceptors.request.use(config => {
  console.log('Making request to:', config.url);
  return config;
}, error => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Response interceptor
apiClient.interceptors.response.use(response => {
  console.log('Response from:', response.config.url, response.status);
  return response;
}, error => {
  if (error.response) {
    console.error('API Error:', {
      status: error.response.status,
      data: error.response.data,
      url: error.config.url
    });
  }
  return Promise.reject(error);
});

/**
 * Fetches all weather data
 * @returns {Promise<Array>} Array of weather objects
 */
export const getWeatherData = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

/**
 * Fetches weather data by ID
 * @param {string|number} id - Weather record ID
 * @returns {Promise<Object>} Weather object
 */
export const getWeatherById = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch weather with ID ${id}`);
  }
};

/**
 * Adds new weather data
 * @param {Object} data - Weather data to add
 * @returns {Promise<Object>} Added weather object
 */
export const addWeatherData = async (data) => {
  try {
    const response = await apiClient.post('/', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add weather data');
  }
};

/**
 * Updates existing weather data
 * @param {string|number} id - Weather record ID
 * @param {Object} data - Updated weather data
 * @returns {Promise<Object>} Updated weather object
 */
export const updateWeatherData = async (id, data) => {
  try {
    const response = await apiClient.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update weather with ID ${id}`);
  }
};

/**
 * Deletes weather data by ID
 * @param {string|number} id - Weather record ID
 * @returns {Promise<Object>} Deleted weather object
 */
export const deleteWeatherData = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete weather with ID ${id}`);
  }
};

/**
 * Deletes ALL weather data for a specific city
 * @param {string} city - City name to delete
 * @returns {Promise<Array>} Array of deleted weather objects
 */
export const deleteWeatherByCity = async (city) => {
  try {
    // First get all records for the city
    const response = await apiClient.get(`?city=${encodeURIComponent(city)}`);
    const records = response.data;
    
    // Delete all records one by one
    const deletePromises = records.map(record => 
      apiClient.delete(`/${record.id}`)
    );
    
    await Promise.all(deletePromises);
    return records;
  } catch (error) {
    throw new Error(`Failed to delete weather data for city ${city}`);
  }
};

// Default export with all methods
export default {
  getWeatherData,
  getWeatherById,
  addWeatherData,
  updateWeatherData,
  deleteWeatherData,
  deleteWeatherByCity
};