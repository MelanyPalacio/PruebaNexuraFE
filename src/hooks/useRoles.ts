import { useQuery } from 'react-query';

const fetchRoles = async () => {
  const response = await fetch('http://localhost:3000/roles'); // Asegúrate de que la URL sea correcta
  if (!response.ok) {
    throw new Error('Error al obtener los roles');
  }
  return response.json();
};

export const useRoles = () => {
  return useQuery(['roles'], fetchRoles);
};
