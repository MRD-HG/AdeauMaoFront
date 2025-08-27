import axios from 'axios';
import { 
  mockUser, 
  mockEquipment, 
  mockWorkOrders, 
  mockInterventionRequests,
  mockTeams,
  createMockApiResponse,
  createMockPagedResponse 
} from './mockData';

// Demo mode flag - set to true to use mock data
const DEMO_MODE = true;

// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:5001/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock API delay simulation
const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Token management
let authToken = null;
let refreshToken = null;

export const setAuthTokens = (token, refresh) => {
  authToken = token;
  refreshToken = refresh;
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('refreshToken', refresh);
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }
};

export const getAuthToken = () => {
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
    if (authToken) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }
  }
  return authToken;
};

export const getRefreshToken = () => {
  if (!refreshToken) {
    refreshToken = localStorage.getItem('refreshToken');
  }
  return refreshToken;
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = getRefreshToken();
        if (refresh) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            token: getAuthToken(),
            refreshToken: refresh,
          });

          const { token: newToken, refreshToken: newRefreshToken } = response.data.data;
          setAuthTokens(newToken, newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        setAuthTokens(null, null);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: async (credentials) => {
    if (DEMO_MODE) {
      await mockDelay();
      if (credentials.userName === 'admin' || credentials.userName === 'demo') {
        const token = 'demo-token-' + Date.now();
        return createMockApiResponse({
          token,
          user: mockUser,
          expiresIn: 3600
        });
      } else {
        throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
      }
    }
    return apiClient.post('/auth/login', credentials);
  },
  register: (userData) => apiClient.post('/auth/register', userData),
  refreshToken: (tokenData) => apiClient.post('/auth/refresh-token', tokenData),
  logout: async (token) => {
    if (DEMO_MODE) {
      await mockDelay(200);
      return createMockApiResponse(null);
    }
    return apiClient.post('/auth/revoke-token', token);
  },
  getCurrentUser: async () => {
    if (DEMO_MODE) {
      await mockDelay(200);
      return createMockApiResponse(mockUser);
    }
    return apiClient.get('/auth/me');
  },
  changePassword: (passwordData) => apiClient.post('/auth/change-password', passwordData),
  resetPassword: (resetData) => apiClient.post('/auth/reset-password', resetData),
};

export const equipmentAPI = {
  getAll: async (params = {}) => {
    if (DEMO_MODE) {
      await mockDelay();
      
      let filteredEquipment = [...mockEquipment];
      
      if (params.searchTerm) {
        const searchTerm = params.searchTerm.toLowerCase();
        filteredEquipment = filteredEquipment.filter(eq => 
          eq.nom.toLowerCase().includes(searchTerm) ||
          eq.reference.toLowerCase().includes(searchTerm) ||
          eq.typeEquipement?.toLowerCase().includes(searchTerm) ||
          eq.fabricant?.toLowerCase().includes(searchTerm)
        );
      }
      if (params.typeEquipement) {
        filteredEquipment = filteredEquipment.filter(eq => eq.typeEquipement === params.typeEquipement);
      }
      if (params.fabricant) {
        filteredEquipment = filteredEquipment.filter(eq => eq.fabricant === params.fabricant);
      }
      if (params.etatOperationnel) {
        filteredEquipment = filteredEquipment.filter(eq => eq.etatOperationnel === params.etatOperationnel);
      }
      if (params.dateFrom) {
        filteredEquipment = filteredEquipment.filter(eq => new Date(eq.dateMiseEnService) >= new Date(params.dateFrom));
      }
      if (params.dateTo) {
        filteredEquipment = filteredEquipment.filter(eq => new Date(eq.dateMiseEnService) <= new Date(params.dateTo));
      }
      
      const sortBy = params.sortBy || 'nom';
      const sortDescending = params.sortDescending || false;
      
      filteredEquipment.sort((a, b) => {
        let aVal = a[sortBy] || '';
        let bVal = b[sortBy] || '';
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        if (aVal < bVal) return sortDescending ? 1 : -1;
        if (aVal > bVal) return sortDescending ? -1 : 1;
        return 0;
      });
      
      return createMockPagedResponse(filteredEquipment, params.pageNumber || 1, params.pageSize || 10);
    }
    return apiClient.get('/equipements', { params });
  },
  getById: async (id) => {
    if (DEMO_MODE) {
      await mockDelay();
      const equipment = mockEquipment.find(eq => eq.id === parseInt(id));
      if (!equipment) {
        throw new Error('Équipement non trouvé');
      }
      return createMockApiResponse(equipment);
    }
    return apiClient.get(`/equipements/${id}`);
  },
  getByReference: async (reference) => {
    if (DEMO_MODE) {
      await mockDelay();
      const equipment = mockEquipment.find(eq => eq.reference === reference);
      if (!equipment) {
        throw new Error('Équipement non trouvé');
      }
      return createMockApiResponse(equipment);
    }
    return apiClient.get(`/equipements/reference/${reference}`);
  },
  create: async (data) => {
    if (DEMO_MODE) {
      await mockDelay(800);
      const newEquipment = { ...data, id: Math.max(...mockEquipment.map(eq => eq.id)) + 1, dateCreation: new Date().toISOString(), dateModification: new Date().toISOString(), organes: [] };
      mockEquipment.push(newEquipment);
      return createMockApiResponse(newEquipment);
    }
    return apiClient.post('/equipements', data);
  },
  update: async (id, data) => {
    if (DEMO_MODE) {
      await mockDelay(600);
      const index = mockEquipment.findIndex(eq => eq.id === parseInt(id));
      if (index === -1) throw new Error('Équipement non trouvé');
      mockEquipment[index] = { ...mockEquipment[index], ...data, dateModification: new Date().toISOString() };
      return createMockApiResponse(mockEquipment[index]);
    }
    return apiClient.put(`/equipements/${id}`, data);
  },
  delete: async (id) => {
    if (DEMO_MODE) {
      await mockDelay(400);
      const index = mockEquipment.findIndex(eq => eq.id === parseInt(id));
      if (index === -1) throw new Error('Équipement non trouvé');
      mockEquipment.splice(index, 1);
      return createMockApiResponse(null);
    }
    return apiClient.delete(`/equipements/${id}`);
  },
  getByProductionLine: (lineId) => apiClient.get(`/equipements/ligne-production/${lineId}`),
  getByType: (type) => apiClient.get(`/equipements/type/${type}`),
  getOrganes: async (equipmentId) => {
    if (DEMO_MODE) {
      await mockDelay();
      const equipment = mockEquipment.find(eq => eq.id === parseInt(equipmentId));
      if (!equipment) throw new Error('Équipement non trouvé');
      return createMockApiResponse(equipment.organes || []);
    }
    return apiClient.get(`/equipements/${equipmentId}/organes`);
  },
  createOrgane: async (data) => {
    if (DEMO_MODE) {
      await mockDelay(600);
      const equipment = mockEquipment.find(eq => eq.id === parseInt(data.equipementId));
      if (!equipment) throw new Error('Équipement non trouvé');
      const newOrgane = { ...data, id: Date.now(), dateCreation: new Date().toISOString() };
      equipment.organes = equipment.organes || [];
      equipment.organes.push(newOrgane);
      return createMockApiResponse(newOrgane);
    }
    return apiClient.post('/equipements/organes', data);
  },
  deleteOrgane: async (organeId) => {
    if (DEMO_MODE) {
      await mockDelay(400);
      for (const equipment of mockEquipment) {
        if (equipment.organes) {
          const index = equipment.organes.findIndex(org => org.id === parseInt(organeId));
          if (index !== -1) {
            equipment.organes.splice(index, 1);
            return createMockApiResponse(null);
          }
        }
      }
      throw new Error('Organe non trouvé');
    }
    return apiClient.delete(`/equipements/organes/${organeId}`);
  },
};

export const workOrderAPI = {
  getAll: (params) => apiClient.get('/ordresdetravail', { params }),
  getById: (id) => apiClient.get(`/ordresdetravail/${id}`),
  create: (data) => apiClient.post('/ordresdetravail', data),
  update: (id, data) => apiClient.put(`/ordresdetravail/${id}`, data),
  delete: (id) => apiClient.delete(`/ordresdetravail/${id}`),
  updateProgress: (id, data) => apiClient.patch(`/ordresdetravail/${id}/progression`, data),
  validate: (id, data) => apiClient.post(`/ordresdetravail/${id}/validate`, data),
  generateNumber: () => apiClient.get('/ordresdetravail/generate-numero'),
};

export const interventionRequestAPI = {
  getAll: (params) => apiClient.get('/demandesintervention', { params }),
  getById: (id) => apiClient.get(`/demandesintervention/${id}`),
  create: (data) => apiClient.post('/demandesintervention', data),
  update: (id, data) => apiClient.put(`/demandesintervention/${id}`, data),
  delete: (id) => apiClient.delete(`/demandesintervention/${id}`),
  updateStatus: (id, data) => apiClient.patch(`/demandesintervention/${id}/statut`, data),
  createWorkOrder: (id, data) => apiClient.post(`/demandesintervention/${id}/create-ot`, data),
};

export const employeeAPI = {
  getAll: (params) => apiClient.get('/employes', { params }),
  getById: (id) => apiClient.get(`/employes/${id}`),
  create: (data) => apiClient.post('/employes', data),
  update: (id, data) => apiClient.put(`/employes/${id}`, data),
  delete: (id) => apiClient.delete(`/employes/${id}`),
  assignToTeam: (data) => apiClient.post('/employes/assign-equipe', data),
  assignCompetence: (data) => apiClient.post('/employes/assign-competence', data),
};

export const teamAPI = {
  getAll: async (params = {}) => {
    if (DEMO_MODE) {
      await mockDelay();
      const filtered = mockTeams.filter(team => 
        team.nom.toLowerCase().includes((params.searchTerm || '').toLowerCase()) ||
        team.reference.toLowerCase().includes((params.searchTerm || '').toLowerCase())
      );
      return createMockPagedResponse(filtered, params.pageNumber, params.pageSize);
    }
    return apiClient.get('/equipes', { params });
  },
  getById: (id) => apiClient.get(`/equipes/${id}`),
  create: async (data) => {
    if (DEMO_MODE) {
      await mockDelay();
      const newTeam = { ...data, id: Date.now() };
      mockTeams.push(newTeam);
      return createMockApiResponse(newTeam);
    }
    return apiClient.post('/equipes', data);
  },
  update: async (id, data) => {
    if (DEMO_MODE) {
      await mockDelay();
      const index = mockTeams.findIndex(t => t.id === id);
      if (index > -1) mockTeams[index] = { ...mockTeams[index], ...data };
      return createMockApiResponse(mockTeams[index]);
    }
    return apiClient.put(`/equipes/${id}`, data);
  },
  delete: async (id) => {
    if (DEMO_MODE) {
      await mockDelay();
      const index = mockTeams.findIndex(t => t.id === id);
      if (index > -1) mockTeams.splice(index, 1);
      return createMockApiResponse(null);
    }
    return apiClient.delete(`/equipes/${id}`);
  },
};

export const competenceAPI = {
  getAll: (params) => apiClient.get('/competences', { params }),
  getById: (id) => apiClient.get(`/competences/${id}`),
  create: (data) => apiClient.post('/competences', data),
  update: (id, data) => apiClient.put(`/competences/${id}`, data),
  delete: (id) => apiClient.delete(`/competences/${id}`),
};

export default apiClient;