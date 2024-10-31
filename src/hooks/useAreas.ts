import { useQuery } from 'react-query';

const fetchAreas = async () => {
  const response = await fetch('http://localhost:3000/areas'); 
  if (!response.ok) {
    throw new Error('Error al obtener las áreas');
  }
  return response.json();
};

export const useAreas = () => {
  return useQuery(['areas'], fetchAreas);
};
