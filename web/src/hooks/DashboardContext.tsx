import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import api from '../services/api';

interface Orphanages {
  id: string;
  name: string;
  whatsapp: string;
  latitude: string;
  longitude: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  image: {
    url: string;
  }
}

interface RestrictedContext {
  orphanages: Orphanages[] | null;
  pendingOrphanages: Orphanages[] | null;
  pendingOrphanagesCount: number;
  orphanagesCount: number;
  error: string;
}

const DashboardProvider = createContext<RestrictedContext>({} as RestrictedContext);

export const DashboardContext: React.FC = ({ children }) => {
  const [orphanages, setOrphanages] = useState<Orphanages[] | null>(null);
  const [pendingOrphanages, setPendingOrphanages] = useState<Orphanages[] | null>(null);
  const [pendingOrphanagesCount, setPendingOrphanagesCount] = useState(0);
  const [orphanagesCount, setOrphangesCount] = useState(0);
  const [error, setError] = useState('');

  const getAllPendingOrphanages = api.get('/dashboard/orphanages');
  const getAllOrphanages = api.get('/orphanages');

  useEffect(() => {
    Promise.all([getAllPendingOrphanages, getAllOrphanages])
      .then((response) => {
        const [ getAllPendingOrphanages, getAllOrphanages ] = response;
        const { data: pendingOrphanagesData } = getAllPendingOrphanages;
        const { data: orphanagesData } = getAllOrphanages;
        const pendingOrphanagesCount = pendingOrphanagesData.length;
        const orphanagesCount = orphanagesData.length;

        setPendingOrphanagesCount(pendingOrphanagesCount);
        setOrphangesCount(orphanagesCount);

        setPendingOrphanages(pendingOrphanagesData);
        setOrphanages(orphanagesData);
      })
      .catch((error) => {
        alert("Você não tem permissão para acessar essa pagina.");

        return setError(error)
      });
  }, []);


  return (
    <DashboardProvider.Provider 
      value={{
        orphanages,
        pendingOrphanages,
        pendingOrphanagesCount,
        orphanagesCount,
        error
      }}
    >
      { children }
    </DashboardProvider.Provider>
  )
}

export const useDashboard = () => {
  const context = useContext(DashboardProvider);

  if (!context) {
    throw new Error(
      'useDashboard context must be used within a DashboardProvider.'
    );
  }

  return context;
}