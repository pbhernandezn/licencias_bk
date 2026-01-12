import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("parametros_pk", ["id"], { unique: true })
@Entity("parametros", { schema: "public" })
export class ParametrosEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "parametro" })
  parametro: string;

  @Column("character varying", { name: "valor" })
  valor: string;
}
