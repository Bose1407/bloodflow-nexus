import axios from 'axios';

// Get base URL from environment or use default
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth token management
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Initialize token from localStorage
const savedToken = localStorage.getItem('token');
if (savedToken) {
  setAuthToken(savedToken);
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      setAuthToken(null);
      window.location.href = '/login';
    }
    
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Methods
export const authAPI = {
  login: (credentials: { email: string; password: string; role: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: any) =>
    api.post('/auth/register', userData),
  
  getProfile: () =>
    api.get('/auth/profile'),
  
  updateProfile: (data: any) =>
    api.put('/auth/profile', data),
  
  checkHealth: () =>
    api.get('/health'),
};

export const donorAPI = {
  getDonors: (params?: any) =>
    api.get('/donors', { params }),
  
  createDonor: (data: any) =>
    api.post('/donors', data),
  
  getDonor: (id: string) =>
    api.get(`/donors/${id}`),
  
  updateDonor: (id: string, data: any) =>
    api.put(`/donors/${id}`, data),
  
  deleteDonor: (id: string) =>
    api.delete(`/donors/${id}`),
};

export const inventoryAPI = {
  getInventory: (params?: any) =>
    api.get('/inventory', { params }),
  
  addStock: (data: any) =>
    api.post('/inventory', data),
  
  updateStock: (id: string, data: any) =>
    api.put(`/inventory/${id}`, data),
  
  getReports: () =>
    api.get('/inventory/reports'),
};

export const requestAPI = {
  getRequests: (params?: any) =>
    api.get('/requests', { params }),
  
  createRequest: (data: any) =>
    api.post('/requests', data),
  
  getRequest: (id: string) =>
    api.get(`/requests/${id}`),
  
  updateRequest: (id: string, data: any) =>
    api.put(`/requests/${id}`, data),
  
  approveRequest: (id: string) =>
    api.post(`/requests/${id}/approve`),
  
  rejectRequest: (id: string, reason: string) =>
    api.post(`/requests/${id}/reject`, { reason }),
};

export const driveAPI = {
  getDrives: (params?: any) =>
    api.get('/drives', { params }),
  
  createDrive: (data: any) =>
    api.post('/drives', data),
  
  getDrive: (id: string) =>
    api.get(`/drives/${id}`),
  
  updateDrive: (id: string, data: any) =>
    api.put(`/drives/${id}`, data),
  
  registerForDrive: (id: string) =>
    api.post(`/drives/${id}/register`),
};

export const notificationAPI = {
  getNotifications: () =>
    api.get('/notifications'),
  
  markAsRead: (id: string) =>
    api.put(`/notifications/${id}/read`),
  
  markAllAsRead: () =>
    api.put('/notifications/read-all'),
};

export const adminAPI = {
  getDashboard: () =>
    api.get('/admin/dashboard'),
  
  getUsers: (params?: any) =>
    api.get('/admin/users', { params }),
  
  verifyHospital: (id: string) =>
    api.post(`/admin/hospitals/${id}/verify`),
  
  getSystemSettings: () =>
    api.get('/admin/settings'),
  
  updateSystemSettings: (data: any) =>
    api.put('/admin/settings', data),
};

export default api;