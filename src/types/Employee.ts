export interface Employee {
    id?: number;
    nombre: string;
    email: string;
    sexo: string;
    area_id?: number;
    boletin: number;
    descripcion: string;
    roles?: Rol[];
    area?: Area
  }

  export interface Rol {
    id: number;
    nombre: string;
  }

  export interface Area {
    id: number;
    nombre: string;
  }