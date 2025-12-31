import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat_documentos', { schema: 'public' })
export class CatDocumentosEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'documento' })
  documento: string;

  @Column('character varying', { name: 'descripcion' })
  descripcion: string;

  @Column({ type: 'integer', name: 'idestatus' })
  idestatus: number;

}