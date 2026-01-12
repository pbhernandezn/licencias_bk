import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SolicitudesEntity } from "./solicitudes-entity";

@Index("cat_metodopagos_pk", ["id"], { unique: true })
@Entity("cat_metodopagos", { schema: "public" })
export class CatMetodopagos {
  @PrimaryGeneratedColumn({ type: "smallint", name: "id" })
  id: number;

  @Column("character varying", { name: "metodo_pago" })
  metodoPago: string;

  @Column("character varying", { name: "descripcion" })
  descripcion: string;

  @Column("boolean", { name: "activo", default: () => "true" })
  activo: boolean;

  @OneToMany(() => SolicitudesEntity, (solicitudes) => solicitudes.idmetodopago)
  solicitudes: SolicitudesEntity[];
}
