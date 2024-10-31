import React, { useEffect, useState } from 'react';
import { Employee } from '../types/Employee';
import { useAreas } from '../hooks/useAreas';
import { useRoles } from '../hooks/useRoles';


interface EmployeeFormProps {
  currentEmployee: Employee;
  setCurrentEmployee: React.Dispatch<React.SetStateAction<Employee>>;
  onAddOrEdit: (employee: Employee) => void;
  isEditing: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  currentEmployee,
  setCurrentEmployee,
  onAddOrEdit,
  isEditing
}) => {
  const [employeeData, setEmployeeData] = useState<Employee>({
    id: undefined,
    nombre: '',
    email: '',
    sexo: '',
    area_id: undefined,
    boletin: 0,
    descripcion: '',
    roles: [],
  });

  useEffect(() => {
    if (currentEmployee) {
      setEmployeeData(currentEmployee);
    }
  }, [currentEmployee]);

  const { data: areas = [], isLoading: loadingAreas } = useAreas();
  const { data: rolesDisponibles = [], isLoading: loadingRoles } = useRoles();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddOrEdit(currentEmployee);
  };

  const handleRoleChange = (role: string) => {
    const updatedRoles = currentEmployee.roles?.includes(role)
      ? employeeData.roles?.filter(r => r !== role)
      : [...employeeData.roles, role];
    setCurrentEmployee({ ...employeeData, roles: updatedRoles });
  };

  const handleGenderChange = (gender: string) => {
    setCurrentEmployee({
      ...employeeData,
      sexo: employeeData.sexo === gender ? '' : gender
    });
  };

  if (loadingAreas || loadingRoles) {
    return <div>Cargando áreas y roles...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="row mb-3">
        <div className="col-md-12">
          <label className="form-label">Nombre Completo</label>
          <input
            type="text"
            value={employeeData.nombre}
            onChange={(e) => setCurrentEmployee({ ...employeeData, nombre: e.target.value })}
            className="form-control"
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            value={employeeData.email}
            onChange={(e) => setCurrentEmployee({ ...employeeData, email: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Sexo</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={employeeData.sexo === 'M'}
              onChange={() => handleGenderChange('M')}
              id="sexoMasculino"
            />
            <label className="form-check-label" htmlFor="sexoMasculino">
              Masculino
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={employeeData.sexo === 'F'}
              onChange={() => handleGenderChange('F')}
              id="sexoFemenino"
            />
            <label className="form-check-label" htmlFor="sexoFemenino">
              Femenino
            </label>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Área</label>
          <select
            value={employeeData.area_id}
            onChange={(e) => setCurrentEmployee({ ...employeeData, area_id: Number(e.target.value) })}
            className="form-select"
            required
          >
            <option value="">Seleccionar área</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <label className="form-label">Descripción</label>
          <textarea
            value={employeeData.descripcion}
            onChange={(e) => setCurrentEmployee({ ...employeeData, descripcion: e.target.value })}
            className="form-control"
            rows={3}
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <label className="form-label">Roles</label>
          <div className="d-flex flex-wrap">
            {rolesDisponibles.map((role) => (
              <div key={role.id} className="form-check form-check-inline">
                <input
                  type="checkbox"
                  checked={employeeData.roles?.includes(role.id)}
                  onChange={() => handleRoleChange(role.id)}
                  className="form-check-input"
                  id={`role-${role.id}`}
                />
                <label className="form-check-label" htmlFor={`role-${role.id}`}>
                  {role.nombre}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {isEditing ? 'Actualizar Empleado' : 'Crear Empleado'}
      </button>
    </form>
  );
};

export default EmployeeForm;
