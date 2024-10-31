export interface Employee {
    id?: number;
    nombre: string;
    email: string;
    sexo: string;
    area_id?: number;
    boletin: number;
    descripcion: string;
    roles?: string[];
  }