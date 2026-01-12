import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CatEstatusEntity } from "./catEstatus-entity";
import { UsuariosEntity } from "./usuarios-entity";

@Index("detalle_sesion_pk", ["id"], { unique: true })
@Entity("detalle_sesion", { schema: "public" })
export class DetalleSesionEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", {
    name: "fecha_inicio",
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaInicio: Date;

  @Column("timestamp without time zone", { name: "fecha_fin", nullable: true })
  fechaFin: Date | null;

  @Column("character varying", { name: "ip", nullable: true })
  ip: string | null;

  @Column("boolean", { name: "exitoso", nullable: true })
  exitoso: boolean | null;

  @Column("character varying", { name: "token", nullable: true })
  token: string | null;

  @Column("character varying", { name: "comentarios", nullable: true })
  comentarios: string | null;

  

  @Column("integer", { name: "id_estatus", nullable: true })
  idEstatus: number | null;
  

  @Column("integer", { name: "id_usuario", nullable: true })
  idUsuario: number | null;

  // @ManyToOne(() => CatEstatusEntity, (catEstatus) => catEstatus.detalleSesions)
  // @JoinColumn([{ name: "id_estatus", referencedColumnName: "id" }])
  // idEstatus: CatEstatusEntity;

  // @ManyToOne(() => UsuariosEntity, (usuarios) => usuarios.detalleSesions)
  // @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  // idUsuario: UsuariosEntity;
}
