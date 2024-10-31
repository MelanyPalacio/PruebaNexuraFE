// EmployeesPage.tsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import { useEmployees, useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from '../hooks/useEmployees';
import { Employee } from '../types/Employee';

const EmployeePage = () => {


    const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Usa los hooks personalizados
    const { data: employees, isLoading } = useEmployees();
    const createEmployeeMutation = useCreateEmployee();
    const updateEmployeeMutation = useUpdateEmployee();
    const deleteEmployeeMutation = useDeleteEmployee();

    const handleSubmit = () => {
        if (isEditing && currentEmployee) {
          updateEmployeeMutation.mutate(currentEmployee);
        } else if (currentEmployee) {
          createEmployeeMutation.mutate(currentEmployee);
        }
        setCurrentEmployee(null);
        setIsEditing(false);
      };


    const handleEdit = (employee) => {
        setCurrentEmployee(employee);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        deleteEmployeeMutation.mutate(id);
    };

    if (isLoading) return <div>Cargando...</div>;

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Gestión de Empleados</h1>
            <EmployeeForm
                currentEmployee={currentEmployee}
                setCurrentEmployee={setCurrentEmployee}
                onAddOrEdit={handleSubmit}
                isEditing={isEditing}
            />
            <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
        </div>

    );

};

export default EmployeePage;
