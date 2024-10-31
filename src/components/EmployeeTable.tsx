import React from 'react';
import EmployeeRow from './EmployeeRow';

interface Employee {
  id: string;
  nombreCompleto: string;
  email: string;
  sexo: string;
  area: string;
  descripcion: string;
  roles: string[];
}

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => (
  <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nombre Completo</th>
          <th>Email</th>
          <th>Sexo</th>
          <th>Área</th>
          <th>Roles</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <EmployeeRow
            key={employee.id}
            employee={employee}
            onEdit={() => onEdit(employee)}
            onDelete={() => onDelete(employee.id)}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
