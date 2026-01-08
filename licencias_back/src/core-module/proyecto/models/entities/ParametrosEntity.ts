import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('parametros')
export class ParametrosEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  parametro: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  valor: string;
}
