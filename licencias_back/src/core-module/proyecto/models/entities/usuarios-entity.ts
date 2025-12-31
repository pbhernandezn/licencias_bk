import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios', { schema: 'public' })
export class UsuariosEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;
  
  @Column('date', {name: 'creacion', nullable: true, default: () => 'CURRENT_DATE'})
   creacion: string | null;
   
   @Column('date', {name: 'modificacion', nullable: true, default: () => 'CURRENT_DATE'})
   modificacion: string | null;
   
  @Column({ type: 'integer', name: 'idtipousuario'})
  idtipousuario: number;
  
  @Column('character varying', { name: 'nombres' })
  nombres: string;
  
  @Column('character varying', { name: 'username' })
  username: string;
  
  @Column('character varying', { name: 'password' })
  password: string;
  
  @Column('character varying', { name: 'logintype' })
  logintype: string;
  
  @Column('character varying', { name: 'apellidopaterno' })
  apellidopaterno: string;
  
  @Column('character varying', { name: 'apellidomaterno', nullable: true })
  apellidomaterno: string | null;
  
  @Column('character varying', { name: 'rfc', nullable: true })
  rfc: string | null;
  
  @Column('character varying', { name: 'curp'})
  curp: string;
  
  @Column('character varying', { name: 'domicilio', nullable: true })
  domicilio: string | null;
  
  @Column('character varying', { name: 'colonia', nullable: true })
  colonia: string | null;
  
  @Column({ type: 'integer', name: 'cp', nullable: true})
  cp: number | null;
  
  @Column('character varying', { name: 'municipio', nullable: true })
  municipio: string | null;
  
  @Column('character varying', { name: 'localidad', nullable: true })
  localidad: string | null;
  
  @Column('character varying', { name: 'entidad', nullable: true })
  entidad: string | null;
  
  @Column('character varying', { name: 'email', nullable: true })
  email: string | null;
  
  @Column('character varying', { name: 'nacionalidad', nullable: true })
  nacionalidad: string | null;
  
  @Column('character varying', { name: 'sexo', nullable: true })
  sexo: string | null;
  
  @Column('character varying', { name: 'tiposangre', nullable: true })
  tiposangre: string | null;
  
  @Column('character varying', { name: 'donador', nullable: true })
  donador: string | null;
  
  @Column('character varying', { name: 'lugartrabajo', nullable: true })
  lugartrabajo: string | null;
  
  @Column('character varying', { name: 'restricciones', nullable: true })
  restricciones: string | null;
  
  @Column('character varying', { name: 'observacionmedica', nullable: true })
  observacionmedica: string | null;
  
  @Column('character varying', { name: 'conocido_nombres', nullable: true })
  conocido_nombres: string | null;
  
  @Column('character varying', { name: 'conocido_apellidopaterno', nullable: true })
  conocido_apellidopaterno: string | null;
  
  @Column('character varying', { name: 'conocido_apellidomaterno', nullable: true })
  conocido_apellidomaterno: string | null;
  
  @Column('character varying', { name: 'conocido_domicilio', nullable: true })
  conocido_domicilio: string | null;
  
  @Column({ type: 'integer', name: 'conodico_cp', nullable: true})
  conodico_cp: number | null;
  
  @Column('character varying', { name: 'conodico_colonia', nullable: true })
  conodico_colonia: string | null;
  
  @Column('character varying', { name: 'conodico_municipio', nullable: true })
  conodico_municipio: string | null;
  
  @Column('character varying', { name: 'conodico_localidad', nullable: true })
  conodico_localidad: string | null;
  
  @Column('character varying', { name: 'conodico_telefono', nullable: true })
  conodico_telefono: string | null;
 
  @Column({ type: 'integer', name: 'idestatus' })
  idestatus: number;

}