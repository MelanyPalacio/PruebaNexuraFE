import React from 'react';
import { Employee } from '../types/Employee';



interface EmployeeRowProps {
  employee: Employee;
  onEdit: () => void;
  onDelete: () => void;
}

const EmployeeRow: React.FC<EmployeeRowProps> = ({ employee, onEdit, onDelete }) => {
  return (
  <tr>
    <td>{employee.nombre}</td>
    <td>{employee.email}</td>
    <td>{employee.sexo === 'M' ? 'Masculino' : 'Femenino'}</td>
    <td>{employee.area?.nombre}</td>
    <td>
      {employee.roles?.map((rol, index) => (
        <span key={rol.id}>
          {rol.nombre}{index < employee.roles.length - 1 && ', '}
        </span>
      ))}
    </td>
    <td>{employee.boletin === 1 ? 'Si' : 'No'}</td>

    <td>
      <button onClick={onEdit} className="btn btn-warning btn-sm me-2">
        <i className="fas fa-edit me-1"></i> Editar
      </button>
      <button onClick={onDelete} className="btn btn-danger btn-sm">
        <i className="fas fa-trash me-1"></i> Eliminar
      </button>
    </td>
  </tr>
);
}
export default EmployeeRow;
