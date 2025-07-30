import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Show error toast
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Donors API
export const donorsAPI = {
  getAll: (params) => api.get('/donors', { params }),
  getById: (id) => api.get(`/donors/${id}`),
  create: (donorData) => api.post('/donors', donorData),
  update: (id, donorData) => api.put(`/donors/${id}`, donorData),
  delete: (id) => api.delete(`/donors/${id}`),
};

// Blood Inventory API
export const inventoryAPI = {
  getAll: (params) => api.get('/inventory', { params }),
  getById: (id) => api.get(`/inventory/${id}`),
  create: (inventoryData) => api.post('/inventory', inventoryData),
  update: (id, inventoryData) => api.put(`/inventory/${id}`, inventoryData),
  getCompatible: (bloodGroup, params) => api.get(`/inventory/compatible/${bloodGroup}`, { params }),
};

// Blood Requests API
export const requestsAPI = {
  getAll: (params) => api.get('/requests', { params }),
  getById: (id) => api.get(`/requests/${id}`),
  create: (requestData) => api.post('/requests', requestData),
  updateStatus: (id, statusData) => api.put(`/requests/${id}/status`, statusData),
};

// Donation Drives API
export const drivesAPI = {
  getAll: (params) => api.get('/drives', { params }),
  getById: (id) => api.get(`/drives/${id}`),
  create: (driveData) => api.post('/drives', driveData),
  update: (id, driveData) => api.put(`/drives/${id}`, driveData),
  register: (id) => api.post(`/drives/${id}/register`),
};

// Notifications API
export const notificationsAPI = {
  getAll: (params) => api.get('/notifications', { params }),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  verifyHospital: (id, verificationData) => api.put(`/admin/hospitals/${id}/verify`, verificationData),
  createNotification: (notificationData) => api.post('/admin/notifications', notificationData),
};

// Reports API
export const reportsAPI = {
  getInventoryReport: (params) => api.get('/reports/inventory', { params }),
  getDonationsReport: (params) => api.get('/reports/donations', { params }),
  getRequestsReport: (params) => api.get('/reports/requests', { params }),
};

// Utilities API
export const utilitiesAPI = {
  checkCompatibility: (donorBloodGroup, recipientBloodGroup) => 
    api.get(`/utils/compatibility/${donorBloodGroup}/${recipientBloodGroup}`),
  checkDonorEligibility: (eligibilityData) => api.post('/utils/donor-eligibility', eligibilityData),
  healthCheck: () => api.get('/health'),
};

export { api };
export default api;