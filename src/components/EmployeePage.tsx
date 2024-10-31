// EmployeesPage.tsx
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import { useEmployees, useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from '../hooks/useEmployees';
import { Employee } from '../types/Employee';

const EmployeePage = () => {


    const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const { data: employees, isLoading } = useEmployees();
    const createEmployeeMutation = useCreateEmployee();
    const updateEmployeeMutation = useUpdateEmployee();
    const deleteEmployeeMutation = useDeleteEmployee();

    const onAddOrEdit = (currentEmployee: Employee) => {
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
            <h1 >Crear Empleados</h1>
            <EmployeeForm
                currentEmployee={currentEmployee}
                onAddOrEdit={onAddOrEdit}
                isEditing={isEditing}
            />
            <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
        </div>

    );

};

export default EmployeePage;
