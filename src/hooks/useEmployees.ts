import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3000/empleados';

// Hook para obtener empleados
export const useEmployees = () => {
  return useQuery('employees', async () => {
    const response = await axios.get(API_URL);
    return response.data;
  });
};

// Hook para crear un empleado
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (newEmployee) => axios.post(API_URL, newEmployee),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('employees');
      },
    }
  );
};

// Hook para actualizar un empleado
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (updatedEmployee) => axios.put(`${API_URL}/${updatedEmployee.id}`, updatedEmployee),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('employees');
      },
    }
  );
};

// Hook para eliminar un empleado
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id) => axios.delete(`${API_URL}/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('employees');
      },
    }
  );
};
