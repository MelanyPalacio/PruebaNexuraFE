import React, { useEffect, useState } from 'react';
import { Area, Employee, Rol } from '../types/Employee';
import { useAreas } from '../hooks/useAreas';
import { useRoles } from '../hooks/useRoles';

interface EmployeeFormProps {
  currentEmployee: Employee;
  onAddOrEdit: (employee: Employee) => void;
  isEditing: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  currentEmployee,
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

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (currentEmployee) {
      setEmployeeData(currentEmployee);
    }
  }, [currentEmployee]);

  const { data: areas = [], isLoading: loadingAreas } = useAreas();
  const { data: rolesDisponibles = [], isLoading: loadingRoles } = useRoles();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeData.sexo) {
      setErrorMessage('Selecciona el sexo del empleado.');
      return;
    }
    if (!employeeData.roles || employeeData.roles.length === 0) {
      setErrorMessage('Selecciona al menos un rol para el empleado.');
      return;
    }
    setErrorMessage('');
    onAddOrEdit(employeeData);
  };

  const handleRoleChange = (rol: Rol) => {
    let updatedRoles
    if (!employeeData.roles) {
      updatedRoles = [rol]
    } else {
      updatedRoles = employeeData.roles?.filter((r: Rol) => r.id == rol.id).length > 0
        ? employeeData.roles.filter((r) => r.id !== rol.id)
        : [...employeeData.roles, rol];
      console.log({ updatedRoles })
    }
    setEmployeeData({ ...employeeData, roles: updatedRoles });
  };

  const handleGenderChange = (gender: string) => {
    setEmployeeData({
      ...employeeData,
      sexo: employeeData.sexo === gender ? '' : gender
    });
  };

  if (loadingAreas || loadingRoles) {
    return <div>Cargando áreas y roles...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <p className="alert alert-primary" role="alert">Los campos marcados con asterisco (*) son obligatorios.</p>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="row mb-3">
        <div className="col-md-12">
          <label className="form-label">Nombre Completo*</label>
          <input
            type="text"
            placeholder="Nombre completo del empleado"
            value={employeeData.nombre}
            onChange={(e) => setEmployeeData({ ...employeeData, nombre: e.target.value })}
            className="form-control"
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Correo Electrónico*</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={employeeData.email}
            onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Sexo*</label>
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
          <label className="form-label">Área*</label>
          <select
            value={employeeData.area_id}
            onChange={(e) => setEmployeeData({ ...employeeData, area_id: Number(e.target.value) })}
            className="form-select"
            required
          >
            <option value="">Seleccionar área</option>
            {areas.map((area: Area) => (
              <option key={area.id} value={area.id}>
                {area.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <label className="form-label">Descripción*</label>
          <textarea
            placeholder="Descripción de la experiencia del empleado"
            value={employeeData.descripcion}
            onChange={(e) => setEmployeeData({ ...employeeData, descripcion: e.target.value })}
            className="form-control"
            rows={3}
            required
          />
        </div>
        <div className="col-md-12">
          <div className="form-check">
            <input
              type="checkbox"
              id="newsletter"
              checked={employeeData.boletin === 1} // Verifica si boletin es 1
              onChange={(e) => setEmployeeData({
                ...employeeData,
                boletin: e.target.checked ? 1 : 0 // Asigna 1 o 0 según el estado del checkbox
              })}
              className="form-check-input"
            />
            <label htmlFor="newsletter" className="form-check-label">
              Desea recibir boletín informativo
            </label>
          </div>

        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <label className="form-label">Roles*</label>
          <div className="d-flex flex-wrap">
            {rolesDisponibles.map((rol: Rol) => (
              <div key={rol.id} className="form-check form-check-inline">
                <input
                  type="checkbox"
                  checked={employeeData.roles?.some((r) => r.id === rol.id)}
                  onChange={() => handleRoleChange(rol)}
                  className="form-check-input"
                  id={`role-${rol.id}`}
                />
                <label className="form-check-label" htmlFor={`role-${rol.id}`}>
                  {rol.nombre}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="submit" className="btn btn-primary ">
          {isEditing ? 'Actualizar Empleado' : 'Crear Empleado'}
        </button>
      </div>

    </form>
  );
};

export default EmployeeForm;
