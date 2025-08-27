// Mock data for demo purposes
export const mockUser = {
  id: 1,
  nom: 'Roudani',
  prenom: 'Mustapha',
  email: 'roudani.Mustapha@adeaumao.com',
  role: 'Administrator',
  telephone: '+212 6 00 11 22 33',
  adresse: '123 Rue de la Maintenance',
  ville: 'Rabat',
  pays: 'Maroc',
  avatar: '/path/to/avatar.jpg' // Nous utiliserons une solution de repli pour l'instant
};
export const mockBudgets = [
  {
    id: 1,
    annee: 2024,
    mois: "Janvier",
    budgetPrevisionnel: 15000,
    budgetReel: 14500,
  },
  {
    id: 2,
    annee: 2024,
    mois: "Février",
    budgetPrevisionnel: 15000,
    budgetReel: 16200,
  },
  {
    id: 3,
    annee: 2024,
    mois: "Mars",
    budgetPrevisionnel: 18000,
    budgetReel: 17500,
  },
];
export const mockWorkflows = [
  { id: 1, reference: 'WF-STD', nom: 'Workflow Maintenance Standard', type: 'Correctif', statut: 'Actif', agent: 'Ahmed Alami', approbateur1: 'Hassan Bennani', approbateur2: 'Fatima Zahra', approbateur3: null, dateDebut: '2024-01-01T00:00:00Z' },
  { id: 2, reference: 'WF-URG', nom: 'Workflow Urgence Production', type: 'Préventif', statut: 'Actif', agent: 'Youssef Alaoui', approbateur1: 'Aicha Benali', approbateur2: null, approbateur3: null, dateDebut: '2024-02-15T00:00:00Z' },
];
export const mockEquipment = [
  {
    id: 1,
    reference: "EQ-001",
    nom: "Compresseur Principal Atlas Copco",
    typeEquipement: "Compresseur",
    fabricant: "Atlas Copco",
    modele: "GA-75",
    dateMiseEnService: "2023-01-15T00:00:00Z",
    localisation: "Atelier Principal - Zone A",
    ligneProductionId: 1,
    ligneProductionNom: "Ligne de Production 1",
    description: "Compresseur d'air principal pour l'alimentation pneumatique",
    etatOperationnel: "En service",
    dateCreation: "2023-01-10T08:00:00Z",
    dateModification: "2024-01-15T10:30:00Z",
    organes: [
      {
        id: 1,
        nomOrgane: "Moteur électrique",
        equipementId: 1,
        description: "Moteur principal 75kW",
        dateCreation: "2023-01-10T08:00:00Z"
      },
      {
        id: 2,
        nomOrgane: "Filtre à air",
        equipementId: 1,
        description: "Filtre d'admission d'air",
        dateCreation: "2023-01-10T08:00:00Z"
      }
    ]
  },
  {
    id: 2,
    reference: "EQ-002",
    nom: "Pompe Centrifuge Grundfos",
    typeEquipement: "Pompe",
    fabricant: "Grundfos",
    modele: "CR-64",
    dateMiseEnService: "2023-02-20T00:00:00Z",
    localisation: "Station de pompage",
    ligneProductionId: 1,
    ligneProductionNom: "Ligne de Production 1",
    description: "Pompe centrifuge pour circuit de refroidissement",
    etatOperationnel: "En maintenance",
    dateCreation: "2023-02-15T08:00:00Z",
    dateModification: "2024-01-20T14:15:00Z",
    organes: [
      {
        id: 3,
        nomOrgane: "Rotor",
        equipementId: 2,
        description: "Rotor de la pompe centrifuge",
        dateCreation: "2023-02-15T08:00:00Z"
      }
    ]
  },
  {
    id: 3,
    reference: "EQ-003",
    nom: "Moteur Électrique ABB",
    typeEquipement: "Moteur",
    fabricant: "ABB",
    modele: "M3BP-160",
    dateMiseEnService: "2023-03-10T00:00:00Z",
    localisation: "Salle des machines - Niveau 2",
    ligneProductionId: 2,
    ligneProductionNom: "Ligne de Production 2",
    description: "Moteur électrique pour entraînement convoyeur",
    etatOperationnel: "En service",
    dateCreation: "2023-03-05T08:00:00Z",
    dateModification: "2024-01-18T09:45:00Z",
    organes: []
  },
  {
    id: 4,
    reference: "EQ-004",
    nom: "Ventilateur Industriel Soler & Palau",
    typeEquipement: "Ventilateur",
    fabricant: "Soler & Palau",
    modele: "TCBB-630",
    dateMiseEnService: "2023-04-05T00:00:00Z",
    localisation: "Système de ventilation - Toiture",
    ligneProductionId: null,
    ligneProductionNom: null,
    description: "Ventilateur d'extraction pour système de ventilation",
    etatOperationnel: "Hors service",
    dateCreation: "2023-04-01T08:00:00Z",
    dateModification: "2024-01-22T16:20:00Z",
    organes: [
      {
        id: 4,
        nomOrgane: "Hélice",
        equipementId: 4,
        description: "Hélice du ventilateur",
        dateCreation: "2023-04-01T08:00:00Z"
      },
      {
        id: 5,
        nomOrgane: "Moteur ventilateur",
        equipementId: 4,
        description: "Moteur d'entraînement du ventilateur",
        dateCreation: "2023-04-01T08:00:00Z"
      }
    ]
  },
  {
    id: 5,
    reference: "EQ-005",
    nom: "Convoyeur à Bande Flexco",
    typeEquipement: "Convoyeur",
    fabricant: "Flexco",
    modele: "FB-1200",
    dateMiseEnService: "2023-05-15T00:00:00Z",
    localisation: "Zone de production - Ligne A",
    ligneProductionId: 1,
    ligneProductionNom: "Ligne de Production 1",
    description: "Convoyeur à bande pour transport de matériaux",
    etatOperationnel: "En service",
    dateCreation: "2023-05-10T08:00:00Z",
    dateModification: "2024-01-25T11:30:00Z",
    organes: [
      {
        id: 6,
        nomOrgane: "Bande transporteuse",
        equipementId: 5,
        description: "Bande en caoutchouc renforcé",
        dateCreation: "2023-05-10T08:00:00Z"
      },
      {
        id: 7,
        nomOrgane: "Tambour moteur",
        equipementId: 5,
        description: "Tambour d'entraînement motorisé",
        dateCreation: "2023-05-10T08:00:00Z"
      }
    ]
  },
  {
    id: 6,
    reference: "EQ-006",
    nom: "Transformateur Schneider Electric",
    typeEquipement: "Transformateur",
    fabricant: "Schneider Electric",
    modele: "TRIHAL-630",
    dateMiseEnService: "2023-06-01T00:00:00Z",
    localisation: "Poste électrique principal",
    ligneProductionId: null,
    ligneProductionNom: null,
    description: "Transformateur de distribution électrique",
    etatOperationnel: "En service",
    dateCreation: "2023-05-25T08:00:00Z",
    dateModification: "2024-01-28T13:45:00Z",
    organes: []
  }
];
export const mockWorkCenters = [
  { id: 1, designation: '40 semaines' },
  { id: 2, designation: '24/24' },
  { id: 3, designation: '6 sur 7' },
];
export const mockBreakdownCauses = [
  { id: 1, reference: 'PE', libelle: 'Panne électrique' },
  { id: 2, reference: 'PM', libelle: 'Panne mécanique' },
  { id: 3, reference: 'PH', libelle: 'Panne hydraulique (Fuite d\'eau)' },
];
export const mockCategories = [
  { id: 1, reference: 'TR', categorie: 'Trémie' },
  { id: 2, reference: 'TRVS', categorie: 'Trémie Vide Sac' },
  { id: 3, reference: 'MLG', categorie: 'Mélangeur' },
];
export const mockTeams = [
  { id: 1, reference: 'ELEC', nom: 'Électriciens' },
  { id: 2, reference: 'MEC', nom: 'Mécaniciens' },
  
];
export const mockTriggers = [
  { id: 1, reference: 'D1', nom: 'Entretien 3000 heures', unite: 'H', valeur: 3000 },
  { id: 2, reference: 'D2', nom: 'Entretien 4000 heures', unite: 'H', valeur: 4000 },
  { id: 3, reference: 'AH', nom: 'Analyse des huiles Transfo', unite: 'A', valeur: 1 },
];
export const mockSubcontractors = [
  { id: 1, reference: 'TEH', nom: 'Travaux Électrique HAKAM', telephone: '+212661123456', email: 'direction@hakam.com', pays: 'Maroc', ville: 'Salé', adresse: 'Hay Salam' },
  { id: 2, reference: 'AF', nom: 'Sté Air Froid', telephone: '+212662234567', email: 'y.chater@airfroid.com', pays: 'Maroc', ville: 'Casablanca', adresse: '196 Avenue...'},
  { id: 3, reference: 'OL', nom: 'Sté Oksa-labo', telephone: '+212663345678', email: 'mohammed.jeddour@oksa.co', pays: 'Maroc', ville: 'Salé', adresse: 'N°59 Zone...'},
];
export const mockWorkOrders = [
  {
    id: 1,
    numeroOT: "OT-2024-001",
    equipementId: 1,
    equipementNom: "Compresseur Principal Atlas Copco",
    equipementReference: "EQ-001",
    descriptionTache: "Maintenance préventive trimestrielle - Vérification générale",
    dateDebutPrevue: "2025-08-25T08:00:00Z",
    dateFinPrevue: "2025-08-25T12:00:00Z",
    technicienAssigneeId: 1,
    technicienNom: "Ahmed Alami",
    statut: "EnCours",
    priorite: "Moyenne",
    dateDebutReelle: "2025-08-25T08:15:00Z",
    dateFinReelle: null,
    tempsPasse: 2.5,
    causePanneId: null,
    causePanneNom: null,
    solutionApportee: "Remplacement du filtre à air, vérification des niveaux",
    remarques: "Démarrage avec 15 minutes de retard",
    demandeInterventionId: null,
    typeMaintenance: "Preventive",
    organeId: 1,
    organeNom: "Moteur électrique",
    coutReel: 150.00,
    pourcentageProgression: 60,
    sousTraitantId: null,
    sousTraitantNom: null,
    dateValidation: null,
    validateurId: null,
    validateurNom: null,
    workflowId: 1,
    workflowNom: "Workflow Maintenance Standard",
    dateCreation: "2025-08-20T10:00:00Z",
    dateModification: "2025-08-25T10:30:00Z"
  },
  {
    id: 2,
    numeroOT: "OT-2024-002",
    equipementId: 2,
    equipementNom: "Pompe Centrifuge Grundfos",
    equipementReference: "EQ-002",
    descriptionTache: "Réparation fuite au niveau du joint d'étanchéité",
    dateDebutPrevue: "2024-01-26T09:00:00Z",
    dateFinPrevue: "2024-01-26T16:00:00Z",
    technicienAssigneeId: 2,
    technicienNom: "Hassan Bennani",
    statut: "AFaire",
    priorite: "Haute",
    dateDebutReelle: null,
    dateFinReelle: null,
    tempsPasse: 0,
    causePanneId: 1,
    causePanneNom: "Usure joint d'étanchéité",
    solutionApportee: null,
    remarques: "Intervention urgente - Arrêt de production",
    demandeInterventionId: 1,
    typeMaintenance: "Corrective",
    organeId: 3,
    organeNom: "Rotor",
    coutReel: 0,
    pourcentageProgression: 0,
    sousTraitantId: null,
    sousTraitantNom: null,
    dateValidation: null,
    validateurId: null,
    validateurNom: null,
    workflowId: 1,
    workflowNom: "Workflow Maintenance Standard",
    dateCreation: "2024-01-24T14:30:00Z",
    dateModification: "2024-01-24T14:30:00Z"
  },
  {
    id: 3,
    numeroOT: "OT-2024-003",
    equipementId: 4,
    equipementNom: "Ventilateur Industriel Soler & Palau",
    equipementReference: "EQ-004",
    descriptionTache: "Remplacement du moteur défaillant",
    dateDebutPrevue: "2024-01-22T08:00:00Z",
    dateFinPrevue: "2024-01-22T17:00:00Z",
    technicienAssigneeId: 3,
    technicienNom: "Fatima Zahra",
    statut: "Termine",
    priorite: "Moyenne",
    dateDebutReelle: "2024-01-22T08:00:00Z",
    dateFinReelle: "2024-01-22T16:30:00Z",
    tempsPasse: 8.5,
    causePanneId: 2,
    causePanneNom: "Défaillance moteur électrique",
    solutionApportee: "Remplacement complet du moteur, test de fonctionnement",
    remarques: "Intervention réalisée dans les temps",
    demandeInterventionId: 2,
    typeMaintenance: "Corrective",
    organeId: 5,
    organeNom: "Moteur ventilateur",
    coutReel: 850.00,
    pourcentageProgression: 100,
    sousTraitantId: null,
    sousTraitantNom: null,
    dateValidation: "2024-01-23T09:00:00Z",
    validateurId: 1,
    validateurNom: "Mohamed Tazi",
    workflowId: 1,
    workflowNom: "Workflow Maintenance Standard",
    dateCreation: "2024-01-20T15:45:00Z",
    dateModification: "2024-01-23T09:00:00Z"
  }
];

export const mockInterventionRequests = [
  {
    id: 1,
    equipementId: 2,
    equipementNom: "Pompe Centrifuge Grundfos",
    equipementReference: "EQ-002",
    descriptionProbleme: "Fuite importante au niveau du joint d'étanchéité, perte de pression",
    demandeurId: 4,
    demandeurNom: "Youssef Alaoui",
    priorite: "Haute",
    statut: "EnCours",
    dateCreation: "2024-01-24T10:30:00Z",
    dateModification: "2024-01-24T14:30:00Z",
    commentaires: "OT créé - Intervention programmée pour demain"
  },
  {
    id: 2,
    equipementId: 4,
    equipementNom: "Ventilateur Industriel Soler & Palau",
    equipementReference: "EQ-004",
    descriptionProbleme: "Moteur ne démarre plus, bruit anormal avant arrêt",
    demandeurId: 5,
    demandeurNom: "Aicha Benali",
    priorite: "Moyenne",
    statut: "Terminee",
    dateCreation: "2024-01-19T16:20:00Z",
    dateModification: "2024-01-23T09:00:00Z",
    commentaires: "Intervention terminée - Moteur remplacé"
  },
  {
    id: 3,
    equipementId: 1,
    equipementNom: "Compresseur Principal Atlas Copco",
    equipementReference: "EQ-001",
    descriptionProbleme: "Niveau d'huile bas, alarme température élevée",
    demandeurId: 6,
    demandeurNom: "Karim Benjelloun",
    priorite: "Moyenne",
    statut: "Nouvelle",
    dateCreation: "2024-01-25T14:15:00Z",
    dateModification: "2024-01-25T14:15:00Z",
    commentaires: null
  }
];
export const mockEmployees = [
  {
    id: 1,
    matricule: 'M001',
    nom: 'Alami',
    prenom: 'Ahmed',
    poste: 'Électricien',
    equipeId: 1,
    equipeNom: 'Électriciens'
  },
  {
    id: 2,
    matricule: 'M002',
    nom: 'Bennani',
    prenom: 'Hassan',
    poste: 'Mécanicien',
    equipeId: 2,
    equipeNom: 'Mécaniciens'
  },
  {
    id: 3,
    matricule: 'M003',
    nom: 'Zahra',
    prenom: 'Fatima',
    poste: 'Chaudronnier',
    equipeId: 3,
    equipeNom: 'Chaudronniers'
  },
   {
    id: 4,
    matricule: 'M004',
    nom: 'Alaoui',
    prenom: 'Youssef',
    poste: 'Technicien de maintenance',
    equipeId: 2,
    equipeNom: 'Mécaniciens'
  }
];
export const mockKpiData = {
  mttr: [
    { month: 'Jan', value: 4.5 },
    { month: 'Fev', value: 4.2 },
    { month: 'Mar', value: 5.1 },
    { month: 'Avr', value: 4.8 },
    { month: 'Mai', value: 4.6 },
    { month: 'Juin', value: 4.9 },
  ],
  mtbf: [
    { month: 'Jan', value: 210 },
    { month: 'Fev', value: 220 },
    { month: 'Mar', value: 205 },
    { month: 'Avr', value: 215 },
    { month: 'Mai', value: 230 },
    { month: 'Juin', value: 225 },
  ],
  equipmentAvailability: [
    { name: 'Compresseurs', value: 98.5, fill: '#8884d8' },
    { name: 'Pompes', value: 99.2, fill: '#82ca9d' },
    { name: 'Moteurs', value: 97.8, fill: '#ffc658' },
    { name: 'Ventilateurs', value: 99.5, fill: '#ff8042' },
  ],
};

// Mock API responses
export const createMockApiResponse = (data, success = true, message = "Opération réussie") => ({
  data: {
    success,
    message,
    data,
    timestamp: new Date().toISOString()
  }
});

export const createMockPagedResponse = (items, pageNumber = 1, pageSize = 10) => {
  const totalCount = items.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pagedItems = items.slice(startIndex, endIndex);

  return createMockApiResponse({
    items: pagedItems,
    totalCount,
    pageNumber,
    pageSize,
    totalPages,
    hasPreviousPage: pageNumber > 1,
    hasNextPage: pageNumber < totalPages
  });
};

