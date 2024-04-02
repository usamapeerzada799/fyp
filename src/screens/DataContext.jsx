// DataContext.js
import { createContext, useContext, useState } from 'react';

// Create a context to hold shared data
export const DataContext = createContext();

// Custom hook to consume the context
export const useDataContext = () => useContext(DataContext);

// Context provider component
export const DataContextProvider = ({ children }) => {
  // State to hold the shared data
  const [sharedData, setSharedData] = useState(null);

  return (
    <DataContext.Provider value={{ sharedData, setSharedData }}>
      {children}
    </DataContext.Provider>
  );
};
