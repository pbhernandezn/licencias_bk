import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('revisiones_documentos', { schema: 'public' })
export class RevisionesDocumentosEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;
  
  @Column({ type: 'integer', name: 'idrevision' })
  idrevision: number;
  
  @Column({ type: 'integer', name: 'iddocumento' })
  iddocumento: number;
  
  @Column('text', { name: 'comentarios', nullable: true })
  comentarios: string | null;
  
  @Column({ type: 'integer', name: 'idestatus' })
  idestatus: number;
  
  @Column('timestamp', { name: 'creacion', default: () => 'CURRENT_TIMESTAMP' })
  creacion: Date;
  
  @Column('timestamp', { name: 'modificacion', default: () => 'CURRENT_TIMESTAMP' })
  modificacion: Date;
  
  @Column('boolean', { name: 'activo', default: true })
  activo: boolean;
}
