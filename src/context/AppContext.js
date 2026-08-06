import React, { createContext, useContext, useState } from 'react';
import { mockGarages as initialGarages } from '../data/mockGarages';
import { mockMessages as initialMessages } from '../data/mockMessages';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [garages, setGarages] = useState(initialGarages);
  const [savedGarageIds, setSavedGarageIds] = useState([]);
  const [conversations, setConversations] = useState(initialMessages);
  
  // Filtering state
  const [filters, setFilters] = useState({
    vehicle: 'both',
    distance: 'any',
    rating: 0,
  });

  const toggleSaveGarage = (id) => {
    setSavedGarageIds(prev => 
      prev.includes(id) ? prev.filter(gid => gid !== id) : [...prev, id]
    );
  };

  const updateProviderAvailability = (garageId, status) => {
    setGarages(prev => 
      prev.map(g => g.id === garageId ? { ...g, availability: status } : g)
    );
  };

  const updateProviderGarage = (garageId, updates) => {
    setGarages(prev => 
      prev.map(g => g.id === garageId ? { ...g, ...updates } : g)
    );
  };


  const addMessage = (conversationId, messageText, isOwn) => {
    setConversations(prev => 
      prev.map(c => c.id === conversationId ? {
        ...c, 
        messages: [...c.messages, { id: Date.now().toString(), text: messageText, isOwn, time: 'Just now' }]
      } : c)
    );
  };

  return (
    <AppContext.Provider value={{
      garages,
      setGarages,
      savedGarageIds,
      toggleSaveGarage,
      filters,
      setFilters,
      updateProviderAvailability,
      updateProviderGarage,
      conversations,
      setConversations,
      addMessage
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
