--
-- PostgreSQL database dump
--

--
-- TOC entry 5 (class 2615 OID 25077)
-- Name: public; Type: SCHEMA; Schema: -; Owner: dgolicencias
--

DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;


--
-- TOC entry 217 (class 1259 OID 25079)
-- Name: cat_cp; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.cat_cp (
    id smallint NOT NULL,
    cp character varying NOT NULL,
    municipio character varying,
    localidad character varying NOT NULL
);



--
-- TOC entry 218 (class 1259 OID 25084)
-- Name: cat_cp_id_seq; Type: SEQUENCE; Schema: public; Owner: dgolicencias
--

ALTER TABLE public.cat_cp ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cat_cp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 25085)
-- Name: cat_documentos; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.cat_documentos (
    id smallint NOT NULL,
    documento character varying NOT NULL,
    descripcion character varying NOT NULL,
    idestatus integer NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 25090)
-- Name: cat_documentos_id_seq; Type: SEQUENCE; Schema: public; Owner: dgolicencias
--

ALTER TABLE public.cat_documentos ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cat_documentos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 25091)
-- Name: cat_estatus; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.cat_estatus (
    id smallint NOT NULL,
    estatus character varying NOT NULL,
    tabla character varying NOT NULL,
    activo boolean DEFAULT true NOT NULL
);



--
-- TOC entry 222 (class 1259 OID 25097)
-- Name: cat_estatus_id_seq; Type: SEQUENCE; Schema: public; Owner: dgolicencias
--

ALTER TABLE public.cat_estatus ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cat_estatus_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 25098)
-- Name: cat_licencias; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.cat_licencias (
    id smallint NOT NULL,
    licencia character varying NOT NULL,
    descripcion character varying NOT NULL,
    vigencia integer NOT NULL,
    idestatus integer NOT NULL,
    precio numeric DEFAULT 0 NOT NULL
);



--
-- TOC entry 224 (class 1259 OID 25104)
-- Name: cat_licencias_id_seq; Type: SEQUENCE; Schema: public; Owner: dgolicencias
--

ALTER TABLE public.cat_licencias ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cat_licencias_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 25105)
-- Name: cat_lugares; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.cat_lugares (
    id smallint NOT NULL,
    lugar character varying NOT NULL,
    direccion character varying NOT NULL,
    horario character varying NOT NULL,
    telefono character varying NOT NULL,
    idestatus integer NOT NULL
);



--
-- TOC entry 226 (class 1259 OID 25110)
-- Name: cat_lugares_id_seq; Type: SEQUENCE; Schema: public; Owner: dgolicencias
--

ALTER TABLE public.cat_lugares ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cat_lugares_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 227 (class 1259 OID 25111)
-- Name: cat_pruebas; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.cat_pruebas (
    id smallint NOT NULL,
    prueba character varying NOT NULL,
    descripcion character varying NOT NULL,
    presencial boolean NOT NULL,
    idestatus integer NOT NULL
);



--
-- TOC entry 228 (class 1259 OID 25116)
-- Name: cat_pruebas_id_seq; Type: SEQUENCE; Schema: public; Owner: dgolicencias
--

ALTER TABLE public.cat_pruebas ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cat_pruebas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 229 (class 1259 OID 25117)
-- Name: cat_usuarios; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.cat_usuarios (
    id smallint NOT NULL,
    usuario character varying NOT NULL,
    descripcion character varying NOT NULL,
    idestatus integer NOT NULL
);



--
-- TOC entry 230 (class 1259 OID 25122)
-- Name: cat_usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: dgolicencias
--

ALTER TABLE public.cat_usuarios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cat_usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 231 (class 1259 OID 25123)
-- Name: cat_vigencia; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.cat_vigencia (
    id smallint NOT NULL,
    vigencia character varying NOT NULL,
    descripcion character varying NOT NULL,
    anios integer NOT NULL,
    idestatus integer NOT NULL
);



--
-- TOC entry 232 (class 1259 OID 25128)
-- Name: cat_vigencia_id_seq; Type: SEQUENCE; Schema: public; Owner: dgolicencias
--

ALTER TABLE public.cat_vigencia ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cat_vigencia_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 244 (class 1259 OID 25320)
-- Name: detalle_sesion; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.detalle_sesion (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    fecha_inicio timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_fin timestamp without time zone,
    ip character varying,
    exitoso boolean,
    token character varying,
    id_estatus integer NOT NULL,
    comentarios character varying
);



--
-- TOC entry 233 (class 1259 OID 25129)
-- Name: documentos; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.documentos (
    id integer NOT NULL,
    idusuario integer,
    idsolicitud integer,
    creacion date DEFAULT CURRENT_TIMESTAMP,
    idtipodocumento integer NOT NULL,
    formato character varying NOT NULL,
    nombreoriginal character varying NOT NULL,
    tamanio integer NOT NULL,
    validacionfecha date,
    validacionusuario integer,
    validacioncomentarios character varying NOT NULL,
    validacion character varying NOT NULL,
    idestatus integer NOT NULL
);



--
-- TOC entry 234 (class 1259 OID 25135)
-- Name: documentos_id_seq; Type: SEQUENCE; Schema: public; Owner: dgolicencias
--

ALTER TABLE public.documentos ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.documentos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 243 (class 1259 OID 25313)
-- Name: parametros; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.parametros (
    id integer NOT NULL,
    parametro character varying NOT NULL,
    valor character varying NOT NULL
);



--
-- TOC entry 235 (class 1259 OID 25136)
-- Name: pruebas; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.pruebas (
    id integer NOT NULL,
    creacion date DEFAULT CURRENT_TIMESTAMP,
    modificacion date DEFAULT CURRENT_TIMESTAMP,
    idsolicitud integer NOT NULL,
    idtipoprueba integer NOT NULL,
    idlugar integer NOT NULL,
    fecha date NOT NULL,
    hora time without time zone NOT NULL,
    idestatus integer NOT NULL
);



--
-- TOC entry 236 (class 1259 OID 25141)
-- Name: pruebas_id_seq; Type: SEQUENCE; Schema: public; Owner: dgolicencias
--

ALTER TABLE public.pruebas ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.pruebas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 237 (class 1259 OID 25142)
-- Name: revisiones; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.revisiones (
    id integer NOT NULL,
    creacion date DEFAULT CURRENT_TIMESTAMP,
    modificacion date DEFAULT CURRENT_TIMESTAMP,
    idsolicitud integer NOT NULL,
    idrevisor integer NOT NULL,
    comentarios character varying,
    idestatus integer NOT NULL
);



--
-- TOC entry 238 (class 1259 OID 25149)
-- Name: revisiones_id_seq; Type: SEQUENCE; Schema: public; Owner: dgolicencias
--

ALTER TABLE public.revisiones ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.revisiones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 239 (class 1259 OID 25150)
-- Name: solicitudes; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.solicitudes (
    id integer NOT NULL,
    idusuario integer NOT NULL,
    creacion date DEFAULT CURRENT_TIMESTAMP,
    modificacion date DEFAULT CURRENT_TIMESTAMP,
    idtipolicencia integer NOT NULL,
	numerolicencia character varying,
    expedicion date,
    vigencia date,
    idestatus integer NOT NULL
);


--
-- TOC entry 240 (class 1259 OID 25155)
-- Name: solicitudes_id_seq; Type: SEQUENCE; Schema: public; Owner: dgolicencias
--

ALTER TABLE public.solicitudes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.solicitudes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 241 (class 1259 OID 25156)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: dgolicencias
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    creacion date DEFAULT CURRENT_TIMESTAMP,
    modificacion date DEFAULT CURRENT_TIMESTAMP,
    idtipousuario integer NOT NULL,
    nombres character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    logintype character varying NOT NULL,
    apellidopaterno character varying NOT NULL,
    apellidomaterno character varying NOT NULL,
    rfc character varying,
    curp character varying NOT NULL,
    domicilio character varying,
    colonia character varying,
    cp integer,
    municipio character varying,
    localidad character varying,
    entidad character varying,
    email character varying,
    nacionalidad character varying,
    sexo character varying,
    tiposangre character varying,
    donador character varying,
    lugartrabajo character varying,
    restricciones character varying,
    observacionmedica character varying,
    conocido_nombres character varying,
    conocido_apellidopaterno character varying,
    conocido_apellidomaterno character varying,
    conocido_domicilio character varying,
    conodico_cp integer,
    conodico_colonia character varying,
    conodico_municipio character varying,
    conodico_localidad character varying,
    conodico_telefono character varying,
    idestatus integer NOT NULL
);



--
-- TOC entry 242 (class 1259 OID 25163)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: dgolicencias
--

ALTER TABLE public.usuarios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4223 (class 0 OID 25079)
-- Dependencies: 217
-- Data for Name: cat_cp; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--

INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (1, '34000', 'Durango', 'Colonia Victoria de Durango Centro');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (2, '34000', 'Durango', 'Colonia Dionisio Gallardo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (3, '34000', 'Durango', 'Colonia Luis Gómez Zepeda');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (4, '34000', 'Durango', 'Fraccionamiento Rinconada Mascareñas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (5, '34000', 'Durango', 'Fraccionamiento Herrera Leyva');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (6, '34000', 'Durango', 'Fraccionamiento Privada del Sahuaro');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (7, '34010', 'Durango', 'Colonia Héctor Mayagoitia Domínguez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (8, '34010', 'Durango', 'Colonia José López Portillo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (9, '34010', 'Durango', 'Colonia Morga');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (10, '34010', 'Durango', 'Colonia Valentín Gómez Farias');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (11, '34010', 'Durango', 'Fraccionamiento Minero Napoleón Gómez Sada');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (12, '34014', 'Durango', 'Colonia Las Palmas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (13, '34014', 'Durango', 'Colonia Juan Salazar');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (14, '34014', 'Durango', 'Colonia Palma Alta');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (15, '34014', 'Durango', 'Colonia Paseo de la Pradera');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (16, '34015', 'Durango', 'Colonia Ampliación Héctor Mayagoitia Domínguez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (17, '34015', 'Durango', 'Colonia Ladera del Pedregal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (18, '34016', 'Durango', 'Fraccionamiento Ciudad San Isidro');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (19, '34016', 'Durango', 'Colonia El Prado');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (20, '34016', 'Durango', 'Colonia Morelos Norte');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (21, '34016', 'Durango', 'Colonia Amalia Solórzano');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (22, '34016', 'Durango', 'Colonia Cesar Guillermo Meraz');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (23, '34017', 'Durango', 'Colonia PRI');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (24, '34017', 'Durango', 'Colonia Ampliación PRI');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (25, '34017', 'Durango', 'Colonia Luz y Esperanza');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (26, '34018', 'Durango', 'Colonia Ángel Tejada Espino');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (27, '34019', 'Durango', 'Colonia Lázaro Cárdenas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (28, '34020', 'Durango', 'Colonia Benjamín Méndez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (29, '34020', 'Durango', 'Colonia Guadalupe');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (30, '34020', 'Durango', 'Colonia Rosas del Tepeyac');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (31, '34020', 'Durango', 'Colonia Cuadra del Ferrocarril');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (32, '34020', 'Durango', 'Colonia Cerro de Guadalupe');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (33, '34024', 'Durango', 'Colonia Planta de Impregnación (Ferrocarrilera)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (34, '34027', 'Durango', 'Colonia Recuerdos del Pasado');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (35, '34027', 'Durango', 'Colonia Unidad Guadalupe');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (36, '34028', 'Durango', 'Colonia Sergio Méndez Arceo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (37, '34029', 'Durango', 'Colonia Cerro del Mercado');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (38, '34029', 'Durango', 'Colonia Ampliación Rosas del Tepeyac');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (39, '34030', 'Durango', 'Colonia 16 de Septiembre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (40, '34030', 'Durango', 'Fraccionamiento Acereros');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (41, '34030', 'Durango', 'Fraccionamiento San Ignacio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (42, '34030', 'Durango', 'Colonia San Martín de Porres');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (43, '34030', 'Durango', 'Colonia El Ciprés (Cerro del Mercado)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (44, '34030', 'Durango', 'Colonia San Isidro');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (45, '34038', 'Durango', 'Fraccionamiento Las Águilas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (46, '34038', 'Durango', 'Fraccionamiento Cielo Vista');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (47, '34038', 'Durango', 'Fraccionamiento Residencial la Rioja');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (48, '34038', 'Durango', 'Fraccionamiento Residencial Puerta de Hierro');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (49, '34038', 'Durango', 'Fraccionamiento Residencial Plaza Alejandra');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (50, '34039', 'Durango', 'Colonia Las Encinas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (51, '34039', 'Durango', 'Colonia La Rielera');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (52, '34039', 'Durango', 'Colonia Alejandra');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (53, '34039', 'Durango', 'Colonia Vallesol');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (54, '34039', 'Durango', 'Colonia Terrenos del Ferrocarril');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (55, '34040', 'Durango', 'Colonia Villa de Guadalupe');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (56, '34043', 'Durango', 'Colonia Las Cumbres');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (57, '34043', 'Durango', 'Colonia Niños Héroes');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (58, '34045', 'Durango', 'Colonia Antonio Ramirez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (59, '34045', 'Durango', 'Equipamiento Parque Sahuatoba');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (60, '34045', 'Durango', 'Colonia Alcaldes');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (61, '34045', 'Durango', 'Colonia Valle Dorado');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (62, '34045', 'Durango', 'Colonia El Mirador');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (63, '34045', 'Durango', 'Colonia Gobernadores');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (64, '34045', 'Durango', 'Colonia Las Margaritas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (65, '34046', 'Durango', 'Colonia Miguel de La Madrid Hurtado');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (66, '34046', 'Durango', 'Fraccionamiento Legisladores Durangueños');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (67, '34047', 'Durango', 'Colonia Bellavista');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (68, '34048', 'Durango', 'Colonia Felipe Ángeles');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (69, '34049', 'Durango', 'Colonia La Virgen');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (70, '34049', 'Durango', 'Fraccionamiento Privada San Vicente');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (71, '34050', 'Durango', 'Colonia Maderera');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (72, '34050', 'Durango', 'Colonia Santa María');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (73, '34058', 'Durango', 'Fraccionamiento La Loma');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (74, '34060', 'Durango', 'Colonia Fátima');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (75, '34069', 'Durango', 'Fraccionamiento Paloma');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (76, '34070', 'Durango', 'Colonia Silvestre Dorador');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (77, '34074', 'Durango', 'Barrio El Calvario');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (78, '34075', 'Durango', 'Fraccionamiento Madrazo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (79, '34076', 'Durango', 'Colonia Los Ángeles');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (80, '34077', 'Durango', 'Colonia Predio Canoas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (81, '34080', 'Durango', 'Fraccionamiento Del Lago');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (82, '34080', 'Durango', 'Colonia Esperanza');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (83, '34080', 'Durango', 'Colonia Nueva Vizcaya');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (84, '34080', 'Durango', 'Colonia Real del Prado');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (85, '34090', 'Durango', 'Colonia Ciénega');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (86, '34100', 'Durango', 'Fraccionamiento Lomas del Parque');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (87, '34100', 'Durango', 'Fraccionamiento Los Remedios');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (88, '34100', 'Durango', 'Fraccionamiento Villa Lomas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (89, '34100', 'Durango', 'Fraccionamiento Loma Dorada Diamante');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (90, '34100', 'Durango', 'Fraccionamiento Privada San Lorenzo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (91, '34100', 'Durango', 'Fraccionamiento Riconada San Javier');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (92, '34103', 'Durango', 'Colonia Ampliación Tapias');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (93, '34103', 'Durango', 'Colonia F.O.S. La Virgen');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (94, '34103', 'Durango', 'Colonia Campestre Los Pinos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (95, '34104', 'Durango', 'Fraccionamiento Loma Dorada');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (96, '34105', 'Durango', 'Colonia El Saltito');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (97, '34105', 'Durango', 'Colonia La Esmeralda');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (98, '34105', 'Durango', 'Colonia General Lázaro Cárdenas (Garabitos Nuevo)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (99, '34105', 'Durango', 'Fraccionamiento Colinas del Saltito');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (100, '34105', 'Durango', 'Fraccionamiento Paseo del Saltito');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (101, '34105', 'Durango', 'Fraccionamiento Lomas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (102, '34105', 'Durango', 'Fraccionamiento Alexa');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (103, '34105', 'Durango', 'Fraccionamiento Gardenias Privadas Residencial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (104, '34106', 'Durango', 'Fraccionamiento Campestre Jacarandas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (105, '34106', 'Durango', 'Fraccionamiento Hacienda Residencial San Fernanda');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (106, '34106', 'Durango', 'Fraccionamiento Paseo del Bosque');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (107, '34106', 'Durango', 'Fraccionamiento Residencial Santa Bárbara');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (108, '34106', 'Durango', 'Fraccionamiento San Ángel');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (109, '34106', 'Durango', 'Fraccionamiento Las Alamedas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (110, '34106', 'Durango', 'Colonia 15 de Mayo (Tapias)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (111, '34106', 'Durango', 'Fraccionamiento Privada San Ángel Inn');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (112, '34106', 'Durango', 'Fraccionamiento Las Alamedas II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (113, '34106', 'Durango', 'Fraccionamiento Residencial las Alamedas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (114, '34106', 'Durango', 'Fraccionamiento Privada Alejandro');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (115, '34107', 'Durango', 'Condominio Santi Residencial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (116, '34107', 'Durango', 'Fraccionamiento Residencial Hortencia');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (117, '34107', 'Durango', 'Fraccionamiento Residencial La Salle');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (118, '34107', 'Durango', 'Fraccionamiento Haciendas el Saltito');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (119, '34108', 'Durango', 'Colonia Ampliación El Saltito');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (120, '34108', 'Durango', 'Colonia Lomas del Sahuatoba');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (121, '34108', 'Durango', 'Fraccionamiento Hacienda Alejandro Plus');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (122, '34108', 'Durango', 'Fraccionamiento Rinconada Misión del Pedregal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (123, '34108', 'Durango', 'Fraccionamiento La Lomita');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (124, '34108', 'Durango', 'Colonia Del Bosque');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (125, '34108', 'Durango', 'Colonia Buenos Aires');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (126, '34108', 'Durango', 'Fraccionamiento Pedregal de San Pedro');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (127, '34109', 'Durango', 'Fraccionamiento Residencial Caletto');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (128, '34109', 'Durango', 'Fraccionamiento Privadas del Sahuatoba');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (129, '34109', 'Durango', 'Fraccionamiento Privadas del Guadiana');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (130, '34109', 'Durango', 'Fraccionamiento Real del Lago');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (131, '34109', 'Durango', 'Fraccionamiento Privadas del Parque');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (132, '34110', 'Durango', 'Colonia Empleado Municipal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (133, '34110', 'Durango', 'Fraccionamiento Lomas del Guadiana');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (134, '34110', 'Durango', 'Fraccionamiento Alexa Plus');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (135, '34110', 'Durango', 'Fraccionamiento Valle Alegre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (136, '34110', 'Durango', 'Fraccionamiento Villa los Remedios');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (137, '34113', 'Durango', 'Fraccionamiento Sarh');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (138, '34116', 'Durango', 'Fraccionamiento Vista Hermosa del Guadiana');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (139, '34119', 'Durango', 'Fraccionamiento San Roque');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (140, '34119', 'Durango', 'Colonia Predio la Loza');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (141, '34120', 'Durango', 'Colonia Benito Juárez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (142, '34120', 'Durango', 'Colonia Gustavo Díaz Ordaz');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (143, '34120', 'Durango', 'Fraccionamiento La Granja');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (144, '34120', 'Durango', 'Colonia Valle del Sur');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (145, '34120', 'Durango', 'Fraccionamiento La Estancia');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (146, '34123', 'Durango', 'Colonia 9 de Julio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (147, '34123', 'Durango', 'Fraccionamiento El Rosario');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (148, '34124', 'Durango', 'Colonia Arco Iris');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (149, '34124', 'Durango', 'Colonia El Soliceño');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (150, '34124', 'Durango', 'Colonia Miguel González Avelar');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (151, '34124', 'Durango', 'Fraccionamiento Balcón de Tapias');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (152, '34124', 'Durango', 'Colonia Nuevo Amanecer');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (153, '34124', 'Durango', 'Colonia San Miguel');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (154, '34124', 'Durango', 'Colonia 12 de Diciembre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (155, '34124', 'Durango', 'Fraccionamiento Puertas del Sol III');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (156, '34125', 'Durango', 'Colonia 1° de Mayo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (157, '34126', 'Durango', 'Fraccionamiento Potreros del Refugio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (158, '34127', 'Durango', 'Colonia CNOP');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (159, '34127', 'Durango', 'Colonia Tierra y Libertad');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (160, '34128', 'Durango', 'Colonia Las Flores');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (161, '34128', 'Durango', 'Colonia Manuel Buendía');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (162, '34128', 'Durango', 'Fraccionamiento Niños Héroes de Chapultepec');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (163, '34128', 'Durango', 'Fraccionamiento Puerta del Sol');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (164, '34128', 'Durango', 'Fraccionamiento Puertas del Sol II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (165, '34129', 'Durango', 'Fraccionamiento Aztlán');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (166, '34130', 'Durango', 'Colonia Del Valle');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (167, '34130', 'Durango', 'Colonia Francisco Villa');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (168, '34130', 'Durango', 'Colonia Insurgentes');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (169, '34135', 'Durango', 'Colonia Vicente Guerrero');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (170, '34136', 'Durango', 'Colonia Ricardo Flores Magón');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (171, '34137', 'Durango', 'Colonia Picachos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (172, '34137', 'Durango', 'Colonia Veteranos de La Revolución');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (173, '34138', 'Durango', 'Barrio De Analco');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (174, '34138', 'Durango', 'Fraccionamiento Hernandez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (175, '34138', 'Durango', 'Fraccionamiento El Milagro');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (176, '34139', 'Durango', 'Barrio Cantarranas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (177, '34139', 'Durango', 'Fraccionamiento La Esmeralda');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (178, '34139', 'Durango', 'Barrio Barrio Tierra Blanca');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (179, '34139', 'Durango', 'Fraccionamiento Villa Alegre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (180, '34139', 'Durango', 'Colonia Cazarco');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (181, '34139', 'Durango', 'Fraccionamiento El Brillante');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (182, '34139', 'Durango', 'Fraccionamiento El Consuelo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (183, '34139', 'Durango', 'Colonia Estrella');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (184, '34139', 'Durango', 'Fraccionamiento Privada Luna');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (185, '34139', 'Durango', 'Fraccionamiento Rinconada Badiola');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (186, '34140', 'Durango', 'Colonia Anahuac');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (187, '34140', 'Durango', 'Colonia División del Norte');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (188, '34140', 'Durango', 'Colonia Lucio Cabañas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (189, '34143', 'Durango', 'Colonia Ampliación Tlatelolco');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (190, '34143', 'Durango', 'Unidad habitacional Bello Atardecer');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (191, '34143', 'Durango', 'Colonia San José');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (192, '34143', 'Durango', 'Colonia Tlatelolco');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (193, '34143', 'Durango', 'Colonia Valle Municipal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (194, '34144', 'Durango', 'Fraccionamiento Las Calzadas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (195, '34144', 'Durango', 'Colonia La Joya');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (196, '34144', 'Durango', 'Colonia Durango Nuevo 1');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (197, '34144', 'Durango', 'Colonia Durango Nuevo II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (198, '34144', 'Durango', 'Colonia El Brillante');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (199, '34144', 'Durango', 'Colonia Villas Doradas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (200, '34144', 'Durango', 'Colonia Villa Antigua');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (201, '34144', 'Durango', 'Colonia Bosques del Nayar');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (202, '34144', 'Durango', 'Colonia Bello Amanecer');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (203, '34144', 'Durango', 'Colonia 23 de Marzo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (204, '34144', 'Durango', 'Colonia Rinconada San Antonio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (205, '34144', 'Durango', 'Colonia Buena Vista');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (206, '34144', 'Durango', 'Colonia Ampliación Nuevo Milenio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (207, '34144', 'Durango', 'Colonia La Estrella');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (208, '34144', 'Durango', 'Colonia El Lucero');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (209, '34144', 'Durango', 'Colonia Jardines del Nayar');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (210, '34144', 'Durango', 'Colonia Pedregal de La Nueva España');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (211, '34145', 'Durango', 'Colonia Asentamientos Humanos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (212, '34146', 'Durango', 'Colonia Los Álamos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (213, '34147', 'Durango', 'Colonia Arroyo Seco');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (214, '34147', 'Durango', 'Fraccionamiento Cerrada la Huerta');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (215, '34147', 'Durango', 'Fraccionamiento Villas del Atardecer');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (322, '34186', 'Durango', 'Colonia Villas Alpinas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (216, '34147', 'Durango', 'Colonia Fundo Legal Arroyo Seco');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (217, '34147', 'Durango', 'Colonia Las Gardenias');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (218, '34147', 'Durango', 'Colonia Manuel Gómez Morin');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (219, '34147', 'Durango', 'Colonia Las Calandrias');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (220, '34147', 'Durango', 'Fraccionamiento La Huerta');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (221, '34147', 'Durango', 'Colonia La Moderna');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (222, '34147', 'Durango', 'Colonia Los Tulipanes I');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (223, '34147', 'Durango', 'Colonia Gaviotas II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (224, '34147', 'Durango', 'Colonia El Durazno');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (225, '34147', 'Durango', 'Fraccionamiento Hacienda de Tapias');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (226, '34150', 'Durango', 'Colonia IV Centenario');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (227, '34150', 'Durango', 'Fraccionamiento Chapultepec');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (228, '34150', 'Durango', 'Colonia Juan de La Barrera');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (229, '34150', 'Durango', 'Fraccionamiento Silvestre Revueltas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (230, '34150', 'Durango', 'Fraccionamiento Privada Paraíso');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (231, '34150', 'Durango', 'Fraccionamiento Villas Santa Teresa');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (232, '34156', 'Durango', 'Fraccionamiento Ocampo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (233, '34157', 'Durango', 'Fraccionamiento Francisco González de La Vega');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (234, '34157', 'Durango', 'Fraccionamiento San Diego');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (235, '34158', 'Durango', 'Fraccionamiento La Pradera');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (236, '34159', 'Durango', 'Fraccionamiento Francisco I Madero');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (237, '34160', 'Durango', 'Colonia Azcapotzalco');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (238, '34160', 'Durango', 'Fraccionamiento El Edén');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (239, '34160', 'Durango', 'Fraccionamiento Huizache I');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (240, '34160', 'Durango', 'Fraccionamiento Huizache II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (241, '34160', 'Durango', 'Fraccionamiento Villas del Edén');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (242, '34162', 'Durango', 'Fraccionamiento Las Milpas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (243, '34162', 'Durango', 'Fraccionamiento Los Nogales');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (244, '34162', 'Durango', 'Colonia Solidaridad');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (245, '34162', 'Durango', 'Fraccionamiento Valle del Mezquital I');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (246, '34162', 'Durango', 'Fraccionamiento Nueva Providencia');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (247, '34162', 'Durango', 'Fraccionamiento Valle del Mezquital II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (248, '34162', 'Durango', 'Fraccionamiento Los Pinos Residencial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (249, '34162', 'Durango', 'Fraccionamiento Nuevo Durango I');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (250, '34162', 'Durango', 'Fraccionamiento Real del Country');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (251, '34162', 'Durango', 'Fraccionamiento Residencial Santa Teresa');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (252, '34162', 'Durango', 'Fraccionamiento Margarita Maza de Juárez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (253, '34163', 'Durango', 'Colonia Benito Juárez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (254, '34164', 'Durango', 'Fraccionamiento Nuevo Milenio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (255, '34164', 'Durango', 'Fraccionamiento Milenio 450 II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (256, '34164', 'Durango', 'Fraccionamiento Cristóbal Colón');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (257, '34164', 'Durango', 'Colonia Luz del Carmen');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (258, '34164', 'Durango', 'Colonia Alianza por Durango');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (259, '34165', 'Durango', 'Colonia Los Sauces');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (260, '34165', 'Durango', 'Colonia Universal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (261, '34166', 'Durango', 'Fraccionamiento Centauro del Norte');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (262, '34166', 'Durango', 'Fraccionamiento Primer Presidente');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (263, '34166', 'Durango', 'Fraccionamiento SEDUE');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (264, '34166', 'Durango', 'Colonia Valle del Guadiana');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (265, '34166', 'Durango', 'Fraccionamiento Rinconada del Ángel');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (266, '34166', 'Durango', 'Fraccionamiento Las Flores III');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (267, '34166', 'Durango', 'Fraccionamiento Santa Teresa');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (268, '34166', 'Durango', 'Fraccionamiento Nuevo Durango II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (269, '34166', 'Durango', 'Fraccionamiento Nuevo Durango III');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (270, '34166', 'Durango', 'Fraccionamiento Hacienda las Flores');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (271, '34166', 'Durango', 'Fraccionamiento Residencial Villa Dorada');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (272, '34167', 'Durango', 'Fraccionamiento Las Magdalenas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (273, '34167', 'Durango', 'Fraccionamiento Barcelona');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (274, '34167', 'Durango', 'Fraccionamiento Milenio 450');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (275, '34167', 'Durango', 'Colonia Victoria de Durango');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (276, '34167', 'Durango', 'Fraccionamiento Galicia');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (277, '34167', 'Durango', 'Fraccionamiento Benito Juárez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (278, '34167', 'Durango', 'Colonia Jardines de Cancún');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (279, '34167', 'Durango', 'Colonia Isabel Almanza');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (280, '34167', 'Durango', 'Colonia Don Francisco');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (281, '34167', 'Durango', 'Fraccionamiento Colibrí');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (282, '34167', 'Durango', 'Fraccionamiento Orquídea');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (283, '34167', 'Durango', 'Fraccionamiento Locutores');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (284, '34167', 'Durango', 'Fraccionamiento Bicentenario');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (285, '34167', 'Durango', 'Fraccionamiento Colibrí II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (286, '34167', 'Durango', 'Fraccionamiento Privada San Martín');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (287, '34167', 'Durango', 'Colonia El Alacrán');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (288, '34167', 'Durango', 'Fraccionamiento Vivah Reforma I');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (289, '34167', 'Durango', 'Fraccionamiento Constituyentes');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (290, '34167', 'Durango', 'Colonia Edmundo Ravelo Duarte');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (291, '34167', 'Durango', 'Fraccionamiento Toledo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (292, '34167', 'Durango', 'Fraccionamiento Aranza');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (293, '34167', 'Durango', 'Fraccionamiento Geraldine');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (294, '34167', 'Durango', 'Colonia Ignacio Zaragoza');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (295, '34168', 'Durango', 'Colonia El Paraíso');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (296, '34168', 'Durango', 'Colonia San Carlos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (297, '34168', 'Durango', 'Fraccionamiento Bicentenario');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (298, '34168', 'Durango', 'Fraccionamiento Real Victoria II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (299, '34168', 'Durango', 'Colonia Ampliación Las Rosas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (300, '34169', 'Durango', 'Colonia Genaro Vázquez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (301, '34169', 'Durango', 'Colonia Miramar');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (302, '34170', 'Durango', 'Fraccionamiento Camino Real');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (303, '34170', 'Durango', 'Colonia El Refugio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (304, '34170', 'Durango', 'Colonia Jalisco');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (305, '34170', 'Durango', 'Fraccionamiento Los Fuentes');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (306, '34170', 'Durango', 'Fraccionamiento Las Misiones (Edificios de Departamentos)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (307, '34170', 'Durango', 'Fraccionamiento Privada las Quintas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (308, '34175', 'Durango', 'Colonia José Martí');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (309, '34176', 'Durango', 'Fraccionamiento Providencia II FOVISSSTE');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (310, '34176', 'Durango', 'Fraccionamiento Villas Alpinas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (311, '34176', 'Durango', 'Fraccionamiento Privada Casuarinas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (312, '34179', 'Durango', 'Fraccionamiento Providencia I');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (313, '34180', 'Durango', 'Fraccionamiento Domingo Arrieta');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (314, '34185', 'Durango', 'Fraccionamiento Senderos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (315, '34185', 'Durango', 'Fraccionamiento Real de Privanzas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (316, '34185', 'Durango', 'Condominio Torres Toscana');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (317, '34185', 'Durango', 'Fraccionamiento Las Quintas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (318, '34186', 'Durango', 'Fraccionamiento Cerrada Privanzas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (319, '34186', 'Durango', 'Colonia Valle Alegre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (320, '34186', 'Durango', 'Colonia Villa Jardín');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (321, '34186', 'Durango', 'Colonia Diana Laura R de Colosio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (323, '34186', 'Durango', 'Colonia Mireles');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (324, '34186', 'Durango', 'Colonia Claveles II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (325, '34186', 'Durango', 'Colonia Claveles 1 (Ampliación Luis Donaldo Colosio)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (326, '34186', 'Durango', 'Fraccionamiento Campo Alegre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (327, '34186', 'Durango', 'Fraccionamiento Las Esperanzas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (328, '34186', 'Durango', 'Fraccionamiento Las Privanzas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (329, '34186', 'Durango', 'Colonia Villas Doradas II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (330, '34187', 'Durango', 'Colonia Ejidal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (331, '34187', 'Durango', 'Fraccionamiento Niños Héroes');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (332, '34188', 'Durango', 'Colonia Constitución');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (333, '34188', 'Durango', 'Colonia Dolores del Río');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (334, '34188', 'Durango', 'Colonia Juan Lira Bracho');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (335, '34188', 'Durango', 'Colonia Las Auroras');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (336, '34188', 'Durango', 'Colonia Luis Donaldo Colosio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (337, '34188', 'Durango', 'Colonia Jesús María');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (338, '34189', 'Durango', 'Fraccionamiento La Arboleda');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (339, '34190', 'Durango', 'Colonia Azteca');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (340, '34190', 'Durango', 'Fraccionamiento El Naranjal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (341, '34190', 'Durango', 'Fraccionamiento Real del Naranjal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (342, '34190', 'Durango', 'Fraccionamiento SAHOP');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (343, '34190', 'Durango', 'Fraccionamiento Granja Graciela');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (344, '34190', 'Durango', 'Fraccionamiento Santa Cruz Residencial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (345, '34190', 'Durango', 'Fraccionamiento Los Ángeles Villas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (346, '34193', 'Durango', 'Fraccionamiento Residencial los Laureles');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (347, '34193', 'Durango', 'Fraccionamiento El Lago');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (348, '34193', 'Durango', 'Fraccionamiento El Atardecer Residencial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (349, '34193', 'Durango', 'Fraccionamiento Cotto de Asturias');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (350, '34193', 'Durango', 'Fraccionamiento El Roble Residencial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (351, '34193', 'Durango', 'Colonia Potrero los Abonos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (352, '34193', 'Durango', 'Fraccionamiento Linda Vista');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (353, '34193', 'Durango', 'Fraccionamiento Los Nogales Residencial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (354, '34193', 'Durango', 'Fraccionamiento Los Cedros Residencial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (355, '34193', 'Durango', 'Fraccionamiento El Bosque Residencial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (356, '34194', 'Durango', 'Fraccionamiento Arantzazu II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (357, '34194', 'Durango', 'Fraccionamiento Rancho San Miguel');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (358, '34194', 'Durango', 'Colonia Las Flores Sur');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (359, '34194', 'Durango', 'Colonia México');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (360, '34194', 'Durango', 'Fraccionamiento Santa Anita');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (361, '34194', 'Durango', 'Colonia Valle Verde Sur');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (362, '34194', 'Durango', 'Fraccionamiento Villas Campestre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (363, '34194', 'Durango', 'Fraccionamiento Real Campestre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (364, '34194', 'Durango', 'Fraccionamiento Campestre Amanecer');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (365, '34194', 'Durango', 'Fraccionamiento O DAM');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (366, '34194', 'Durango', 'Colonia San Vicente');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (367, '34194', 'Durango', 'Colonia Justicia Social');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (368, '34194', 'Durango', 'Colonia Valle de México');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (369, '34194', 'Durango', 'Fraccionamiento Campestre de Durango');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (370, '34194', 'Durango', 'Fraccionamiento Artemisas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (371, '34194', 'Durango', 'Fraccionamiento Haciendas del Campestre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (372, '34194', 'Durango', 'Fraccionamiento El Ensueño');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (373, '34194', 'Durango', 'Colonia Girasoles');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (374, '34194', 'Durango', 'Colonia Promotores Sociales');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (375, '34194', 'Durango', 'Fraccionamiento Arantzazú');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (376, '34195', 'Durango', 'Colonia Benigno Montoya');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (377, '34195', 'Durango', 'Fraccionamiento Campestre Martinica');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (378, '34195', 'Durango', 'Fraccionamiento Villa Universitaria');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (379, '34195', 'Durango', 'Fraccionamiento Ricardo Rosales (SCT)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (380, '34196', 'Durango', 'Colonia 8 de Septiembre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (381, '34196', 'Durango', 'Fraccionamiento Rinconada Bugambilias');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (382, '34197', 'Durango', 'Colonia Morelos Sur');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (383, '34197', 'Durango', 'Colonia Praderas del Sur');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (384, '34197', 'Durango', 'Fraccionamiento Loma Bonita');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (385, '34197', 'Durango', 'Colonia Ampliación Morelos Sur');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (386, '34198', 'Durango', 'Fraccionamiento La Ciénega');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (387, '34198', 'Durango', 'Colonia Los Betabeles');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (388, '34198', 'Durango', 'Fraccionamiento Misión Real Castilla');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (389, '34198', 'Durango', 'Fraccionamiento Veranda Residencial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (390, '34198', 'Durango', 'Fraccionamiento Villas del Manantial (Ameyal)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (391, '34199', 'Durango', 'Fraccionamiento Real del Mezquital');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (392, '34199', 'Durango', 'Fraccionamiento Privada Vista del Sol');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (393, '34199', 'Durango', 'Fraccionamiento Villa Jacarandas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (394, '34199', 'Durango', 'Rancho El Potrero (Los Parra)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (395, '34200', 'Durango', 'Fraccionamiento Jardines de Durango');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (396, '34200', 'Durango', 'Fraccionamiento Las Américas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (397, '34200', 'Durango', 'Fraccionamiento Hacienda de Fray Diego');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (398, '34204', 'Durango', 'Fraccionamiento La Cima');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (399, '34204', 'Durango', 'Fraccionamiento Los Eucaliptos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (400, '34204', 'Durango', 'Fraccionamiento Puerta de San Ignacio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (401, '34204', 'Durango', 'Fraccionamiento San José');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (402, '34204', 'Durango', 'Fraccionamiento San José II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (403, '34204', 'Durango', 'Fraccionamiento San Daniel');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (404, '34204', 'Durango', 'Fraccionamiento Villas de Zambrano');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (405, '34204', 'Durango', 'Fraccionamiento Paso Real');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (406, '34204', 'Durango', 'Fraccionamiento Antigua Hacienda');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (407, '34204', 'Durango', 'Fraccionamiento FSTSE');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (408, '34204', 'Durango', 'Fraccionamiento Cerrada las Torres');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (409, '34204', 'Durango', 'Fraccionamiento San Carlo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (410, '34204', 'Durango', 'Fraccionamiento Acueducto');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (411, '34204', 'Durango', 'Fraccionamiento Privadas San Ignacio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (412, '34204', 'Durango', 'Fraccionamiento Granja Mis Ilusiones');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (413, '34205', 'Durango', 'Colonia Carlos Luna');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (414, '34205', 'Durango', 'Fraccionamiento Santa Amelia');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (415, '34205', 'Durango', 'Fraccionamiento Versalles');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (416, '34205', 'Durango', 'Fraccionamiento Villas San Ignacio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (417, '34206', 'Durango', 'Colonia José Ángel Leal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (418, '34207', 'Durango', 'Fraccionamiento La Glorieta');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (419, '34208', 'Durango', 'Fraccionamiento Ciudad Industrial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (420, '34208', 'Durango', 'Fraccionamiento Villa Blanca');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (421, '34208', 'Durango', 'Fraccionamiento Villas del Guadiana IV');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (422, '34208', 'Durango', 'Colonia San Juan');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (423, '34209', 'Durango', 'Fraccionamiento Español');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (424, '34209', 'Durango', 'Condominio Alejandría Jardines');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (425, '34209', 'Durango', 'Fraccionamiento Tres Misiones');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (426, '34210', 'Durango', 'Colonia Adolfo López Mateos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (427, '34210', 'Durango', 'Colonia Francisco Zarco');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (428, '34210', 'Durango', 'Fraccionamiento Aserradero');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (429, '34214', 'Durango', 'Colonia Armando del Castillo Franco');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (430, '34214', 'Durango', 'Fraccionamiento Francisco Sarabia');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (431, '34215', 'Durango', 'Colonia Rincón del Lobo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (432, '34215', 'Durango', 'Fraccionamiento Fundo Legal San Ignacio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (433, '34215', 'Durango', 'Fraccionamiento Cortijo Residencial Plus');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (434, '34215', 'Durango', 'Colonia Las Huertas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (435, '34215', 'Durango', 'Colonia San Ignacio de Loyola');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (436, '34215', 'Durango', 'Fraccionamiento Cumbres Residencial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (437, '34215', 'Durango', 'Fraccionamiento Cortijo Residencial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (438, '34216', 'Durango', 'Colonia Fray Diego de La Cadena');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (439, '34217', 'Durango', 'Colonia La Ponderosa');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (440, '34217', 'Durango', 'Fraccionamiento Boodamtam');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (441, '34217', 'Durango', 'Colonia El Ciprés');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (442, '34217', 'Durango', 'Fraccionamiento La Forestal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (443, '34217', 'Durango', 'Fraccionamiento Predio Rústico la Tinaja y los Lugos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (444, '34217', 'Durango', 'Unidad habitacional Cerrada Rosas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (445, '34217', 'Durango', 'Fraccionamiento Abetos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (446, '34217', 'Durango', 'Colonia Predio el Tule');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (447, '34217', 'Durango', 'Colonia Juan Escutia');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (448, '34217', 'Durango', 'Colonia Chulas Fronteras');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (449, '34217', 'Durango', 'Colonia Massie');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (450, '34217', 'Durango', 'Fraccionamiento Industrial Nuevo Durango');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (451, '34217', 'Durango', 'Fraccionamiento Industrial Korian');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (452, '34217', 'Durango', 'Fraccionamiento Haciendas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (453, '34218', 'Durango', 'Colonia Arturo Gamiz');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (454, '34219', 'Durango', 'Colonia José Revueltas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (455, '34220', 'Durango', 'Fraccionamiento Guadalupe');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (456, '34220', 'Durango', 'Fraccionamiento Guadalupe Victoria INFONAVIT');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (457, '34220', 'Durango', 'Fraccionamiento Las Fuentes');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (458, '34220', 'Durango', 'Fraccionamiento Predio Granados');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (459, '34220', 'Durango', 'Fraccionamiento Cibeles');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (460, '34220', 'Durango', 'Fraccionamiento Girasoles');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (461, '34220', 'Durango', 'Fraccionamiento Privada Alejandrina');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (462, '34220', 'Durango', 'Fraccionamiento Privada Villa Jardín');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (463, '34224', 'Durango', 'Fraccionamiento Valle Oriente');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (464, '34224', 'Durango', 'Fraccionamiento Las Nubes');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (465, '34224', 'Durango', 'Fraccionamiento El Renacimiento');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (466, '34224', 'Durango', 'Fraccionamiento San Luis');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (467, '34224', 'Durango', 'Colonia Une');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (468, '34224', 'Durango', 'Fraccionamiento Villas del Guadiana II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (469, '34224', 'Durango', 'Fraccionamiento Villas del Guadiana III');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (470, '34224', 'Durango', 'Fraccionamiento Valle de Guadalupe');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (471, '34224', 'Durango', 'Fraccionamiento Los Arbolitos I');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (472, '34224', 'Durango', 'Fraccionamiento Las Vegas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (473, '34224', 'Durango', 'Fraccionamiento María Luisa');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (474, '34224', 'Durango', 'Fraccionamiento Villas del Guadiana I');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (475, '34224', 'Durango', 'Fraccionamiento Villas del Guadiana V (Mixto)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (476, '34224', 'Durango', 'Fraccionamiento Villas de Guadiana VI');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (477, '34224', 'Durango', 'Fraccionamiento Los Arbolitos III');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (478, '34224', 'Durango', 'Fraccionamiento Florencia');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (479, '34224', 'Durango', 'Fraccionamiento Villas de Guadiana VII');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (480, '34224', 'Durango', 'Fraccionamiento Nuevo Pedregal III');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (481, '34225', 'Durango', 'Fraccionamiento Valle del Rocío');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (482, '34225', 'Durango', 'Fraccionamiento San Fernando');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (483, '34225', 'Durango', 'Fraccionamiento San Marcos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (484, '34225', 'Durango', 'Fraccionamiento San Mateo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (485, '34225', 'Durango', 'Fraccionamiento Nuevo Imperio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (486, '34225', 'Durango', 'Fraccionamiento Jardines del Real');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (487, '34225', 'Durango', 'Fraccionamiento Tenochtitlan');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (488, '34225', 'Durango', 'Fraccionamiento Valle de Cristo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (489, '34225', 'Durango', 'Fraccionamiento Los Encinos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (490, '34225', 'Durango', 'Fraccionamiento Los Arbolitos II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (491, '34225', 'Durango', 'Fraccionamiento La Luz');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (492, '34225', 'Durango', 'Fraccionamiento Valle del Paseo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (493, '34225', 'Durango', 'Fraccionamiento Nuevo Valle');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (494, '34226', 'Durango', 'Fraccionamiento Roma');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (495, '34226', 'Durango', 'Colonia Democracia Sindical');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (496, '34227', 'Durango', 'Fraccionamiento Bosques del Valle');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (497, '34227', 'Durango', 'Fraccionamiento Jardines de San Antonio I');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (498, '34227', 'Durango', 'Fraccionamiento Villas del Pedregal I');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (499, '34227', 'Durango', 'Fraccionamiento Los Agaves');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (500, '34227', 'Durango', 'Fraccionamiento Rinconada del Paraíso');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (501, '34227', 'Durango', 'Fraccionamiento Villas del Carmen');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (502, '34227', 'Durango', 'Fraccionamiento Villas del Pedregal II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (503, '34228', 'Durango', 'Fraccionamiento Rinconada Sol');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (504, '34229', 'Durango', 'Fraccionamiento Fidel Velázquez I');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (505, '34229', 'Durango', 'Fraccionamiento Fidel Velázquez II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (506, '34229', 'Durango', 'Fraccionamiento Fideicomiso Ciudad Industrial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (507, '34229', 'Durango', 'Fraccionamiento Real de Villas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (508, '34230', 'Durango', 'Colonia Emiliano Zapata');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (509, '34230', 'Durango', 'Colonia Máximo Gamiz Fernández');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (510, '34233', 'Durango', 'Fraccionamiento Bosques');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (511, '34233', 'Durango', 'Fraccionamiento Las Brisas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (512, '34234', 'Durango', 'Fraccionamiento California');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (513, '34234', 'Durango', 'Fraccionamiento 20 de Noviembre II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (514, '34234', 'Durango', 'Colonia Octavio Paz');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (515, '34234', 'Durango', 'Fraccionamiento Residencial del Valle');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (516, '34234', 'Durango', 'Colonia Valle Florido');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (517, '34234', 'Durango', 'Fraccionamiento Las Bugambilias');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (518, '34235', 'Durango', 'Fraccionamiento Unidad Habitacional Labor de Guadalupe');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (519, '34235', 'Durango', 'Fraccionamiento Residencial del Marques');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (520, '34235', 'Durango', 'Fraccionamiento Atenas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (521, '34235', 'Durango', 'Fraccionamiento Aranjuez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (522, '34235', 'Durango', 'Fraccionamiento Brisas Diamante');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (523, '34235', 'Durango', 'Fraccionamiento Quinta del Real');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (524, '34236', 'Durango', 'Colonia Ampliación 20 de Noviembre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (525, '34236', 'Durango', 'Colonia 20 de Noviembre Fundo Legal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (526, '34236', 'Durango', 'Colonia 20 de Noviembre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (527, '34236', 'Durango', 'Zona industrial Fraccionamiento Industrial Scorpio');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (528, '34236', 'Durango', 'Colonia Los Agaves');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (529, '34236', 'Durango', 'Fraccionamiento Caminos del Sol');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (530, '34236', 'Durango', 'Fraccionamiento Haciendas del Pedregal I');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (531, '34236', 'Durango', 'Fraccionamiento Nuevo Pedregal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (746, '34330', 'Durango', 'Ejido Pilar de Zaragoza');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (532, '34236', 'Durango', 'Colonia Rinconada las Flores');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (533, '34236', 'Durango', 'Fraccionamiento Los Duraznos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (534, '34236', 'Durango', 'Fraccionamiento Haciendas del Pedregal II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (535, '34236', 'Durango', 'Fraccionamiento Residencial Santa Clara');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (536, '34237', 'Durango', 'Fraccionamiento Joyas del Valle');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (537, '34237', 'Durango', 'Fraccionamiento Las Alamedas MT');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (538, '34237', 'Durango', 'Fraccionamiento La Noria');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (539, '34237', 'Durango', 'Fraccionamiento San Gabriel');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (540, '34237', 'Durango', 'Fraccionamiento Villas del Sol');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (541, '34237', 'Durango', 'Fraccionamiento Privada San Vicente II');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (542, '34237', 'Durango', 'Fraccionamiento Monte Bello');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (543, '34237', 'Durango', 'Fraccionamiento Las Bugambilias III');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (544, '34237', 'Durango', 'Fraccionamiento San Jorge');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (545, '34237', 'Durango', 'Fraccionamiento Ágata');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (546, '34237', 'Durango', 'Fraccionamiento Residencial Casa Blanca');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (547, '34238', 'Durango', 'Fraccionamiento La Hacienda');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (548, '34239', 'Durango', 'Fraccionamiento Provincial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (549, '34239', 'Durango', 'Fraccionamiento Privada las Hortencias');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (550, '34240', 'Durango', 'Colonia Del Maestro');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (551, '34240', 'Durango', 'Colonia Santa Fe');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (552, '34250', 'Durango', 'Colonia Luis Echeverría Alvarez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (553, '34260', 'Durango', 'Fraccionamiento Las Playas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (554, '34260', 'Durango', 'Colonia Porfirio Díaz');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (555, '34260', 'Durango', 'Fraccionamiento Rincón de Agricultura');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (556, '34269', 'Durango', 'Fraccionamiento Vergel del Desierto');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (557, '34270', 'Durango', 'Colonia Guillermina');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (558, '34270', 'Durango', 'Colonia Hipódromo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (559, '34270', 'Durango', 'Colonia Olga Margarita');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (560, '34270', 'Durango', 'Colonia Heberto Castillo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (561, '34277', 'Durango', 'Fraccionamiento Reforma');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (562, '34278', 'Durango', 'Fraccionamiento Nazas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (563, '34279', 'Durango', 'Colonia Burócrata');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (564, '34280', 'Durango', 'Colonia J Guadalupe Rodriguez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (565, '34284', 'Durango', 'Colonia Valle Verde Oriente');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (566, '34284', 'Durango', 'Colonia Pedro Ávila Nevárez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (567, '34285', 'Durango', 'Fraccionamiento Los Fresnos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (568, '34286', 'Durango', 'Fraccionamiento 22 de Septiembre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (569, '34287', 'Durango', 'Fraccionamiento Villas San José');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (570, '34287', 'Durango', 'Fraccionamiento Tecnológico');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (571, '34287', 'Durango', 'Fraccionamiento Jorge Herrera Delgado');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (572, '34287', 'Durango', 'Fraccionamiento Pirineos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (573, '34287', 'Durango', 'Fraccionamiento Real Victoria I');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (574, '34287', 'Durango', 'Fraccionamiento La Coruña');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (575, '34287', 'Durango', 'Colonia Cielo Azul');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (576, '34287', 'Durango', 'Colonia Solares Veinte de Noviembre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (577, '34287', 'Durango', 'Fraccionamiento España');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (578, '34287', 'Durango', 'Colonia Liberación Social');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (579, '34287', 'Durango', 'Fraccionamiento Villas de San Francisco');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (580, '34287', 'Durango', 'Fraccionamiento Privada Aserradero');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (581, '34287', 'Durango', 'Fraccionamiento Residencial las Palmas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (582, '34287', 'Durango', 'Fraccionamiento Los Viñedos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (583, '34287', 'Durango', 'Fraccionamiento Hogares del Parque');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (584, '34289', 'Durango', 'Colonia Industrial Ladrillera');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (585, '34290', 'Durango', 'Fraccionamiento Canelas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (586, '34298', 'Durango', 'Colonia Patria Libre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (587, '34298', 'Durango', 'Colonia Rinconada los Álamos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (588, '34299', 'Durango', 'Fraccionamiento Los Álamos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (589, '34299', 'Durango', 'Fraccionamiento Los Alamitos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (590, '34300', 'Durango', 'Granja San Andrés [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (591, '34300', 'Durango', 'Rancho El Jacalón');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (592, '34300', 'Durango', 'Granja Santa Teresa [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (593, '34300', 'Durango', 'Ranchería Rancho el Canelo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (594, '34300', 'Durango', 'Ranchería Rancho la Abundancia (El Venado)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (595, '34300', 'Durango', 'Ranchería Rancho la Parcela');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (596, '34300', 'Durango', 'Ranchería Rancho los Torres');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (597, '34300', 'Durango', 'Ranchería Rancho Madrid');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (598, '34300', 'Durango', 'Ranchería Rancho San Vicente');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (599, '34303', 'Durango', 'Pueblo Labor de Guadalupe');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (600, '34303', 'Durango', 'Ranchería La Cruz (Sayula)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (601, '34303', 'Durango', 'Granja Santa Rita [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (602, '34303', 'Durango', 'Granja Granjas del Río');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (603, '34303', 'Durango', 'Ranchería Rancho el Fresno');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (604, '34303', 'Durango', 'Ranchería Rancho el Sauz');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (605, '34303', 'Durango', 'Ranchería Rancho Esperanza');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (606, '34303', 'Durango', 'Ranchería Rancho Hidalgo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (607, '34303', 'Durango', 'Ranchería El Mezquite [Rancho]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (608, '34303', 'Durango', 'Ranchería La Huerta [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (609, '34303', 'Durango', 'Ranchería Rancho Ramos Vázquez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (610, '34303', 'Durango', 'Ranchería San Francisco');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (611, '34303', 'Durango', 'Ejido Santa Cruz del Río');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (612, '34304', 'Durango', 'Zona industrial Centro Logístico Industrial de Durango');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (613, '34304', 'Durango', 'Ejido La Quinta');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (614, '34304', 'Durango', 'Ranchería Málaga');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (615, '34304', 'Durango', 'Granja Don Luis Sandoval [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (616, '34304', 'Durango', 'Ranchería Rancho California');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (617, '34304', 'Durango', 'Ranchería Rancho Dos Hermanos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (618, '34304', 'Durango', 'Ranchería Rancho el Apuro');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (619, '34304', 'Durango', 'Ranchería Rancho el Arco Iris');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (620, '34304', 'Durango', 'Ranchería Rancho el Consuelo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (621, '34304', 'Durango', 'Ranchería Rancho el Giro');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (622, '34304', 'Durango', 'Ranchería Rancho el Monte');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (623, '34304', 'Durango', 'Ranchería Rancho la Noria');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (624, '34304', 'Durango', 'Ranchería Rancho las Nubes');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (625, '34304', 'Durango', 'Ranchería Rancho Lorena');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (626, '34304', 'Durango', 'Ranchería Rancho los Ángeles');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (627, '34304', 'Durango', 'Ranchería Rancho María Esther');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (628, '34304', 'Durango', 'Ranchería Rancho Santa Lucía');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (629, '34304', 'Durango', 'Ranchería Rancho Tierra Limpia');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (630, '34305', 'Durango', 'Colonia Cerrada Calera');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (631, '34305', 'Durango', 'Pueblo Cinco de Mayo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (632, '34305', 'Durango', 'Ranchería Fray Francisco Montes de Oca');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (633, '34305', 'Durango', 'Ranchería San Carlos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (634, '34305', 'Durango', 'Pueblo General Lázaro Cárdenas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (635, '34305', 'Durango', 'Colonia Calera');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (636, '34305', 'Durango', 'Granja El Peligro [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (637, '34305', 'Durango', 'Finca Finca las Flores');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (638, '34305', 'Durango', 'Ranchería Rancho el Maguey');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (639, '34305', 'Durango', 'Ranchería Rancho el Tecolote');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (640, '34305', 'Durango', 'Ranchería Rancho los Pinos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (641, '34305', 'Durango', 'Ranchería Rancho Nuevo Monterrey');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (642, '34305', 'Durango', 'Ranchería Las Avestruces');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (643, '34306', 'Durango', 'Pueblo Contreras');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (644, '34306', 'Durango', 'Pueblo El Tepetate');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (645, '34306', 'Durango', 'Ejido Cristóbal Colón');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (646, '34306', 'Durango', 'Colonia La Campana');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (647, '34306', 'Durango', 'Colonia Las Minitas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (648, '34306', 'Durango', 'Ranchería La Campana');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (649, '34306', 'Durango', 'Pueblo Quince de Octubre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (650, '34306', 'Durango', 'Ejido Antonio Castillo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (651, '34306', 'Durango', 'Granja Betania [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (652, '34306', 'Durango', 'Granja Dos Arbolitos [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (653, '34306', 'Durango', 'Granja Hermanos Flores [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (654, '34306', 'Durango', 'Granja La Maroma [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (655, '34306', 'Durango', 'Granja Las Gabrielas [Rancho]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (656, '34306', 'Durango', 'Granja Los Arcos [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (657, '34306', 'Durango', 'Hacienda Hacienda San Martina');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (658, '34306', 'Durango', 'Ranchería Rancho Dalila');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (659, '34306', 'Durango', 'Ranchería Gas Plus');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (660, '34306', 'Durango', 'Ranchería Rancho Huichapa');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (661, '34306', 'Durango', 'Ranchería Rancho la Presa de Navacoyán');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (662, '34306', 'Durango', 'Ranchería Rancho los Portales Cabalgantes');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (663, '34306', 'Durango', 'Ranchería Rancho Nativitas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (664, '34307', 'Durango', 'Pueblo Dolores Hidalgo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (665, '34307', 'Durango', 'Pueblo Gabino Santillán');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (666, '34307', 'Durango', 'Fraccionamiento Residencial San Felipe');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (667, '34307', 'Durango', 'Fraccionamiento Villa Italiana Residencial');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (668, '34307', 'Durango', 'Ranchería La Nogalera');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (669, '34307', 'Durango', 'Granja Martínez [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (670, '34307', 'Durango', 'Granja Guadalupe (Natera) [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (671, '34307', 'Durango', 'Granja Jovana [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (672, '34307', 'Durango', 'Granja La Casita [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (673, '34307', 'Durango', 'Granja Laura [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (674, '34307', 'Durango', 'Granja María Luisa [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (675, '34307', 'Durango', 'Ranchería Rancho Alaska 1');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (676, '34307', 'Durango', 'Ranchería Rancho el Paraíso');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (677, '34307', 'Durango', 'Ranchería Rancho las Águilas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (678, '34307', 'Durango', 'Ranchería Rancho las Flores');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (679, '34307', 'Durango', 'Ranchería Rancho las Nubes');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (680, '34307', 'Durango', 'Ranchería Rancho los Colorines');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (681, '34307', 'Durango', 'Ranchería Rancho los Pelícanos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (682, '34307', 'Durango', 'Ranchería El Lago');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (683, '34307', 'Durango', 'Ranchería Rancho San Francisco de Calleros');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (684, '34307', 'Durango', 'Fraccionamiento Río Dorado');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (685, '34308', 'Durango', 'Ejido Veintiocho de Septiembre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (686, '34308', 'Durango', 'Granja Cristy [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (687, '34308', 'Durango', 'Granja El Rosario [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (688, '34308', 'Durango', 'Granja San Miguel [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (689, '34310', 'Durango', 'Ejido Cinco de Febrero');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (690, '34310', 'Durango', 'Pueblo Belisario Domínguez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (691, '34310', 'Durango', 'Pueblo Colonia Hidalgo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (692, '34310', 'Durango', 'Pueblo El Arenal (San Jerónimo)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (693, '34310', 'Durango', 'Ejido Francisco Villa Nuevo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (694, '34310', 'Durango', 'Ejido Francisco Villa Viejo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (695, '34313', 'Durango', 'Ranchería Rancho Chapultepec');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (696, '34314', 'Durango', 'Ejido Las Huertas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (697, '34314', 'Durango', 'Ranchería Rancho Tinajas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (698, '34315', 'Durango', 'Colonia Metates');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (699, '34316', 'Durango', 'Hacienda La Pila');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (700, '34316', 'Durango', 'Rancho El Asturiano');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (701, '34317', 'Durango', 'Ranchería Los Altares (La Casa Blanca)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (702, '34317', 'Durango', 'Pueblo Independencia y Libertad');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (703, '34317', 'Durango', 'Pueblo Héroe de Nacozari');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (704, '34317', 'Durango', 'Ejido Primero de Mayo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (705, '34319', 'Durango', 'Aeropuerto Durango (Presidente Guadalupe Victoria)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (706, '34320', 'Durango', 'Ranchería Quince de Septiembre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (707, '34320', 'Durango', 'Ejido Aquiles Serdán');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (708, '34320', 'Durango', 'Pueblo Praxedis G. Guerrero Nuevo (La Loma)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (709, '34320', 'Durango', 'Pueblo Praxedis G. Guerrero Viejo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (710, '34320', 'Durango', 'Colonia General Felipe Ángeles');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (711, '34320', 'Durango', 'Granja San Luis [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (712, '34320', 'Durango', 'Granja San Miguel [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (713, '34320', 'Durango', 'Hacienda San Lorenzo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (714, '34320', 'Durango', 'Ranchería Rancho el Mezquite');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (715, '34320', 'Durango', 'Ranchería El Faisán');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (716, '34320', 'Durango', 'Ranchería El Capitán');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (717, '34320', 'Durango', 'Ranchería Revueltas [Rancho]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (718, '34323', 'Durango', 'Pueblo Parras de la Fuente');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (719, '34323', 'Durango', 'Pueblo José Refugio Salcido');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (720, '34323', 'Durango', 'Pueblo Antonio Gaxiola (La Carreta)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (721, '34323', 'Durango', 'Ejido Juan Aldama');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (722, '34323', 'Durango', 'Ranchería Rancho la Galera');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (723, '34324', 'Durango', 'Pueblo José María Pino Suárez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (724, '34324', 'Durango', 'Pueblo General Felipe Ángeles (Ejido)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (725, '34324', 'Durango', 'Ejido Ignacio López Rayón');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (726, '34324', 'Durango', 'Pueblo Plan de Ayala');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (727, '34324', 'Durango', 'Zona industrial Parque Industrial Ladrillero');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (728, '34324', 'Durango', 'Ejido San Francisco del Manzanal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (729, '34324', 'Durango', 'Pueblo Minerva (Colonia)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (730, '34324', 'Durango', 'Ranchería Los Arcos del Vergel [Rancho]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (731, '34324', 'Durango', 'Ranchería Los Membrillos [Rancho]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (732, '34325', 'Durango', 'Ejido General Mariano Matamoros');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (733, '34325', 'Durango', 'Ejido Dieciocho de Marzo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (734, '34325', 'Durango', 'Ranchería Rancho Santa Anita');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (735, '34326', 'Durango', 'Ejido Nicolás Romero');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (736, '34326', 'Durango', 'Ejido Valle Florido');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (737, '34326', 'Durango', 'Ejido Tomás Urbina');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (738, '34326', 'Durango', 'Ejido La Boca del Mezquital');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (739, '34326', 'Durango', 'Ranchería Rancho de la Cruz');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (740, '34327', 'Durango', 'Granja Los 3 Potrillos [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (741, '34327', 'Durango', 'Ranchería Balleza (José Irigoyen) [Rancho]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (742, '34327', 'Durango', 'Ranchería Los Duraznos [Rancho]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (743, '34330', 'Durango', 'Ranchería Río Escondido (La Loma)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (744, '34330', 'Durango', 'Pueblo La Ferrería (Cuatro de Octubre)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (745, '34330', 'Durango', 'Pueblo El Nayar');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (747, '34330', 'Durango', 'Pueblo Santiago Bayacora');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (748, '34330', 'Durango', 'Ejido Sebastián Lerdo de Tejada');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (749, '34330', 'Durango', 'Ejido San José de la Vinata');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (750, '34330', 'Durango', 'Ranchería San Miguel de las Maravillas de Abajo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (751, '34330', 'Durango', 'Ranchería San Miguel de las Maravillas de Arriba');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (752, '34330', 'Durango', 'Rancho La Puerta de Santiago Bayacora (Puerta Chica)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (753, '34330', 'Durango', 'Pueblo Puerta de la Cantera');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (754, '34330', 'Durango', 'Granja Delicias [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (755, '34330', 'Durango', 'Granja Fraccionamiento el Pilar');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (756, '34330', 'Durango', 'Ranchería Rancho los Cuevas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (757, '34330', 'Durango', 'Ranchería San Francisco [Rancho]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (758, '34330', 'Durango', 'Ranchería San Carlos (Las Fresas)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (759, '34334', 'Durango', 'Rancho La Flor');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (760, '34334', 'Durango', 'Ejido Las Bayas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (761, '34340', 'Durango', 'Pueblo El Pueblito');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (762, '34340', 'Durango', 'Colonia El Durazno');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (763, '34340', 'Durango', 'Ranchería El Refugio (El Conejo)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (764, '34340', 'Durango', 'Ejido El Tunal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (765, '34345', 'Durango', 'Colonia Navacoyán');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (766, '34345', 'Durango', 'Ejido San Isidro');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (767, '34345', 'Durango', 'Ejido El Encinal');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (768, '34345', 'Durango', 'Ranchería Molinillos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (769, '34346', 'Durango', 'Ejido Echeverría de la Sierra');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (770, '34348', 'Durango', 'Ranchería El Soldado');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (771, '34348', 'Durango', 'Rancho Finca el Tlalpeño');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (772, '34348', 'Durango', 'Rancho Fraccionamiento el Soldado');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (773, '34348', 'Durango', 'Fraccionamiento Fraccionamiento las Quebradas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (774, '34348', 'Durango', 'Granja Alejandra [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (775, '34348', 'Durango', 'Granja El Refugio (El Cazador) [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (776, '34350', 'Durango', 'Ejido Navajas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (777, '34350', 'Durango', 'Paraje Estación Empalme Purísima');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (778, '34350', 'Durango', 'Colonia Navíos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (779, '34350', 'Durango', 'Ranchería Rancho Macías');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (780, '34354', 'Durango', 'Paraje Estación Regocijo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (781, '34357', 'Durango', 'Ejido Las Cumbres');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (782, '34357', 'Durango', 'Pueblo Llano Grande');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (783, '34357', 'Durango', 'Granja Martínez [Granja]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (784, '34357', 'Durango', 'Ranchería Rancho la Luna');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (785, '34357', 'Durango', 'Ranchería Rancho San Pedro (San Juan)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (786, '34358', 'Durango', 'Ranchería Ojo de Agua del Cazador (Cruz de Piedra)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (787, '34358', 'Durango', 'Ejido General Domingo Arrieta (Pastores)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (788, '34360', 'Durango', 'Ejido Corral de Barranco');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (789, '34360', 'Durango', 'Rancho Presitas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (790, '34363', 'Durango', 'Ejido Banderas del Águila');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (791, '34363', 'Durango', 'Rancho Las Maravillas (Magueycitos)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (792, '34363', 'Durango', 'Fraccionamiento Paraíso de la Sierra');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (793, '34364', 'Durango', 'Ejido Unidos Venceremos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (794, '34365', 'Durango', 'Ejido Nueva Patria (Santo Domingo)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (795, '34365', 'Durango', 'Ejido San José de Ánimas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (796, '34365', 'Durango', 'Ejido Santa Lucía');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (797, '34365', 'Durango', 'Ranchería Los Yesqueros');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (798, '34366', 'Durango', 'Ejido Cerro Prieto');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (799, '34371', 'Durango', 'Pueblo Villa Montemorelos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (800, '34373', 'Durango', 'Ranchería Mi Patria es Primero (Mesa del Cuervo)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (801, '34374', 'Durango', 'Rancho Laguna Colorada de los López');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (802, '34374', 'Durango', 'Ranchería Rancho San Martín');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (803, '34375', 'Durango', 'Ranchería Mesas de Urbina');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (804, '34376', 'Durango', 'Pueblo Ignacio Zaragoza');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (805, '34377', 'Durango', 'Ejido Rodríguez Puebla');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (806, '34377', 'Durango', 'Ranchería Rancho el Manzano');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (807, '34378', 'Durango', 'Ejido Río Verde');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (808, '34378', 'Durango', 'Ejido San Benito');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (809, '34378', 'Durango', 'Ejido Unión de Rodríguez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (810, '34378', 'Durango', 'Ejido La Luz');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (811, '34378', 'Durango', 'Ranchería Rancho la Víbora');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (812, '34380', 'Durango', 'Ranchería Dieciséis de Septiembre (Cieneguita de Fullman)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (813, '34380', 'Durango', 'Pueblo General Máximo García (El Pino)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (814, '34380', 'Durango', 'Ejido El Carrizo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (815, '34380', 'Durango', 'Colonia Metates (Tenchontle)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (816, '34380', 'Durango', 'Ejido General Lázaro Cárdenas (Garabito Viejo)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (817, '34380', 'Durango', 'Ranchería Rancho el Escalón');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (818, '34380', 'Durango', 'Ranchería Rancho Espino');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (819, '34380', 'Durango', 'Ranchería Rancho Jacarandas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (820, '34380', 'Durango', 'Ranchería Rancho la Nogalera');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (821, '34380', 'Durango', 'Ranchería Las 3 Potrancas [Rancho]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (822, '34383', 'Durango', 'Ejido Los Mimbres');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (823, '34383', 'Durango', 'Ranchería La Piedra [Ranchito]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (824, '34383', 'Durango', 'Ranchería La Laguna [Rancho]');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (825, '34384', 'Durango', 'Pueblo Otinapa');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (826, '34385', 'Durango', 'Ejido Presidente Salvador Allende');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (827, '34385', 'Durango', 'Fraccionamiento Fraccionamiento Campestre Residencial Navíos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (828, '34386', 'Durango', 'Ejido San Pedro de la Máquina');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (829, '34386', 'Durango', 'Ejido Santa Cruz de San Javier');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (830, '34386', 'Durango', 'Ejido Jesús González Ortega (Pericos)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (831, '34386', 'Durango', 'Ejido La Quinta');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (832, '34386', 'Durango', 'Hacienda Otinapa');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (833, '34386', 'Durango', 'Ranchería Rancho Agua Zarca');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (834, '34387', 'Durango', 'Ejido Santa Isabel de Batres');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (835, '34390', 'Durango', 'Ranchería José María Morelos y Pavón (La Tinaja)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (836, '34393', 'Durango', 'Ejido San José del Molino');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (837, '34393', 'Durango', 'Pueblo Morcillo');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (838, '34393', 'Durango', 'Ejido Juan B. Ceballos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (839, '34393', 'Durango', 'Ranchería Rancho el Durazno');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (840, '34393', 'Durango', 'Ranchería Rancho el Pilón');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (841, '34394', 'Durango', 'Pueblo San Vicente de Chupaderos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (842, '34394', 'Durango', 'Fraccionamiento Fraccionamiento Campestre las Granjas Dos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (843, '34394', 'Durango', 'Fraccionamiento Fraccionamiento Campestre las Granjas Uno');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (844, '34394', 'Durango', 'Fraccionamiento San Miguel de Casa Blanca 2');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (845, '34394', 'Durango', 'Ranchería Rancho el Paraíso');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (846, '34395', 'Durango', 'Ranchería La Joya');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (847, '34395', 'Durango', 'Ranchería El Carmen y Anexos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (848, '34395', 'Durango', 'Rancho La Perla (Salcido)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (849, '34395', 'Durango', 'Ranchería Rancho Corral de Piedra (Postes Negros)');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (850, '34395', 'Durango', 'Ranchería Rancho la Joya');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (851, '34396', 'Durango', 'Ranchería El Toboso');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (852, '34396', 'Durango', 'Ranchería Rancho el Norteño');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (853, '34397', 'Durango', 'Colonia José María Morelos');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (854, '34397', 'Durango', 'Ejido Vicente Suárez');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (855, '34397', 'Durango', 'Ejido General Carlos Real');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (856, '34397', 'Durango', 'Ranchería Rancho las Sanjuaneras');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (857, '34397', 'Durango', 'Ranchería Rancho Viborillas');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (858, '34398', 'Durango', 'Pueblo Abraham González');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (859, '34398', 'Durango', 'Pueblo Veintisiete de Noviembre');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (860, '34398', 'Durango', 'Hacienda Hacienda el Chorro');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (861, '34398', 'Durango', 'Equipamiento CEFERESO Número 1');
INSERT INTO public.cat_cp OVERRIDING SYSTEM VALUE VALUES (862, '34398', 'Durango', 'Ranchería Rancho los Corrales');


--
-- TOC entry 4225 (class 0 OID 25085)
-- Dependencies: 219
-- Data for Name: cat_documentos; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--

INSERT INTO public.cat_documentos OVERRIDING SYSTEM VALUE VALUES (1, 'Comprobante de domicilio', 'Debe ser actual (un mes de antigüedad) y puede ser un recibo de Teléfono fijo, luz o agua.', 8);
INSERT INTO public.cat_documentos OVERRIDING SYSTEM VALUE VALUES (2, 'Examen de agudeza visual', 'Examen de integridad física ante la dependencia correspondiente, o constancia de que dicho examen fue efectuado por alguna institución médica en fecha reciente.', 8);
INSERT INTO public.cat_documentos OVERRIDING SYSTEM VALUE VALUES (3, 'Reconocimiento médico', 'En el caso de personas co discapacidad, el reconocimiento médico deberá tomar en cuenta el tipo de incapacidad del solicitante, su habilidad para superarla y el acondicionamiento de su vehículo.', 9);
INSERT INTO public.cat_documentos OVERRIDING SYSTEM VALUE VALUES (4, 'Grupo sanguíneo', 'Manifestación del Grupo Sanguíneo y Factor RH', 8);
INSERT INTO public.cat_documentos OVERRIDING SYSTEM VALUE VALUES (5, 'INE', 'Credencial INE por ambos lados', 8);
INSERT INTO public.cat_documentos OVERRIDING SYSTEM VALUE VALUES (6, 'CURP', 'CURP Actualizada', 9);
INSERT INTO public.cat_documentos OVERRIDING SYSTEM VALUE VALUES (7, 'Responsiva', 'En caso de ser menor, carta responsiva firmada por tus padres o tutor legal.', 9);


--
-- TOC entry 4227 (class 0 OID 25091)
-- Dependencies: 221
-- Data for Name: cat_estatus; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--

INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (1, 'Activo', 'usuarios', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (2, 'Inactivo', 'usuarios', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (3, 'Bloqueado', 'usuarios', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (4, 'Baja', 'usuarios', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (5, 'TwoSteps', 'usuarios', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (6, 'Activo', 'cat_usuarios', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (7, 'Inactivo', 'cat_usuarios', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (11, 'Cargado', 'documentos', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (12, 'Sin cargar', 'documentos', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (13, 'Reemplazado', 'documentos', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (14, 'Aprovado', 'documentos', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (15, 'Rechazado', 'documentos', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (16, 'Activa', 'cat_vigencia', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (17, 'Inactiva', 'cat_vigencia', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (18, 'Activa', 'cat_licencias', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (19, 'Inactiva', 'cat_licencias', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (20, 'Nueva', 'solicitudes_licenicas', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (21, 'Incompleta', 'solicitudes_licenicas', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (22, 'Completa', 'solicitudes_licenicas', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (23, 'Pendiente de revisión', 'solicitudes_licenicas', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (24, 'Aprovada', 'solicitudes_licenicas', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (25, 'Rechazada', 'solicitudes_licenicas', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (26, 'Activa', 'cat_prueba', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (27, 'Inactiva', 'cat_prueba', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (28, 'Activa', 'cat_lugares', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (29, 'Inactiva', 'cat_lugares', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (30, 'En remodelación', 'cat_lugares', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (31, 'Pendiente', 'revision_solicitudes', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (32, 'Asignada', 'revision_solicitudes', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (33, 'En Progreso', 'revision_solicitudes', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (34, 'Aprobada', 'revision_solicitudes', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (35, 'Rechazada', 'revision_solicitudes', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (8, 'Obligatorio', 'cat_documentos', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (9, 'Opcional', 'cat_documentos', true);
INSERT INTO public.cat_estatus OVERRIDING SYSTEM VALUE VALUES (10, 'Inactivo', 'cat_documentos', true);


--
-- TOC entry 4229 (class 0 OID 25098)
-- Dependencies: 223
-- Data for Name: cat_licencias; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--

INSERT INTO public.cat_licencias OVERRIDING SYSTEM VALUE VALUES (1, 'A', 'Automovilista (3 años)', 2, 18, 912);
INSERT INTO public.cat_licencias OVERRIDING SYSTEM VALUE VALUES (2, 'A', 'Motociclista (3 años)', 2, 18, 608);
INSERT INTO public.cat_licencias OVERRIDING SYSTEM VALUE VALUES (3, 'D', 'Automovilistas (descuento jóvenes)', 2, 18, 449);
INSERT INTO public.cat_licencias OVERRIDING SYSTEM VALUE VALUES (4, 'D', 'Motociclistas (descuento jóvenes)', 2, 18, 299);


--
-- TOC entry 4231 (class 0 OID 25105)
-- Dependencies: 225
-- Data for Name: cat_lugares; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--

INSERT INTO public.cat_lugares OVERRIDING SYSTEM VALUE VALUES (1, 'Lugar 1', 'Av. 123', 'De Lunes a Viernes de 9:00 a 16:00 horas', '55-123-455678', 28);
INSERT INTO public.cat_lugares OVERRIDING SYSTEM VALUE VALUES (2, 'lugar 2', 'Av. Principal # 3455', 'Sábados y Domingos de 11:00 a 18:00 horas.', '55-0000-0000', 28);


--
-- TOC entry 4233 (class 0 OID 25111)
-- Dependencies: 227
-- Data for Name: cat_pruebas; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--

INSERT INTO public.cat_pruebas OVERRIDING SYSTEM VALUE VALUES (1, 'Prueba Práctica (Automóvil)', 'Prueba práctica Automóvil', true, 26);
INSERT INTO public.cat_pruebas OVERRIDING SYSTEM VALUE VALUES (2, 'Prueba práctica (Motocicleta)', 'Prueba práctica Motocicleta', true, 26);
INSERT INTO public.cat_pruebas OVERRIDING SYSTEM VALUE VALUES (3, 'Prueba escrita', 'Prueba escrita (cualquier licencia)', false, 26);


--
-- TOC entry 4235 (class 0 OID 25117)
-- Dependencies: 229
-- Data for Name: cat_usuarios; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--

INSERT INTO public.cat_usuarios OVERRIDING SYSTEM VALUE VALUES (1, 'Admin', 'Administrador', 1);
INSERT INTO public.cat_usuarios OVERRIDING SYSTEM VALUE VALUES (2, 'Usuario', 'Usuario conductor', 1);
INSERT INTO public.cat_usuarios OVERRIDING SYSTEM VALUE VALUES (3, 'Revisor', 'Usuario revisor', 1);


--
-- TOC entry 4237 (class 0 OID 25123)
-- Dependencies: 231
-- Data for Name: cat_vigencia; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--

INSERT INTO public.cat_vigencia OVERRIDING SYSTEM VALUE VALUES (1, '1 año', 'Duración de 1 año', 1, 17);
INSERT INTO public.cat_vigencia OVERRIDING SYSTEM VALUE VALUES (2, '3 años', 'Duración de 3 años', 3, 16);
INSERT INTO public.cat_vigencia OVERRIDING SYSTEM VALUE VALUES (3, '5 años', 'Duración de 5 años', 5, 17);
INSERT INTO public.cat_vigencia OVERRIDING SYSTEM VALUE VALUES (4, 'Permanente', 'Permanente', 0, 17);


--
-- TOC entry 4250 (class 0 OID 25320)
-- Dependencies: 244
-- Data for Name: detalle_sesion; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--



--
-- TOC entry 4239 (class 0 OID 25129)
-- Dependencies: 233
-- Data for Name: documentos; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--



--
-- TOC entry 4249 (class 0 OID 25313)
-- Dependencies: 243
-- Data for Name: parametros; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--



--
-- TOC entry 4241 (class 0 OID 25136)
-- Dependencies: 235
-- Data for Name: pruebas; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--



--
-- TOC entry 4243 (class 0 OID 25142)
-- Dependencies: 237
-- Data for Name: revisiones; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--



--
-- TOC entry 4245 (class 0 OID 25150)
-- Dependencies: 239
-- Data for Name: solicitudes; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--



--
-- TOC entry 4247 (class 0 OID 25156)
-- Dependencies: 241
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: dgolicencias
--



--
-- TOC entry 4257 (class 0 OID 0)
-- Dependencies: 218
-- Name: cat_cp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dgolicencias
--

SELECT pg_catalog.setval('public.cat_cp_id_seq', 862, true);


--
-- TOC entry 4258 (class 0 OID 0)
-- Dependencies: 220
-- Name: cat_documentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dgolicencias
--

SELECT pg_catalog.setval('public.cat_documentos_id_seq', 7, true);


--
-- TOC entry 4259 (class 0 OID 0)
-- Dependencies: 222
-- Name: cat_estatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dgolicencias
--

SELECT pg_catalog.setval('public.cat_estatus_id_seq', 35, true);


--
-- TOC entry 4260 (class 0 OID 0)
-- Dependencies: 224
-- Name: cat_licencias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dgolicencias
--

SELECT pg_catalog.setval('public.cat_licencias_id_seq', 4, true);


--
-- TOC entry 4261 (class 0 OID 0)
-- Dependencies: 226
-- Name: cat_lugares_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dgolicencias
--

SELECT pg_catalog.setval('public.cat_lugares_id_seq', 2, true);


--
-- TOC entry 4262 (class 0 OID 0)
-- Dependencies: 228
-- Name: cat_pruebas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dgolicencias
--

SELECT pg_catalog.setval('public.cat_pruebas_id_seq', 3, true);


--
-- TOC entry 4263 (class 0 OID 0)
-- Dependencies: 230
-- Name: cat_usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dgolicencias
--

SELECT pg_catalog.setval('public.cat_usuarios_id_seq', 3, true);


--
-- TOC entry 4264 (class 0 OID 0)
-- Dependencies: 232
-- Name: cat_vigencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dgolicencias
--

SELECT pg_catalog.setval('public.cat_vigencia_id_seq', 4, true);


--
-- TOC entry 4265 (class 0 OID 0)
-- Dependencies: 234
-- Name: documentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dgolicencias
--

SELECT pg_catalog.setval('public.documentos_id_seq', 1, false);


--
-- TOC entry 4266 (class 0 OID 0)
-- Dependencies: 236
-- Name: pruebas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dgolicencias
--

SELECT pg_catalog.setval('public.pruebas_id_seq', 1, false);


--
-- TOC entry 4267 (class 0 OID 0)
-- Dependencies: 238
-- Name: revisiones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dgolicencias
--

SELECT pg_catalog.setval('public.revisiones_id_seq', 1, false);


--
-- TOC entry 4268 (class 0 OID 0)
-- Dependencies: 240
-- Name: solicitudes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dgolicencias
--

SELECT pg_catalog.setval('public.solicitudes_id_seq', 1, false);


--
-- TOC entry 4269 (class 0 OID 0)
-- Dependencies: 242
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dgolicencias
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, false);


--
-- TOC entry 4023 (class 2606 OID 25167)
-- Name: cat_cp cat_cp_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.cat_cp
    ADD CONSTRAINT cat_cp_pk PRIMARY KEY (id);


--
-- TOC entry 4025 (class 2606 OID 25169)
-- Name: cat_documentos cat_documentos_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.cat_documentos
    ADD CONSTRAINT cat_documentos_pk PRIMARY KEY (id);


--
-- TOC entry 4027 (class 2606 OID 25171)
-- Name: cat_estatus cat_estatus_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.cat_estatus
    ADD CONSTRAINT cat_estatus_pk PRIMARY KEY (id);


--
-- TOC entry 4029 (class 2606 OID 25173)
-- Name: cat_licencias cat_licencias_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.cat_licencias
    ADD CONSTRAINT cat_licencias_pk PRIMARY KEY (id);


--
-- TOC entry 4031 (class 2606 OID 25175)
-- Name: cat_lugares cat_lugares_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.cat_lugares
    ADD CONSTRAINT cat_lugares_pk PRIMARY KEY (id);


--
-- TOC entry 4033 (class 2606 OID 25177)
-- Name: cat_pruebas cat_pruebas_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.cat_pruebas
    ADD CONSTRAINT cat_pruebas_pk PRIMARY KEY (id);


--
-- TOC entry 4035 (class 2606 OID 25179)
-- Name: cat_usuarios cat_usuarios_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.cat_usuarios
    ADD CONSTRAINT cat_usuarios_pk PRIMARY KEY (id);


--
-- TOC entry 4037 (class 2606 OID 25181)
-- Name: cat_vigencia cat_vigencia_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.cat_vigencia
    ADD CONSTRAINT cat_vigencia_pk PRIMARY KEY (id);


--
-- TOC entry 4051 (class 2606 OID 25327)
-- Name: detalle_sesion detalle_sesion_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.detalle_sesion
    ADD CONSTRAINT detalle_sesion_pk PRIMARY KEY (id);


--
-- TOC entry 4039 (class 2606 OID 25183)
-- Name: documentos documentos_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_pk PRIMARY KEY (id);


--
-- TOC entry 4049 (class 2606 OID 25319)
-- Name: parametros parametros_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.parametros
    ADD CONSTRAINT parametros_pk PRIMARY KEY (id);


--
-- TOC entry 4041 (class 2606 OID 25185)
-- Name: pruebas pruebas_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.pruebas
    ADD CONSTRAINT pruebas_pk PRIMARY KEY (id);


--
-- TOC entry 4043 (class 2606 OID 25187)
-- Name: revisiones revisiones_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.revisiones
    ADD CONSTRAINT revisiones_pk PRIMARY KEY (id);


--
-- TOC entry 4045 (class 2606 OID 25189)
-- Name: solicitudes solicitudes_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_pk PRIMARY KEY (id);


--
-- TOC entry 4047 (class 2606 OID 25191)
-- Name: usuarios usuarios_pk; Type: CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pk PRIMARY KEY (id);


--
-- TOC entry 4052 (class 2606 OID 25192)
-- Name: cat_documentos cat_documentos_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.cat_documentos
    ADD CONSTRAINT cat_documentos_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4053 (class 2606 OID 25197)
-- Name: cat_licencias cat_licencias_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.cat_licencias
    ADD CONSTRAINT cat_licencias_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4054 (class 2606 OID 25202)
-- Name: cat_licencias cat_licencias_cat_vigencia_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.cat_licencias
    ADD CONSTRAINT cat_licencias_cat_vigencia_fk FOREIGN KEY (vigencia) REFERENCES public.cat_vigencia(id);


--
-- TOC entry 4055 (class 2606 OID 25207)
-- Name: cat_lugares cat_lugares_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.cat_lugares
    ADD CONSTRAINT cat_lugares_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4056 (class 2606 OID 25212)
-- Name: cat_usuarios cat_usuarios_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.cat_usuarios
    ADD CONSTRAINT cat_usuarios_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4057 (class 2606 OID 25217)
-- Name: cat_vigencia cat_vigencia_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.cat_vigencia
    ADD CONSTRAINT cat_vigencia_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4076 (class 2606 OID 25333)
-- Name: detalle_sesion detalle_sesion_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.detalle_sesion
    ADD CONSTRAINT detalle_sesion_cat_estatus_fk FOREIGN KEY (id_estatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4077 (class 2606 OID 25328)
-- Name: detalle_sesion detalle_sesion_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.detalle_sesion
    ADD CONSTRAINT detalle_sesion_usuarios_fk FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);


--
-- TOC entry 4058 (class 2606 OID 25222)
-- Name: documentos documentos_cat_documentos_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_cat_documentos_fk FOREIGN KEY (idtipodocumento) REFERENCES public.cat_documentos(id);


--
-- TOC entry 4059 (class 2606 OID 25227)
-- Name: documentos documentos_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4060 (class 2606 OID 25232)
-- Name: documentos documentos_solicitudes_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_solicitudes_fk FOREIGN KEY (idsolicitud) REFERENCES public.solicitudes(id);


--
-- TOC entry 4061 (class 2606 OID 25237)
-- Name: documentos documentos_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_usuarios_fk FOREIGN KEY (idestatus) REFERENCES public.usuarios(id);


--
-- TOC entry 4062 (class 2606 OID 25242)
-- Name: pruebas pruebas_cat_documentos_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.pruebas
    ADD CONSTRAINT pruebas_cat_documentos_fk FOREIGN KEY (idestatus) REFERENCES public.cat_documentos(id);


--
-- TOC entry 4063 (class 2606 OID 25247)
-- Name: pruebas pruebas_cat_lugares_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.pruebas
    ADD CONSTRAINT pruebas_cat_lugares_fk FOREIGN KEY (idlugar) REFERENCES public.cat_lugares(id);


--
-- TOC entry 4064 (class 2606 OID 25252)
-- Name: pruebas pruebas_cat_pruebas_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.pruebas
    ADD CONSTRAINT pruebas_cat_pruebas_fk FOREIGN KEY (idtipoprueba) REFERENCES public.cat_pruebas(id);


--
-- TOC entry 4065 (class 2606 OID 25257)
-- Name: pruebas pruebas_solicitudes_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.pruebas
    ADD CONSTRAINT pruebas_solicitudes_fk FOREIGN KEY (idsolicitud) REFERENCES public.solicitudes(id);


--
-- TOC entry 4066 (class 2606 OID 25262)
-- Name: revisiones revisiones_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.revisiones
    ADD CONSTRAINT revisiones_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4067 (class 2606 OID 25267)
-- Name: revisiones revisiones_solicitudes_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.revisiones
    ADD CONSTRAINT revisiones_solicitudes_fk FOREIGN KEY (idsolicitud) REFERENCES public.solicitudes(id);


--
-- TOC entry 4068 (class 2606 OID 25272)
-- Name: revisiones revisiones_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.revisiones
    ADD CONSTRAINT revisiones_usuarios_fk FOREIGN KEY (idrevisor) REFERENCES public.usuarios(id);


--
-- TOC entry 4069 (class 2606 OID 25277)
-- Name: solicitudes solicitudes_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4070 (class 2606 OID 25282)
-- Name: solicitudes solicitudes_cat_licencias_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_cat_licencias_fk FOREIGN KEY (idtipolicencia) REFERENCES public.cat_licencias(id);


--
-- TOC entry 4071 (class 2606 OID 25287)
-- Name: solicitudes solicitudes_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_usuarios_fk FOREIGN KEY (idusuario) REFERENCES public.usuarios(id);


--
-- TOC entry 4072 (class 2606 OID 25292)
-- Name: usuarios usuarios_cat_cp_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_cat_cp_fk FOREIGN KEY (cp) REFERENCES public.cat_cp(id);


--
-- TOC entry 4073 (class 2606 OID 25297)
-- Name: usuarios usuarios_cat_cp_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_cat_cp_fk_1 FOREIGN KEY (conodico_cp) REFERENCES public.cat_cp(id);


--
-- TOC entry 4074 (class 2606 OID 25302)
-- Name: usuarios usuarios_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4075 (class 2606 OID 25307)
-- Name: usuarios usuarios_cat_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: dgolicencias
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_cat_usuarios_fk FOREIGN KEY (idtipousuario) REFERENCES public.cat_usuarios(id);


-- Completed on 2026-01-07 12:43:43

--
-- PostgreSQL database dump complete
--

