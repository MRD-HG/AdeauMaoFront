import axios from 'axios';
import { 
  mockUser, 
  mockEquipment, 
  mockEmployees,
  mockBudgets,
  mockCategories ,
  mockWorkCenters ,
  mockWorkOrders, 
  mockInterventionRequests,
  mockTeams,
  mockBreakdownCauses ,
  createMockApiResponse,
  createMockPagedResponse ,
  mockTriggers ,
  mockSubcontractors ,
  mockWorkflows 

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
export const workflowAPI = {
  getAll: async (params = {}) => {
    if (DEMO_MODE) {
      await mockDelay();
      return createMockPagedResponse(mockWorkflows, params.pageNumber, params.pageSize);
    }
    return apiClient.get('/workflows', { params });
  },
  create: async (data) => {
    if (DEMO_MODE) {
        await mockDelay();
        const newWorkflow = { ...data, id: Date.now(), statut: 'Actif' };
        mockWorkflows.push(newWorkflow);
        return createMockApiResponse(newWorkflow);
    }
    return apiClient.post('/workflows', data);
  },
};
export const subcontractorAPI = {
  getAll: async (params = {}) => {
    if (DEMO_MODE) {
      await mockDelay();
      return createMockPagedResponse(mockSubcontractors, params.pageNumber, params.pageSize);
    }
    return apiClient.get('/subcontractors', { params });
  },
  create: async (data) => {
    if (DEMO_MODE) {
        await mockDelay();
        const newSubcontractor = { ...data, id: Date.now() };
        mockSubcontractors.push(newSubcontractor);
        return createMockApiResponse(newSubcontractor);
    }
    return apiClient.post('/subcontractors', data);
  },
};


export const triggerAPI = {
  getAll: async (params = {}) => {
    if (DEMO_MODE) {
      await mockDelay();
      return createMockPagedResponse(mockTriggers, params.pageNumber, params.pageSize);
    }
    return apiClient.get('/triggers', { params });
  },
  create: async (data) => {
    if (DEMO_MODE) {
        await mockDelay();
        const newTrigger = { ...data, id: Date.now() };
        mockTriggers.push(newTrigger);
        return createMockApiResponse(newTrigger);
    }
    return apiClient.post('/triggers', data);
  },
};
export const workCenterAPI = {
  getAll: async (params = {}) => {
    if (DEMO_MODE) {
      await mockDelay();
      return createMockPagedResponse(mockWorkCenters, params.pageNumber, params.pageSize);
    }
    return apiClient.get('/work-centers', { params });
  },
  create: async (data) => {
    if (DEMO_MODE) {
        await mockDelay();
        const newCenter = { ...data, id: Date.now() };
        mockWorkCenters.push(newCenter);
        return createMockApiResponse(newCenter);
    }
    return apiClient.post('/work-centers', data);
  },
};
export const breakdownCauseAPI = {
  getAll: async (params = {}) => {
    if (DEMO_MODE) {
      await mockDelay();
      return createMockPagedResponse(mockBreakdownCauses, params.pageNumber, params.pageSize);
    }
    return apiClient.get('/breakdown-causes', { params });
  },
  create: async (data) => {
    if (DEMO_MODE) {
        await mockDelay();
        const newCause = { ...data, id: Date.now() };
        mockBreakdownCauses.push(newCause);
        return createMockApiResponse(newCause);
    }
    return apiClient.post('/breakdown-causes', data);
  },
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
export const categoryAPI = {
  getAll: async (params = {}) => {
    if (DEMO_MODE) {
      await mockDelay();
      return createMockPagedResponse(mockCategories, params.pageNumber, params.pageSize);
    }
    return apiClient.get('/categories', { params });
  },
  create: async (data) => {
    if (DEMO_MODE) {
        await mockDelay();
        const newCategory = { ...data, id: Date.now() };
        mockCategories.push(newCategory);
        return createMockApiResponse(newCategory);
    }
    return apiClient.post('/categories', data);
  },
};
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
export const budgetAPI = {
  getAll: async (params = {}) => {
    if (DEMO_MODE) {
      await mockDelay();
      // Calculer l'écart pour chaque budget
      const budgetsWithVariance = mockBudgets.map(b => ({
        ...b,
        ecart: b.budgetReel - b.budgetPrevisionnel
      }));
      return createMockPagedResponse(budgetsWithVariance, params.pageNumber, params.pageSize);
    }
    return apiClient.get('/budgets', { params });
  },
  create: async (data) => {
    if (DEMO_MODE) {
      await mockDelay();
      const newBudget = { ...data, id: Date.now() };
      mockBudgets.push(newBudget);
      return createMockApiResponse(newBudget);
    }
    return apiClient.post('/budgets', data);
  },
  // Ajoutez update et delete ici si nécessaire
};
export const userAPI = {
  updateProfile: async (userId, data) => {
    if (DEMO_MODE) {
      await mockDelay();
      console.log("Updating user profile:", userId, data);
      // Dans une vraie application, vous mettriez à jour l'utilisateur dans la base de données
      // et potentiellement le mockUser pour refléter les changements.
      return createMockApiResponse({ ...mockUser, ...data });
    }
    return apiClient.put(`/users/${userId}/profile`, data);
  }
};
export const dashboardAPI = {
  getStats: async () => {
    if (DEMO_MODE) {
      await mockDelay(700); // Simule un petit temps de chargement
      return createMockApiResponse({
        equipmentCount: mockEquipment.length,
        activeWorkOrders: mockWorkOrders.filter(wo => wo.statut === 'EnCours').length,
        newInterventionRequests: mockInterventionRequests.filter(di => di.statut === 'Nouvelle').length,
        teamCount: mockTeams.length,
        // Prend les 5 ordres de travail les plus récents
        recentWorkOrders: mockWorkOrders.sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation)).slice(0, 5),
      });
    }
    // L'appel à l'API réelle irait ici
    return apiClient.get('/dashboard/stats');
  }
};
export const workOrderAPI = {
  getAll: async (params = {}) => {
    if (DEMO_MODE) {
      await mockDelay();
      let filtered = [...mockWorkOrders];
      
      // Filter by status
      if (params.etat) {
        filtered = filtered.filter(wo => wo.statut === params.etat);
      }
      
      // Filter by search term
      if (params.searchTerm) {
        const searchTerm = params.searchTerm.toLowerCase();
        filtered = filtered.filter(wo =>
          wo.numeroOT.toLowerCase().includes(searchTerm) ||
          wo.equipementNom.toLowerCase().includes(searchTerm) ||
          wo.technicienNom.toLowerCase().includes(searchTerm)
        );
      }
      
      return createMockPagedResponse(filtered, params.pageNumber, params.pageSize);
    }
    return apiClient.get('/ordresdetravail', { params });
  },
  getById: async (id) => {
     if (DEMO_MODE) {
        await mockDelay();
        const workOrder = mockWorkOrders.find(wo => wo.id === parseInt(id));
        return createMockApiResponse(workOrder);
     }
     return apiClient.get(`/ordresdetravail/${id}`);
  },
  create: async (data) => {
    if (DEMO_MODE) {
      await mockDelay();
      const newWorkOrder = {
        ...data,
        id: Date.now(),
        numeroOT: `OT-2024-${mockWorkOrders.length + 10}`,
        dateCreation: new Date().toISOString(),
        pourcentageProgression: 0,
        statut: 'AFaire'
      };
      mockWorkOrders.unshift(newWorkOrder);
      return createMockApiResponse(newWorkOrder);
    }
    return apiClient.post('/ordresdetravail', data);
  },
  update: async (id, data) => {
    if (DEMO_MODE) {
      await mockDelay();
      const index = mockWorkOrders.findIndex(wo => wo.id === parseInt(id));
      if (index > -1) {
        mockWorkOrders[index] = { ...mockWorkOrders[index], ...data };
      }
      return createMockApiResponse(mockWorkOrders[index]);
    }
    return apiClient.put(`/ordresdetravail/${id}`, data);
  },
  delete: async (id) => {
    if (DEMO_MODE) {
      await mockDelay();
      const index = mockWorkOrders.findIndex(wo => wo.id === parseInt(id));
      if (index > -1) {
        mockWorkOrders.splice(index, 1);
      }
      return createMockApiResponse(null);
    }
    return apiClient.delete(`/ordresdetravail/${id}`);
  },
};
export const interventionRequestAPI = {
  getAll: async (params = {}) => {
    if (DEMO_MODE) {
      await mockDelay();
      let filtered = [...mockInterventionRequests];
      
      if (params.statut) {
        filtered = filtered.filter(di => di.statut === params.statut);
      }
      
      return createMockPagedResponse(filtered, params.pageNumber, params.pageSize);
    }
    return apiClient.get('/demandesintervention', { params });
  },
  getById: async (id) => {
    if (DEMO_MODE) {
      await mockDelay();
      const request = mockInterventionRequests.find(r => r.id === parseInt(id));
      return createMockApiResponse(request);
    }
    return apiClient.get(`/demandesintervention/${id}`);
  },
  create: async (data) => {
    if (DEMO_MODE) {
      await mockDelay();
      const newRequest = {
        ...data,
        id: Date.now(),
        dateCreation: new Date().toISOString(),
        dateModification: new Date().toISOString(),
        statut: 'Nouvelle',
      };
      mockInterventionRequests.unshift(newRequest);
      return createMockApiResponse(newRequest);
    }
    return apiClient.post('/demandesintervention', data);
  },
  update: async (id, data) => {
    if (DEMO_MODE) {
      await mockDelay();
      const index = mockInterventionRequests.findIndex(r => r.id === parseInt(id));
      if (index > -1) {
        mockInterventionRequests[index] = { ...mockInterventionRequests[index], ...data, dateModification: new Date().toISOString() };
      }
      return createMockApiResponse(mockInterventionRequests[index]);
    }
    return apiClient.put(`/demandesintervention/${id}`, data);
  },
  delete: async (id) => {
    if (DEMO_MODE) {
      await mockDelay();
      const index = mockInterventionRequests.findIndex(r => r.id === parseInt(id));
      if (index > -1) {
        mockInterventionRequests.splice(index, 1);
      }
      return createMockApiResponse(null);
    }
    return apiClient.delete(`/demandesintervention/${id}`);
  },
};

export const employeeAPI = {
  getAll: async (params = {}) => {
    if (DEMO_MODE) {
      await mockDelay();
      // This is the logic that was missing
      return createMockPagedResponse(mockEmployees, params.pageNumber, params.pageSize);
    }
    return apiClient.get('/employes', { params });
  },
  getById: async (id) => {
    if (DEMO_MODE) {
      await mockDelay();
      const employee = mockEmployees.find(e => e.id === parseInt(id));
      return createMockApiResponse(employee);
    }
    return apiClient.get(`/employes/${id}`);
  },
  create: async (data) => {
    if (DEMO_MODE) {
      await mockDelay();
      const newEmployee = { 
        ...data, 
        id: Date.now(), 
        matricule: `M${mockEmployees.length + 10}` 
      };
      mockEmployees.push(newEmployee);
      return createMockApiResponse(newEmployee);
    }
    return apiClient.post('/employes', data);
  },
  update: async (id, data) => {
    if (DEMO_MODE) {
        await mockDelay();
        const index = mockEmployees.findIndex(e => e.id === parseInt(id));
        if (index > -1) {
            mockEmployees[index] = { ...mockEmployees[index], ...data };
        }
        return createMockApiResponse(mockEmployees[index]);
    }
    return apiClient.put(`/employes/${id}`, data);
  },
  delete: async (id) => {
    if (DEMO_MODE) {
        await mockDelay();
        const index = mockEmployees.findIndex(e => e.id === parseInt(id));
        if (index > -1) {
            mockEmployees.splice(index, 1);
        }
        return createMockApiResponse(null);
    }
    return apiClient.delete(`/employes/${id}`);
  },
}


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