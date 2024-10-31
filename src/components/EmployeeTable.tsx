import React from 'react';
import EmployeeRow from './EmployeeRow';
import { Employee } from '../types/Employee';

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
    <th><i className="fas fa-user" /> Nombre Completo</th>
    <th><i className="fas fa-envelope" /> Email</th>
    <th><i className="fas fa-venus-mars" /> Sexo</th>
    <th><i className="fas fa-briefcase" /> Área</th>
    <th><i className="fas fa-user-shield" /> Roles</th>
    <th><i className="fas fa-newspaper" /> Boletín</th>
    <th><i className="fas fa-cogs" /> Acciones</th>
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
