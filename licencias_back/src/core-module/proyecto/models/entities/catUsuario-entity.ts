import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat_usuarios', { schema: 'public' })
export class CatUsuarioEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'usuario' })
  usuario: string;

  @Column('character varying', { name: 'descripcion' })
  descripcion: string;

  @Column( {type: 'integer', name: 'idestatus' })
  idestatus: number;

}




