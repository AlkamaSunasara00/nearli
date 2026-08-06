import { mockGarages } from '../../data/mockGarages';
import { mockServices } from '../../data/mockServices';

// Mock API service for Provider/Garage
export const providerService = {
  getGarages: async (filters) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [...mockGarages]; // Return copy to prevent mutation
  },
  
  getGarageById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockGarages.find(g => g.id === id);
  },

  getServices: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockServices;
  },
  
  updateAvailability: async (garageId, availability) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { success: true, availability };
  }
};
