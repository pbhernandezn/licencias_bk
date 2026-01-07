--
-- PostgreSQL database cluster dump
--

-- Started on 2026-01-06 14:19:58

\restrict SwqN1BVhAtwmpfhJTLQN9cRADSZdJJr6wyT8IOFfbhf6sk9y5enyIBBhdbNzpIs

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;

--
-- User Configurations
--








\unrestrict SwqN1BVhAtwmpfhJTLQN9cRADSZdJJr6wyT8IOFfbhf6sk9y5enyIBBhdbNzpIs

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

\restrict 2Z7RKbjUnA4zQnd1WNjR5x2RZowimv1MtHf3UB4g4RaPzZb0DriLtZHgJ0Z37nD

-- Dumped from database version 17.7
-- Dumped by pg_dump version 17.7

-- Started on 2026-01-06 14:19:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2026-01-06 14:19:58

--
-- PostgreSQL database dump complete
--

\unrestrict 2Z7RKbjUnA4zQnd1WNjR5x2RZowimv1MtHf3UB4g4RaPzZb0DriLtZHgJ0Z37nD

--
-- Database "licencias" dump
--

--
-- PostgreSQL database dump
--

\restrict SCIWlHqjA8PKVVa25Jk8NEEnalpOnCcVNkihyihRuWwo6KNpzRxFuwzYRZmqu9h

-- Dumped from database version 17.7
-- Dumped by pg_dump version 17.7

-- Started on 2026-01-06 14:19:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5064 (class 1262 OID 16402)
-- Name: licencias; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE licencias WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Mexico.1252';


ALTER DATABASE licencias OWNER TO postgres;

\unrestrict SCIWlHqjA8PKVVa25Jk8NEEnalpOnCcVNkihyihRuWwo6KNpzRxFuwzYRZmqu9h
\connect licencias
\restrict SCIWlHqjA8PKVVa25Jk8NEEnalpOnCcVNkihyihRuWwo6KNpzRxFuwzYRZmqu9h

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16403)
-- Name: cat_cp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat_cp (
    id smallint NOT NULL,
    cp character varying NOT NULL,
    municipio character varying,
    localidad character varying NOT NULL
);


ALTER TABLE public.cat_cp OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16408)
-- Name: cat_cp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- TOC entry 219 (class 1259 OID 16409)
-- Name: cat_documentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat_documentos (
    id smallint NOT NULL,
    documento character varying NOT NULL,
    descripcion character varying NOT NULL,
    idestatus integer NOT NULL
);


ALTER TABLE public.cat_documentos OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16414)
-- Name: cat_documentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- TOC entry 221 (class 1259 OID 16415)
-- Name: cat_estatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat_estatus (
    id smallint NOT NULL,
    estatus character varying NOT NULL,
    tabla character varying NOT NULL,
    activo boolean DEFAULT true NOT NULL
);


ALTER TABLE public.cat_estatus OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16421)
-- Name: cat_estatus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- TOC entry 223 (class 1259 OID 16422)
-- Name: cat_licencias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat_licencias (
    id smallint NOT NULL,
    licencia character varying NOT NULL,
    descripcion character varying NOT NULL,
    vigencia integer NOT NULL,
    idestatus integer NOT NULL,
    precio numeric DEFAULT 0 NOT NULL
);


ALTER TABLE public.cat_licencias OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16428)
-- Name: cat_licencias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- TOC entry 225 (class 1259 OID 16429)
-- Name: cat_lugares; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat_lugares (
    id smallint NOT NULL,
    lugar character varying NOT NULL,
    direccion character varying NOT NULL,
    horario character varying NOT NULL,
    telefono character varying NOT NULL,
    idestatus integer NOT NULL
);


ALTER TABLE public.cat_lugares OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16434)
-- Name: cat_lugares_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- TOC entry 227 (class 1259 OID 16435)
-- Name: cat_pruebas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat_pruebas (
    id smallint NOT NULL,
    prueba character varying NOT NULL,
    descripcion character varying NOT NULL,
    presencial boolean NOT NULL,
    idestatus integer NOT NULL
);


ALTER TABLE public.cat_pruebas OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16440)
-- Name: cat_pruebas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- TOC entry 229 (class 1259 OID 16441)
-- Name: cat_usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat_usuarios (
    id smallint NOT NULL,
    usuario character varying NOT NULL,
    descripcion character varying NOT NULL,
    idestatus integer NOT NULL
);


ALTER TABLE public.cat_usuarios OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16446)
-- Name: cat_usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- TOC entry 231 (class 1259 OID 16447)
-- Name: cat_vigencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat_vigencia (
    id smallint NOT NULL,
    vigencia character varying NOT NULL,
    descripcion character varying NOT NULL,
    anios integer NOT NULL,
    idestatus integer NOT NULL
);


ALTER TABLE public.cat_vigencia OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16452)
-- Name: cat_vigencia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- TOC entry 244 (class 1259 OID 16637)
-- Name: detalle_sesion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_sesion (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    fecha_inicio timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_fin timestamp without time zone,
    ip inet NOT NULL,
    exitoso boolean NOT NULL,
    token text NOT NULL,
    id_status integer NOT NULL,
    comentarios character varying(150)
);


ALTER TABLE public.detalle_sesion OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 16636)
-- Name: detalle_sesion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_sesion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_sesion_id_seq OWNER TO postgres;

--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 243
-- Name: detalle_sesion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_sesion_id_seq OWNED BY public.detalle_sesion.id;


--
-- TOC entry 233 (class 1259 OID 16453)
-- Name: documentos; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public.documentos OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16459)
-- Name: documentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- TOC entry 246 (class 1259 OID 16657)
-- Name: parametros; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parametros (
    id integer NOT NULL,
    parametro character varying(50) NOT NULL,
    valor character varying(150) NOT NULL
);


ALTER TABLE public.parametros OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 16656)
-- Name: parametros_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parametros_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parametros_id_seq OWNER TO postgres;

--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 245
-- Name: parametros_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parametros_id_seq OWNED BY public.parametros.id;


--
-- TOC entry 235 (class 1259 OID 16460)
-- Name: pruebas; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public.pruebas OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16465)
-- Name: pruebas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- TOC entry 237 (class 1259 OID 16466)
-- Name: revisiones; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public.revisiones OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16473)
-- Name: revisiones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- TOC entry 239 (class 1259 OID 16474)
-- Name: solicitudes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solicitudes (
    id integer NOT NULL,
    idusuario integer NOT NULL,
    creacion date DEFAULT CURRENT_TIMESTAMP,
    modificacion date DEFAULT CURRENT_TIMESTAMP,
    idtipolicencia integer NOT NULL,
    idestatus integer NOT NULL
);


ALTER TABLE public.solicitudes OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 16479)
-- Name: solicitudes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- TOC entry 241 (class 1259 OID 16480)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
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
    apellidos character varying NOT NULL,
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
    conocido_apellidos character varying,
    conocido_domicilio character varying,
    conodico_cp integer,
    conodico_colonia character varying,
    conodico_municipio character varying,
    conodico_localidad character varying,
    conodico_telefono character varying,
    idestatus integer NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 16487)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- TOC entry 4823 (class 2604 OID 16640)
-- Name: detalle_sesion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_sesion ALTER COLUMN id SET DEFAULT nextval('public.detalle_sesion_id_seq'::regclass);


--
-- TOC entry 4825 (class 2604 OID 16660)
-- Name: parametros id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parametros ALTER COLUMN id SET DEFAULT nextval('public.parametros_id_seq'::regclass);


--
-- TOC entry 5029 (class 0 OID 16403)
-- Dependencies: 217
-- Data for Name: cat_cp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat_cp (id, cp, municipio, localidad) FROM stdin;
1	34000	Durango	Colonia Victoria de Durango Centro
2	34000	Durango	Colonia Dionisio Gallardo
3	34000	Durango	Colonia Luis Gómez Zepeda
4	34000	Durango	Fraccionamiento Rinconada Mascareñas
5	34000	Durango	Fraccionamiento Herrera Leyva
6	34000	Durango	Fraccionamiento Privada del Sahuaro
7	34010	Durango	Colonia Héctor Mayagoitia Domínguez
8	34010	Durango	Colonia José López Portillo
9	34010	Durango	Colonia Morga
10	34010	Durango	Colonia Valentín Gómez Farias
11	34010	Durango	Fraccionamiento Minero Napoleón Gómez Sada
12	34014	Durango	Colonia Las Palmas
13	34014	Durango	Colonia Juan Salazar
14	34014	Durango	Colonia Palma Alta
15	34014	Durango	Colonia Paseo de la Pradera
16	34015	Durango	Colonia Ampliación Héctor Mayagoitia Domínguez
17	34015	Durango	Colonia Ladera del Pedregal
18	34016	Durango	Fraccionamiento Ciudad San Isidro
19	34016	Durango	Colonia El Prado
20	34016	Durango	Colonia Morelos Norte
21	34016	Durango	Colonia Amalia Solórzano
22	34016	Durango	Colonia Cesar Guillermo Meraz
23	34017	Durango	Colonia PRI
24	34017	Durango	Colonia Ampliación PRI
25	34017	Durango	Colonia Luz y Esperanza
26	34018	Durango	Colonia Ángel Tejada Espino
27	34019	Durango	Colonia Lázaro Cárdenas
28	34020	Durango	Colonia Benjamín Méndez
29	34020	Durango	Colonia Guadalupe
30	34020	Durango	Colonia Rosas del Tepeyac
31	34020	Durango	Colonia Cuadra del Ferrocarril
32	34020	Durango	Colonia Cerro de Guadalupe
33	34024	Durango	Colonia Planta de Impregnación (Ferrocarrilera)
34	34027	Durango	Colonia Recuerdos del Pasado
35	34027	Durango	Colonia Unidad Guadalupe
36	34028	Durango	Colonia Sergio Méndez Arceo
37	34029	Durango	Colonia Cerro del Mercado
38	34029	Durango	Colonia Ampliación Rosas del Tepeyac
39	34030	Durango	Colonia 16 de Septiembre
40	34030	Durango	Fraccionamiento Acereros
41	34030	Durango	Fraccionamiento San Ignacio
42	34030	Durango	Colonia San Martín de Porres
43	34030	Durango	Colonia El Ciprés (Cerro del Mercado)
44	34030	Durango	Colonia San Isidro
45	34038	Durango	Fraccionamiento Las Águilas
46	34038	Durango	Fraccionamiento Cielo Vista
47	34038	Durango	Fraccionamiento Residencial la Rioja
48	34038	Durango	Fraccionamiento Residencial Puerta de Hierro
49	34038	Durango	Fraccionamiento Residencial Plaza Alejandra
50	34039	Durango	Colonia Las Encinas
51	34039	Durango	Colonia La Rielera
52	34039	Durango	Colonia Alejandra
53	34039	Durango	Colonia Vallesol
54	34039	Durango	Colonia Terrenos del Ferrocarril
55	34040	Durango	Colonia Villa de Guadalupe
56	34043	Durango	Colonia Las Cumbres
57	34043	Durango	Colonia Niños Héroes
58	34045	Durango	Colonia Antonio Ramirez
59	34045	Durango	Equipamiento Parque Sahuatoba
60	34045	Durango	Colonia Alcaldes
61	34045	Durango	Colonia Valle Dorado
62	34045	Durango	Colonia El Mirador
63	34045	Durango	Colonia Gobernadores
64	34045	Durango	Colonia Las Margaritas
65	34046	Durango	Colonia Miguel de La Madrid Hurtado
66	34046	Durango	Fraccionamiento Legisladores Durangueños
67	34047	Durango	Colonia Bellavista
68	34048	Durango	Colonia Felipe Ángeles
69	34049	Durango	Colonia La Virgen
70	34049	Durango	Fraccionamiento Privada San Vicente
71	34050	Durango	Colonia Maderera
72	34050	Durango	Colonia Santa María
73	34058	Durango	Fraccionamiento La Loma
74	34060	Durango	Colonia Fátima
75	34069	Durango	Fraccionamiento Paloma
76	34070	Durango	Colonia Silvestre Dorador
77	34074	Durango	Barrio El Calvario
78	34075	Durango	Fraccionamiento Madrazo
79	34076	Durango	Colonia Los Ángeles
80	34077	Durango	Colonia Predio Canoas
81	34080	Durango	Fraccionamiento Del Lago
82	34080	Durango	Colonia Esperanza
83	34080	Durango	Colonia Nueva Vizcaya
84	34080	Durango	Colonia Real del Prado
85	34090	Durango	Colonia Ciénega
86	34100	Durango	Fraccionamiento Lomas del Parque
87	34100	Durango	Fraccionamiento Los Remedios
88	34100	Durango	Fraccionamiento Villa Lomas
89	34100	Durango	Fraccionamiento Loma Dorada Diamante
90	34100	Durango	Fraccionamiento Privada San Lorenzo
91	34100	Durango	Fraccionamiento Riconada San Javier
92	34103	Durango	Colonia Ampliación Tapias
93	34103	Durango	Colonia F.O.S. La Virgen
94	34103	Durango	Colonia Campestre Los Pinos
95	34104	Durango	Fraccionamiento Loma Dorada
96	34105	Durango	Colonia El Saltito
97	34105	Durango	Colonia La Esmeralda
98	34105	Durango	Colonia General Lázaro Cárdenas (Garabitos Nuevo)
99	34105	Durango	Fraccionamiento Colinas del Saltito
100	34105	Durango	Fraccionamiento Paseo del Saltito
101	34105	Durango	Fraccionamiento Lomas
102	34105	Durango	Fraccionamiento Alexa
103	34105	Durango	Fraccionamiento Gardenias Privadas Residencial
104	34106	Durango	Fraccionamiento Campestre Jacarandas
105	34106	Durango	Fraccionamiento Hacienda Residencial San Fernanda
106	34106	Durango	Fraccionamiento Paseo del Bosque
107	34106	Durango	Fraccionamiento Residencial Santa Bárbara
108	34106	Durango	Fraccionamiento San Ángel
109	34106	Durango	Fraccionamiento Las Alamedas
110	34106	Durango	Colonia 15 de Mayo (Tapias)
111	34106	Durango	Fraccionamiento Privada San Ángel Inn
112	34106	Durango	Fraccionamiento Las Alamedas II
113	34106	Durango	Fraccionamiento Residencial las Alamedas
114	34106	Durango	Fraccionamiento Privada Alejandro
115	34107	Durango	Condominio Santi Residencial
116	34107	Durango	Fraccionamiento Residencial Hortencia
117	34107	Durango	Fraccionamiento Residencial La Salle
118	34107	Durango	Fraccionamiento Haciendas el Saltito
119	34108	Durango	Colonia Ampliación El Saltito
120	34108	Durango	Colonia Lomas del Sahuatoba
121	34108	Durango	Fraccionamiento Hacienda Alejandro Plus
122	34108	Durango	Fraccionamiento Rinconada Misión del Pedregal
123	34108	Durango	Fraccionamiento La Lomita
124	34108	Durango	Colonia Del Bosque
125	34108	Durango	Colonia Buenos Aires
126	34108	Durango	Fraccionamiento Pedregal de San Pedro
127	34109	Durango	Fraccionamiento Residencial Caletto
128	34109	Durango	Fraccionamiento Privadas del Sahuatoba
129	34109	Durango	Fraccionamiento Privadas del Guadiana
130	34109	Durango	Fraccionamiento Real del Lago
131	34109	Durango	Fraccionamiento Privadas del Parque
132	34110	Durango	Colonia Empleado Municipal
133	34110	Durango	Fraccionamiento Lomas del Guadiana
134	34110	Durango	Fraccionamiento Alexa Plus
135	34110	Durango	Fraccionamiento Valle Alegre
136	34110	Durango	Fraccionamiento Villa los Remedios
137	34113	Durango	Fraccionamiento Sarh
138	34116	Durango	Fraccionamiento Vista Hermosa del Guadiana
139	34119	Durango	Fraccionamiento San Roque
140	34119	Durango	Colonia Predio la Loza
141	34120	Durango	Colonia Benito Juárez
142	34120	Durango	Colonia Gustavo Díaz Ordaz
143	34120	Durango	Fraccionamiento La Granja
144	34120	Durango	Colonia Valle del Sur
145	34120	Durango	Fraccionamiento La Estancia
146	34123	Durango	Colonia 9 de Julio
147	34123	Durango	Fraccionamiento El Rosario
148	34124	Durango	Colonia Arco Iris
149	34124	Durango	Colonia El Soliceño
150	34124	Durango	Colonia Miguel González Avelar
151	34124	Durango	Fraccionamiento Balcón de Tapias
152	34124	Durango	Colonia Nuevo Amanecer
153	34124	Durango	Colonia San Miguel
154	34124	Durango	Colonia 12 de Diciembre
155	34124	Durango	Fraccionamiento Puertas del Sol III
156	34125	Durango	Colonia 1° de Mayo
157	34126	Durango	Fraccionamiento Potreros del Refugio
158	34127	Durango	Colonia CNOP
159	34127	Durango	Colonia Tierra y Libertad
160	34128	Durango	Colonia Las Flores
161	34128	Durango	Colonia Manuel Buendía
162	34128	Durango	Fraccionamiento Niños Héroes de Chapultepec
163	34128	Durango	Fraccionamiento Puerta del Sol
164	34128	Durango	Fraccionamiento Puertas del Sol II
165	34129	Durango	Fraccionamiento Aztlán
166	34130	Durango	Colonia Del Valle
167	34130	Durango	Colonia Francisco Villa
168	34130	Durango	Colonia Insurgentes
169	34135	Durango	Colonia Vicente Guerrero
170	34136	Durango	Colonia Ricardo Flores Magón
171	34137	Durango	Colonia Picachos
172	34137	Durango	Colonia Veteranos de La Revolución
173	34138	Durango	Barrio De Analco
174	34138	Durango	Fraccionamiento Hernandez
175	34138	Durango	Fraccionamiento El Milagro
176	34139	Durango	Barrio Cantarranas
177	34139	Durango	Fraccionamiento La Esmeralda
178	34139	Durango	Barrio Barrio Tierra Blanca
179	34139	Durango	Fraccionamiento Villa Alegre
180	34139	Durango	Colonia Cazarco
181	34139	Durango	Fraccionamiento El Brillante
182	34139	Durango	Fraccionamiento El Consuelo
183	34139	Durango	Colonia Estrella
184	34139	Durango	Fraccionamiento Privada Luna
185	34139	Durango	Fraccionamiento Rinconada Badiola
186	34140	Durango	Colonia Anahuac
187	34140	Durango	Colonia División del Norte
188	34140	Durango	Colonia Lucio Cabañas
189	34143	Durango	Colonia Ampliación Tlatelolco
190	34143	Durango	Unidad habitacional Bello Atardecer
191	34143	Durango	Colonia San José
192	34143	Durango	Colonia Tlatelolco
193	34143	Durango	Colonia Valle Municipal
194	34144	Durango	Fraccionamiento Las Calzadas
195	34144	Durango	Colonia La Joya
196	34144	Durango	Colonia Durango Nuevo 1
197	34144	Durango	Colonia Durango Nuevo II
198	34144	Durango	Colonia El Brillante
199	34144	Durango	Colonia Villas Doradas
200	34144	Durango	Colonia Villa Antigua
201	34144	Durango	Colonia Bosques del Nayar
202	34144	Durango	Colonia Bello Amanecer
203	34144	Durango	Colonia 23 de Marzo
204	34144	Durango	Colonia Rinconada San Antonio
205	34144	Durango	Colonia Buena Vista
206	34144	Durango	Colonia Ampliación Nuevo Milenio
207	34144	Durango	Colonia La Estrella
208	34144	Durango	Colonia El Lucero
209	34144	Durango	Colonia Jardines del Nayar
210	34144	Durango	Colonia Pedregal de La Nueva España
211	34145	Durango	Colonia Asentamientos Humanos
212	34146	Durango	Colonia Los Álamos
213	34147	Durango	Colonia Arroyo Seco
214	34147	Durango	Fraccionamiento Cerrada la Huerta
215	34147	Durango	Fraccionamiento Villas del Atardecer
322	34186	Durango	Colonia Villas Alpinas
216	34147	Durango	Colonia Fundo Legal Arroyo Seco
217	34147	Durango	Colonia Las Gardenias
218	34147	Durango	Colonia Manuel Gómez Morin
219	34147	Durango	Colonia Las Calandrias
220	34147	Durango	Fraccionamiento La Huerta
221	34147	Durango	Colonia La Moderna
222	34147	Durango	Colonia Los Tulipanes I
223	34147	Durango	Colonia Gaviotas II
224	34147	Durango	Colonia El Durazno
225	34147	Durango	Fraccionamiento Hacienda de Tapias
226	34150	Durango	Colonia IV Centenario
227	34150	Durango	Fraccionamiento Chapultepec
228	34150	Durango	Colonia Juan de La Barrera
229	34150	Durango	Fraccionamiento Silvestre Revueltas
230	34150	Durango	Fraccionamiento Privada Paraíso
231	34150	Durango	Fraccionamiento Villas Santa Teresa
232	34156	Durango	Fraccionamiento Ocampo
233	34157	Durango	Fraccionamiento Francisco González de La Vega
234	34157	Durango	Fraccionamiento San Diego
235	34158	Durango	Fraccionamiento La Pradera
236	34159	Durango	Fraccionamiento Francisco I Madero
237	34160	Durango	Colonia Azcapotzalco
238	34160	Durango	Fraccionamiento El Edén
239	34160	Durango	Fraccionamiento Huizache I
240	34160	Durango	Fraccionamiento Huizache II
241	34160	Durango	Fraccionamiento Villas del Edén
242	34162	Durango	Fraccionamiento Las Milpas
243	34162	Durango	Fraccionamiento Los Nogales
244	34162	Durango	Colonia Solidaridad
245	34162	Durango	Fraccionamiento Valle del Mezquital I
246	34162	Durango	Fraccionamiento Nueva Providencia
247	34162	Durango	Fraccionamiento Valle del Mezquital II
248	34162	Durango	Fraccionamiento Los Pinos Residencial
249	34162	Durango	Fraccionamiento Nuevo Durango I
250	34162	Durango	Fraccionamiento Real del Country
251	34162	Durango	Fraccionamiento Residencial Santa Teresa
252	34162	Durango	Fraccionamiento Margarita Maza de Juárez
253	34163	Durango	Colonia Benito Juárez
254	34164	Durango	Fraccionamiento Nuevo Milenio
255	34164	Durango	Fraccionamiento Milenio 450 II
256	34164	Durango	Fraccionamiento Cristóbal Colón
257	34164	Durango	Colonia Luz del Carmen
258	34164	Durango	Colonia Alianza por Durango
259	34165	Durango	Colonia Los Sauces
260	34165	Durango	Colonia Universal
261	34166	Durango	Fraccionamiento Centauro del Norte
262	34166	Durango	Fraccionamiento Primer Presidente
263	34166	Durango	Fraccionamiento SEDUE
264	34166	Durango	Colonia Valle del Guadiana
265	34166	Durango	Fraccionamiento Rinconada del Ángel
266	34166	Durango	Fraccionamiento Las Flores III
267	34166	Durango	Fraccionamiento Santa Teresa
268	34166	Durango	Fraccionamiento Nuevo Durango II
269	34166	Durango	Fraccionamiento Nuevo Durango III
270	34166	Durango	Fraccionamiento Hacienda las Flores
271	34166	Durango	Fraccionamiento Residencial Villa Dorada
272	34167	Durango	Fraccionamiento Las Magdalenas
273	34167	Durango	Fraccionamiento Barcelona
274	34167	Durango	Fraccionamiento Milenio 450
275	34167	Durango	Colonia Victoria de Durango
276	34167	Durango	Fraccionamiento Galicia
277	34167	Durango	Fraccionamiento Benito Juárez
278	34167	Durango	Colonia Jardines de Cancún
279	34167	Durango	Colonia Isabel Almanza
280	34167	Durango	Colonia Don Francisco
281	34167	Durango	Fraccionamiento Colibrí
282	34167	Durango	Fraccionamiento Orquídea
283	34167	Durango	Fraccionamiento Locutores
284	34167	Durango	Fraccionamiento Bicentenario
285	34167	Durango	Fraccionamiento Colibrí II
286	34167	Durango	Fraccionamiento Privada San Martín
287	34167	Durango	Colonia El Alacrán
288	34167	Durango	Fraccionamiento Vivah Reforma I
289	34167	Durango	Fraccionamiento Constituyentes
290	34167	Durango	Colonia Edmundo Ravelo Duarte
291	34167	Durango	Fraccionamiento Toledo
292	34167	Durango	Fraccionamiento Aranza
293	34167	Durango	Fraccionamiento Geraldine
294	34167	Durango	Colonia Ignacio Zaragoza
295	34168	Durango	Colonia El Paraíso
296	34168	Durango	Colonia San Carlos
297	34168	Durango	Fraccionamiento Bicentenario
298	34168	Durango	Fraccionamiento Real Victoria II
299	34168	Durango	Colonia Ampliación Las Rosas
300	34169	Durango	Colonia Genaro Vázquez
301	34169	Durango	Colonia Miramar
302	34170	Durango	Fraccionamiento Camino Real
303	34170	Durango	Colonia El Refugio
304	34170	Durango	Colonia Jalisco
305	34170	Durango	Fraccionamiento Los Fuentes
306	34170	Durango	Fraccionamiento Las Misiones (Edificios de Departamentos)
307	34170	Durango	Fraccionamiento Privada las Quintas
308	34175	Durango	Colonia José Martí
309	34176	Durango	Fraccionamiento Providencia II FOVISSSTE
310	34176	Durango	Fraccionamiento Villas Alpinas
311	34176	Durango	Fraccionamiento Privada Casuarinas
312	34179	Durango	Fraccionamiento Providencia I
313	34180	Durango	Fraccionamiento Domingo Arrieta
314	34185	Durango	Fraccionamiento Senderos
315	34185	Durango	Fraccionamiento Real de Privanzas
316	34185	Durango	Condominio Torres Toscana
317	34185	Durango	Fraccionamiento Las Quintas
318	34186	Durango	Fraccionamiento Cerrada Privanzas
319	34186	Durango	Colonia Valle Alegre
320	34186	Durango	Colonia Villa Jardín
321	34186	Durango	Colonia Diana Laura R de Colosio
323	34186	Durango	Colonia Mireles
324	34186	Durango	Colonia Claveles II
325	34186	Durango	Colonia Claveles 1 (Ampliación Luis Donaldo Colosio)
326	34186	Durango	Fraccionamiento Campo Alegre
327	34186	Durango	Fraccionamiento Las Esperanzas
328	34186	Durango	Fraccionamiento Las Privanzas
329	34186	Durango	Colonia Villas Doradas II
330	34187	Durango	Colonia Ejidal
331	34187	Durango	Fraccionamiento Niños Héroes
332	34188	Durango	Colonia Constitución
333	34188	Durango	Colonia Dolores del Río
334	34188	Durango	Colonia Juan Lira Bracho
335	34188	Durango	Colonia Las Auroras
336	34188	Durango	Colonia Luis Donaldo Colosio
337	34188	Durango	Colonia Jesús María
338	34189	Durango	Fraccionamiento La Arboleda
339	34190	Durango	Colonia Azteca
340	34190	Durango	Fraccionamiento El Naranjal
341	34190	Durango	Fraccionamiento Real del Naranjal
342	34190	Durango	Fraccionamiento SAHOP
343	34190	Durango	Fraccionamiento Granja Graciela
344	34190	Durango	Fraccionamiento Santa Cruz Residencial
345	34190	Durango	Fraccionamiento Los Ángeles Villas
346	34193	Durango	Fraccionamiento Residencial los Laureles
347	34193	Durango	Fraccionamiento El Lago
348	34193	Durango	Fraccionamiento El Atardecer Residencial
349	34193	Durango	Fraccionamiento Cotto de Asturias
350	34193	Durango	Fraccionamiento El Roble Residencial
351	34193	Durango	Colonia Potrero los Abonos
352	34193	Durango	Fraccionamiento Linda Vista
353	34193	Durango	Fraccionamiento Los Nogales Residencial
354	34193	Durango	Fraccionamiento Los Cedros Residencial
355	34193	Durango	Fraccionamiento El Bosque Residencial
356	34194	Durango	Fraccionamiento Arantzazu II
357	34194	Durango	Fraccionamiento Rancho San Miguel
358	34194	Durango	Colonia Las Flores Sur
359	34194	Durango	Colonia México
360	34194	Durango	Fraccionamiento Santa Anita
361	34194	Durango	Colonia Valle Verde Sur
362	34194	Durango	Fraccionamiento Villas Campestre
363	34194	Durango	Fraccionamiento Real Campestre
364	34194	Durango	Fraccionamiento Campestre Amanecer
365	34194	Durango	Fraccionamiento O DAM
366	34194	Durango	Colonia San Vicente
367	34194	Durango	Colonia Justicia Social
368	34194	Durango	Colonia Valle de México
369	34194	Durango	Fraccionamiento Campestre de Durango
370	34194	Durango	Fraccionamiento Artemisas
371	34194	Durango	Fraccionamiento Haciendas del Campestre
372	34194	Durango	Fraccionamiento El Ensueño
373	34194	Durango	Colonia Girasoles
374	34194	Durango	Colonia Promotores Sociales
375	34194	Durango	Fraccionamiento Arantzazú
376	34195	Durango	Colonia Benigno Montoya
377	34195	Durango	Fraccionamiento Campestre Martinica
378	34195	Durango	Fraccionamiento Villa Universitaria
379	34195	Durango	Fraccionamiento Ricardo Rosales (SCT)
380	34196	Durango	Colonia 8 de Septiembre
381	34196	Durango	Fraccionamiento Rinconada Bugambilias
382	34197	Durango	Colonia Morelos Sur
383	34197	Durango	Colonia Praderas del Sur
384	34197	Durango	Fraccionamiento Loma Bonita
385	34197	Durango	Colonia Ampliación Morelos Sur
386	34198	Durango	Fraccionamiento La Ciénega
387	34198	Durango	Colonia Los Betabeles
388	34198	Durango	Fraccionamiento Misión Real Castilla
389	34198	Durango	Fraccionamiento Veranda Residencial
390	34198	Durango	Fraccionamiento Villas del Manantial (Ameyal)
391	34199	Durango	Fraccionamiento Real del Mezquital
392	34199	Durango	Fraccionamiento Privada Vista del Sol
393	34199	Durango	Fraccionamiento Villa Jacarandas
394	34199	Durango	Rancho El Potrero (Los Parra)
395	34200	Durango	Fraccionamiento Jardines de Durango
396	34200	Durango	Fraccionamiento Las Américas
397	34200	Durango	Fraccionamiento Hacienda de Fray Diego
398	34204	Durango	Fraccionamiento La Cima
399	34204	Durango	Fraccionamiento Los Eucaliptos
400	34204	Durango	Fraccionamiento Puerta de San Ignacio
401	34204	Durango	Fraccionamiento San José
402	34204	Durango	Fraccionamiento San José II
403	34204	Durango	Fraccionamiento San Daniel
404	34204	Durango	Fraccionamiento Villas de Zambrano
405	34204	Durango	Fraccionamiento Paso Real
406	34204	Durango	Fraccionamiento Antigua Hacienda
407	34204	Durango	Fraccionamiento FSTSE
408	34204	Durango	Fraccionamiento Cerrada las Torres
409	34204	Durango	Fraccionamiento San Carlo
410	34204	Durango	Fraccionamiento Acueducto
411	34204	Durango	Fraccionamiento Privadas San Ignacio
412	34204	Durango	Fraccionamiento Granja Mis Ilusiones
413	34205	Durango	Colonia Carlos Luna
414	34205	Durango	Fraccionamiento Santa Amelia
415	34205	Durango	Fraccionamiento Versalles
416	34205	Durango	Fraccionamiento Villas San Ignacio
417	34206	Durango	Colonia José Ángel Leal
418	34207	Durango	Fraccionamiento La Glorieta
419	34208	Durango	Fraccionamiento Ciudad Industrial
420	34208	Durango	Fraccionamiento Villa Blanca
421	34208	Durango	Fraccionamiento Villas del Guadiana IV
422	34208	Durango	Colonia San Juan
423	34209	Durango	Fraccionamiento Español
424	34209	Durango	Condominio Alejandría Jardines
425	34209	Durango	Fraccionamiento Tres Misiones
426	34210	Durango	Colonia Adolfo López Mateos
427	34210	Durango	Colonia Francisco Zarco
428	34210	Durango	Fraccionamiento Aserradero
429	34214	Durango	Colonia Armando del Castillo Franco
430	34214	Durango	Fraccionamiento Francisco Sarabia
431	34215	Durango	Colonia Rincón del Lobo
432	34215	Durango	Fraccionamiento Fundo Legal San Ignacio
433	34215	Durango	Fraccionamiento Cortijo Residencial Plus
434	34215	Durango	Colonia Las Huertas
435	34215	Durango	Colonia San Ignacio de Loyola
436	34215	Durango	Fraccionamiento Cumbres Residencial
437	34215	Durango	Fraccionamiento Cortijo Residencial
438	34216	Durango	Colonia Fray Diego de La Cadena
439	34217	Durango	Colonia La Ponderosa
440	34217	Durango	Fraccionamiento Boodamtam
441	34217	Durango	Colonia El Ciprés
442	34217	Durango	Fraccionamiento La Forestal
443	34217	Durango	Fraccionamiento Predio Rústico la Tinaja y los Lugos
444	34217	Durango	Unidad habitacional Cerrada Rosas
445	34217	Durango	Fraccionamiento Abetos
446	34217	Durango	Colonia Predio el Tule
447	34217	Durango	Colonia Juan Escutia
448	34217	Durango	Colonia Chulas Fronteras
449	34217	Durango	Colonia Massie
450	34217	Durango	Fraccionamiento Industrial Nuevo Durango
451	34217	Durango	Fraccionamiento Industrial Korian
452	34217	Durango	Fraccionamiento Haciendas
453	34218	Durango	Colonia Arturo Gamiz
454	34219	Durango	Colonia José Revueltas
455	34220	Durango	Fraccionamiento Guadalupe
456	34220	Durango	Fraccionamiento Guadalupe Victoria INFONAVIT
457	34220	Durango	Fraccionamiento Las Fuentes
458	34220	Durango	Fraccionamiento Predio Granados
459	34220	Durango	Fraccionamiento Cibeles
460	34220	Durango	Fraccionamiento Girasoles
461	34220	Durango	Fraccionamiento Privada Alejandrina
462	34220	Durango	Fraccionamiento Privada Villa Jardín
463	34224	Durango	Fraccionamiento Valle Oriente
464	34224	Durango	Fraccionamiento Las Nubes
465	34224	Durango	Fraccionamiento El Renacimiento
466	34224	Durango	Fraccionamiento San Luis
467	34224	Durango	Colonia Une
468	34224	Durango	Fraccionamiento Villas del Guadiana II
469	34224	Durango	Fraccionamiento Villas del Guadiana III
470	34224	Durango	Fraccionamiento Valle de Guadalupe
471	34224	Durango	Fraccionamiento Los Arbolitos I
472	34224	Durango	Fraccionamiento Las Vegas
473	34224	Durango	Fraccionamiento María Luisa
474	34224	Durango	Fraccionamiento Villas del Guadiana I
475	34224	Durango	Fraccionamiento Villas del Guadiana V (Mixto)
476	34224	Durango	Fraccionamiento Villas de Guadiana VI
477	34224	Durango	Fraccionamiento Los Arbolitos III
478	34224	Durango	Fraccionamiento Florencia
479	34224	Durango	Fraccionamiento Villas de Guadiana VII
480	34224	Durango	Fraccionamiento Nuevo Pedregal III
481	34225	Durango	Fraccionamiento Valle del Rocío
482	34225	Durango	Fraccionamiento San Fernando
483	34225	Durango	Fraccionamiento San Marcos
484	34225	Durango	Fraccionamiento San Mateo
485	34225	Durango	Fraccionamiento Nuevo Imperio
486	34225	Durango	Fraccionamiento Jardines del Real
487	34225	Durango	Fraccionamiento Tenochtitlan
488	34225	Durango	Fraccionamiento Valle de Cristo
489	34225	Durango	Fraccionamiento Los Encinos
490	34225	Durango	Fraccionamiento Los Arbolitos II
491	34225	Durango	Fraccionamiento La Luz
492	34225	Durango	Fraccionamiento Valle del Paseo
493	34225	Durango	Fraccionamiento Nuevo Valle
494	34226	Durango	Fraccionamiento Roma
495	34226	Durango	Colonia Democracia Sindical
496	34227	Durango	Fraccionamiento Bosques del Valle
497	34227	Durango	Fraccionamiento Jardines de San Antonio I
498	34227	Durango	Fraccionamiento Villas del Pedregal I
499	34227	Durango	Fraccionamiento Los Agaves
500	34227	Durango	Fraccionamiento Rinconada del Paraíso
501	34227	Durango	Fraccionamiento Villas del Carmen
502	34227	Durango	Fraccionamiento Villas del Pedregal II
503	34228	Durango	Fraccionamiento Rinconada Sol
504	34229	Durango	Fraccionamiento Fidel Velázquez I
505	34229	Durango	Fraccionamiento Fidel Velázquez II
506	34229	Durango	Fraccionamiento Fideicomiso Ciudad Industrial
507	34229	Durango	Fraccionamiento Real de Villas
508	34230	Durango	Colonia Emiliano Zapata
509	34230	Durango	Colonia Máximo Gamiz Fernández
510	34233	Durango	Fraccionamiento Bosques
511	34233	Durango	Fraccionamiento Las Brisas
512	34234	Durango	Fraccionamiento California
513	34234	Durango	Fraccionamiento 20 de Noviembre II
514	34234	Durango	Colonia Octavio Paz
515	34234	Durango	Fraccionamiento Residencial del Valle
516	34234	Durango	Colonia Valle Florido
517	34234	Durango	Fraccionamiento Las Bugambilias
518	34235	Durango	Fraccionamiento Unidad Habitacional Labor de Guadalupe
519	34235	Durango	Fraccionamiento Residencial del Marques
520	34235	Durango	Fraccionamiento Atenas
521	34235	Durango	Fraccionamiento Aranjuez
522	34235	Durango	Fraccionamiento Brisas Diamante
523	34235	Durango	Fraccionamiento Quinta del Real
524	34236	Durango	Colonia Ampliación 20 de Noviembre
525	34236	Durango	Colonia 20 de Noviembre Fundo Legal
526	34236	Durango	Colonia 20 de Noviembre
527	34236	Durango	Zona industrial Fraccionamiento Industrial Scorpio
528	34236	Durango	Colonia Los Agaves
529	34236	Durango	Fraccionamiento Caminos del Sol
530	34236	Durango	Fraccionamiento Haciendas del Pedregal I
531	34236	Durango	Fraccionamiento Nuevo Pedregal
746	34330	Durango	Ejido Pilar de Zaragoza
532	34236	Durango	Colonia Rinconada las Flores
533	34236	Durango	Fraccionamiento Los Duraznos
534	34236	Durango	Fraccionamiento Haciendas del Pedregal II
535	34236	Durango	Fraccionamiento Residencial Santa Clara
536	34237	Durango	Fraccionamiento Joyas del Valle
537	34237	Durango	Fraccionamiento Las Alamedas MT
538	34237	Durango	Fraccionamiento La Noria
539	34237	Durango	Fraccionamiento San Gabriel
540	34237	Durango	Fraccionamiento Villas del Sol
541	34237	Durango	Fraccionamiento Privada San Vicente II
542	34237	Durango	Fraccionamiento Monte Bello
543	34237	Durango	Fraccionamiento Las Bugambilias III
544	34237	Durango	Fraccionamiento San Jorge
545	34237	Durango	Fraccionamiento Ágata
546	34237	Durango	Fraccionamiento Residencial Casa Blanca
547	34238	Durango	Fraccionamiento La Hacienda
548	34239	Durango	Fraccionamiento Provincial
549	34239	Durango	Fraccionamiento Privada las Hortencias
550	34240	Durango	Colonia Del Maestro
551	34240	Durango	Colonia Santa Fe
552	34250	Durango	Colonia Luis Echeverría Alvarez
553	34260	Durango	Fraccionamiento Las Playas
554	34260	Durango	Colonia Porfirio Díaz
555	34260	Durango	Fraccionamiento Rincón de Agricultura
556	34269	Durango	Fraccionamiento Vergel del Desierto
557	34270	Durango	Colonia Guillermina
558	34270	Durango	Colonia Hipódromo
559	34270	Durango	Colonia Olga Margarita
560	34270	Durango	Colonia Heberto Castillo
561	34277	Durango	Fraccionamiento Reforma
562	34278	Durango	Fraccionamiento Nazas
563	34279	Durango	Colonia Burócrata
564	34280	Durango	Colonia J Guadalupe Rodriguez
565	34284	Durango	Colonia Valle Verde Oriente
566	34284	Durango	Colonia Pedro Ávila Nevárez
567	34285	Durango	Fraccionamiento Los Fresnos
568	34286	Durango	Fraccionamiento 22 de Septiembre
569	34287	Durango	Fraccionamiento Villas San José
570	34287	Durango	Fraccionamiento Tecnológico
571	34287	Durango	Fraccionamiento Jorge Herrera Delgado
572	34287	Durango	Fraccionamiento Pirineos
573	34287	Durango	Fraccionamiento Real Victoria I
574	34287	Durango	Fraccionamiento La Coruña
575	34287	Durango	Colonia Cielo Azul
576	34287	Durango	Colonia Solares Veinte de Noviembre
577	34287	Durango	Fraccionamiento España
578	34287	Durango	Colonia Liberación Social
579	34287	Durango	Fraccionamiento Villas de San Francisco
580	34287	Durango	Fraccionamiento Privada Aserradero
581	34287	Durango	Fraccionamiento Residencial las Palmas
582	34287	Durango	Fraccionamiento Los Viñedos
583	34287	Durango	Fraccionamiento Hogares del Parque
584	34289	Durango	Colonia Industrial Ladrillera
585	34290	Durango	Fraccionamiento Canelas
586	34298	Durango	Colonia Patria Libre
587	34298	Durango	Colonia Rinconada los Álamos
588	34299	Durango	Fraccionamiento Los Álamos
589	34299	Durango	Fraccionamiento Los Alamitos
590	34300	Durango	Granja San Andrés [Granja]
591	34300	Durango	Rancho El Jacalón
592	34300	Durango	Granja Santa Teresa [Granja]
593	34300	Durango	Ranchería Rancho el Canelo
594	34300	Durango	Ranchería Rancho la Abundancia (El Venado)
595	34300	Durango	Ranchería Rancho la Parcela
596	34300	Durango	Ranchería Rancho los Torres
597	34300	Durango	Ranchería Rancho Madrid
598	34300	Durango	Ranchería Rancho San Vicente
599	34303	Durango	Pueblo Labor de Guadalupe
600	34303	Durango	Ranchería La Cruz (Sayula)
601	34303	Durango	Granja Santa Rita [Granja]
602	34303	Durango	Granja Granjas del Río
603	34303	Durango	Ranchería Rancho el Fresno
604	34303	Durango	Ranchería Rancho el Sauz
605	34303	Durango	Ranchería Rancho Esperanza
606	34303	Durango	Ranchería Rancho Hidalgo
607	34303	Durango	Ranchería El Mezquite [Rancho]
608	34303	Durango	Ranchería La Huerta [Granja]
609	34303	Durango	Ranchería Rancho Ramos Vázquez
610	34303	Durango	Ranchería San Francisco
611	34303	Durango	Ejido Santa Cruz del Río
612	34304	Durango	Zona industrial Centro Logístico Industrial de Durango
613	34304	Durango	Ejido La Quinta
614	34304	Durango	Ranchería Málaga
615	34304	Durango	Granja Don Luis Sandoval [Granja]
616	34304	Durango	Ranchería Rancho California
617	34304	Durango	Ranchería Rancho Dos Hermanos
618	34304	Durango	Ranchería Rancho el Apuro
619	34304	Durango	Ranchería Rancho el Arco Iris
620	34304	Durango	Ranchería Rancho el Consuelo
621	34304	Durango	Ranchería Rancho el Giro
622	34304	Durango	Ranchería Rancho el Monte
623	34304	Durango	Ranchería Rancho la Noria
624	34304	Durango	Ranchería Rancho las Nubes
625	34304	Durango	Ranchería Rancho Lorena
626	34304	Durango	Ranchería Rancho los Ángeles
627	34304	Durango	Ranchería Rancho María Esther
628	34304	Durango	Ranchería Rancho Santa Lucía
629	34304	Durango	Ranchería Rancho Tierra Limpia
630	34305	Durango	Colonia Cerrada Calera
631	34305	Durango	Pueblo Cinco de Mayo
632	34305	Durango	Ranchería Fray Francisco Montes de Oca
633	34305	Durango	Ranchería San Carlos
634	34305	Durango	Pueblo General Lázaro Cárdenas
635	34305	Durango	Colonia Calera
636	34305	Durango	Granja El Peligro [Granja]
637	34305	Durango	Finca Finca las Flores
638	34305	Durango	Ranchería Rancho el Maguey
639	34305	Durango	Ranchería Rancho el Tecolote
640	34305	Durango	Ranchería Rancho los Pinos
641	34305	Durango	Ranchería Rancho Nuevo Monterrey
642	34305	Durango	Ranchería Las Avestruces
643	34306	Durango	Pueblo Contreras
644	34306	Durango	Pueblo El Tepetate
645	34306	Durango	Ejido Cristóbal Colón
646	34306	Durango	Colonia La Campana
647	34306	Durango	Colonia Las Minitas
648	34306	Durango	Ranchería La Campana
649	34306	Durango	Pueblo Quince de Octubre
650	34306	Durango	Ejido Antonio Castillo
651	34306	Durango	Granja Betania [Granja]
652	34306	Durango	Granja Dos Arbolitos [Granja]
653	34306	Durango	Granja Hermanos Flores [Granja]
654	34306	Durango	Granja La Maroma [Granja]
655	34306	Durango	Granja Las Gabrielas [Rancho]
656	34306	Durango	Granja Los Arcos [Granja]
657	34306	Durango	Hacienda Hacienda San Martina
658	34306	Durango	Ranchería Rancho Dalila
659	34306	Durango	Ranchería Gas Plus
660	34306	Durango	Ranchería Rancho Huichapa
661	34306	Durango	Ranchería Rancho la Presa de Navacoyán
662	34306	Durango	Ranchería Rancho los Portales Cabalgantes
663	34306	Durango	Ranchería Rancho Nativitas
664	34307	Durango	Pueblo Dolores Hidalgo
665	34307	Durango	Pueblo Gabino Santillán
666	34307	Durango	Fraccionamiento Residencial San Felipe
667	34307	Durango	Fraccionamiento Villa Italiana Residencial
668	34307	Durango	Ranchería La Nogalera
669	34307	Durango	Granja Martínez [Granja]
670	34307	Durango	Granja Guadalupe (Natera) [Granja]
671	34307	Durango	Granja Jovana [Granja]
672	34307	Durango	Granja La Casita [Granja]
673	34307	Durango	Granja Laura [Granja]
674	34307	Durango	Granja María Luisa [Granja]
675	34307	Durango	Ranchería Rancho Alaska 1
676	34307	Durango	Ranchería Rancho el Paraíso
677	34307	Durango	Ranchería Rancho las Águilas
678	34307	Durango	Ranchería Rancho las Flores
679	34307	Durango	Ranchería Rancho las Nubes
680	34307	Durango	Ranchería Rancho los Colorines
681	34307	Durango	Ranchería Rancho los Pelícanos
682	34307	Durango	Ranchería El Lago
683	34307	Durango	Ranchería Rancho San Francisco de Calleros
684	34307	Durango	Fraccionamiento Río Dorado
685	34308	Durango	Ejido Veintiocho de Septiembre
686	34308	Durango	Granja Cristy [Granja]
687	34308	Durango	Granja El Rosario [Granja]
688	34308	Durango	Granja San Miguel [Granja]
689	34310	Durango	Ejido Cinco de Febrero
690	34310	Durango	Pueblo Belisario Domínguez
691	34310	Durango	Pueblo Colonia Hidalgo
692	34310	Durango	Pueblo El Arenal (San Jerónimo)
693	34310	Durango	Ejido Francisco Villa Nuevo
694	34310	Durango	Ejido Francisco Villa Viejo
695	34313	Durango	Ranchería Rancho Chapultepec
696	34314	Durango	Ejido Las Huertas
697	34314	Durango	Ranchería Rancho Tinajas
698	34315	Durango	Colonia Metates
699	34316	Durango	Hacienda La Pila
700	34316	Durango	Rancho El Asturiano
701	34317	Durango	Ranchería Los Altares (La Casa Blanca)
702	34317	Durango	Pueblo Independencia y Libertad
703	34317	Durango	Pueblo Héroe de Nacozari
704	34317	Durango	Ejido Primero de Mayo
705	34319	Durango	Aeropuerto Durango (Presidente Guadalupe Victoria)
706	34320	Durango	Ranchería Quince de Septiembre
707	34320	Durango	Ejido Aquiles Serdán
708	34320	Durango	Pueblo Praxedis G. Guerrero Nuevo (La Loma)
709	34320	Durango	Pueblo Praxedis G. Guerrero Viejo
710	34320	Durango	Colonia General Felipe Ángeles
711	34320	Durango	Granja San Luis [Granja]
712	34320	Durango	Granja San Miguel [Granja]
713	34320	Durango	Hacienda San Lorenzo
714	34320	Durango	Ranchería Rancho el Mezquite
715	34320	Durango	Ranchería El Faisán
716	34320	Durango	Ranchería El Capitán
717	34320	Durango	Ranchería Revueltas [Rancho]
718	34323	Durango	Pueblo Parras de la Fuente
719	34323	Durango	Pueblo José Refugio Salcido
720	34323	Durango	Pueblo Antonio Gaxiola (La Carreta)
721	34323	Durango	Ejido Juan Aldama
722	34323	Durango	Ranchería Rancho la Galera
723	34324	Durango	Pueblo José María Pino Suárez
724	34324	Durango	Pueblo General Felipe Ángeles (Ejido)
725	34324	Durango	Ejido Ignacio López Rayón
726	34324	Durango	Pueblo Plan de Ayala
727	34324	Durango	Zona industrial Parque Industrial Ladrillero
728	34324	Durango	Ejido San Francisco del Manzanal
729	34324	Durango	Pueblo Minerva (Colonia)
730	34324	Durango	Ranchería Los Arcos del Vergel [Rancho]
731	34324	Durango	Ranchería Los Membrillos [Rancho]
732	34325	Durango	Ejido General Mariano Matamoros
733	34325	Durango	Ejido Dieciocho de Marzo
734	34325	Durango	Ranchería Rancho Santa Anita
735	34326	Durango	Ejido Nicolás Romero
736	34326	Durango	Ejido Valle Florido
737	34326	Durango	Ejido Tomás Urbina
738	34326	Durango	Ejido La Boca del Mezquital
739	34326	Durango	Ranchería Rancho de la Cruz
740	34327	Durango	Granja Los 3 Potrillos [Granja]
741	34327	Durango	Ranchería Balleza (José Irigoyen) [Rancho]
742	34327	Durango	Ranchería Los Duraznos [Rancho]
743	34330	Durango	Ranchería Río Escondido (La Loma)
744	34330	Durango	Pueblo La Ferrería (Cuatro de Octubre)
745	34330	Durango	Pueblo El Nayar
747	34330	Durango	Pueblo Santiago Bayacora
748	34330	Durango	Ejido Sebastián Lerdo de Tejada
749	34330	Durango	Ejido San José de la Vinata
750	34330	Durango	Ranchería San Miguel de las Maravillas de Abajo
751	34330	Durango	Ranchería San Miguel de las Maravillas de Arriba
752	34330	Durango	Rancho La Puerta de Santiago Bayacora (Puerta Chica)
753	34330	Durango	Pueblo Puerta de la Cantera
754	34330	Durango	Granja Delicias [Granja]
755	34330	Durango	Granja Fraccionamiento el Pilar
756	34330	Durango	Ranchería Rancho los Cuevas
757	34330	Durango	Ranchería San Francisco [Rancho]
758	34330	Durango	Ranchería San Carlos (Las Fresas)
759	34334	Durango	Rancho La Flor
760	34334	Durango	Ejido Las Bayas
761	34340	Durango	Pueblo El Pueblito
762	34340	Durango	Colonia El Durazno
763	34340	Durango	Ranchería El Refugio (El Conejo)
764	34340	Durango	Ejido El Tunal
765	34345	Durango	Colonia Navacoyán
766	34345	Durango	Ejido San Isidro
767	34345	Durango	Ejido El Encinal
768	34345	Durango	Ranchería Molinillos
769	34346	Durango	Ejido Echeverría de la Sierra
770	34348	Durango	Ranchería El Soldado
771	34348	Durango	Rancho Finca el Tlalpeño
772	34348	Durango	Rancho Fraccionamiento el Soldado
773	34348	Durango	Fraccionamiento Fraccionamiento las Quebradas
774	34348	Durango	Granja Alejandra [Granja]
775	34348	Durango	Granja El Refugio (El Cazador) [Granja]
776	34350	Durango	Ejido Navajas
777	34350	Durango	Paraje Estación Empalme Purísima
778	34350	Durango	Colonia Navíos
779	34350	Durango	Ranchería Rancho Macías
780	34354	Durango	Paraje Estación Regocijo
781	34357	Durango	Ejido Las Cumbres
782	34357	Durango	Pueblo Llano Grande
783	34357	Durango	Granja Martínez [Granja]
784	34357	Durango	Ranchería Rancho la Luna
785	34357	Durango	Ranchería Rancho San Pedro (San Juan)
786	34358	Durango	Ranchería Ojo de Agua del Cazador (Cruz de Piedra)
787	34358	Durango	Ejido General Domingo Arrieta (Pastores)
788	34360	Durango	Ejido Corral de Barranco
789	34360	Durango	Rancho Presitas
790	34363	Durango	Ejido Banderas del Águila
791	34363	Durango	Rancho Las Maravillas (Magueycitos)
792	34363	Durango	Fraccionamiento Paraíso de la Sierra
793	34364	Durango	Ejido Unidos Venceremos
794	34365	Durango	Ejido Nueva Patria (Santo Domingo)
795	34365	Durango	Ejido San José de Ánimas
796	34365	Durango	Ejido Santa Lucía
797	34365	Durango	Ranchería Los Yesqueros
798	34366	Durango	Ejido Cerro Prieto
799	34371	Durango	Pueblo Villa Montemorelos
800	34373	Durango	Ranchería Mi Patria es Primero (Mesa del Cuervo)
801	34374	Durango	Rancho Laguna Colorada de los López
802	34374	Durango	Ranchería Rancho San Martín
803	34375	Durango	Ranchería Mesas de Urbina
804	34376	Durango	Pueblo Ignacio Zaragoza
805	34377	Durango	Ejido Rodríguez Puebla
806	34377	Durango	Ranchería Rancho el Manzano
807	34378	Durango	Ejido Río Verde
808	34378	Durango	Ejido San Benito
809	34378	Durango	Ejido Unión de Rodríguez
810	34378	Durango	Ejido La Luz
811	34378	Durango	Ranchería Rancho la Víbora
812	34380	Durango	Ranchería Dieciséis de Septiembre (Cieneguita de Fullman)
813	34380	Durango	Pueblo General Máximo García (El Pino)
814	34380	Durango	Ejido El Carrizo
815	34380	Durango	Colonia Metates (Tenchontle)
816	34380	Durango	Ejido General Lázaro Cárdenas (Garabito Viejo)
817	34380	Durango	Ranchería Rancho el Escalón
818	34380	Durango	Ranchería Rancho Espino
819	34380	Durango	Ranchería Rancho Jacarandas
820	34380	Durango	Ranchería Rancho la Nogalera
821	34380	Durango	Ranchería Las 3 Potrancas [Rancho]
822	34383	Durango	Ejido Los Mimbres
823	34383	Durango	Ranchería La Piedra [Ranchito]
824	34383	Durango	Ranchería La Laguna [Rancho]
825	34384	Durango	Pueblo Otinapa
826	34385	Durango	Ejido Presidente Salvador Allende
827	34385	Durango	Fraccionamiento Fraccionamiento Campestre Residencial Navíos
828	34386	Durango	Ejido San Pedro de la Máquina
829	34386	Durango	Ejido Santa Cruz de San Javier
830	34386	Durango	Ejido Jesús González Ortega (Pericos)
831	34386	Durango	Ejido La Quinta
832	34386	Durango	Hacienda Otinapa
833	34386	Durango	Ranchería Rancho Agua Zarca
834	34387	Durango	Ejido Santa Isabel de Batres
835	34390	Durango	Ranchería José María Morelos y Pavón (La Tinaja)
836	34393	Durango	Ejido San José del Molino
837	34393	Durango	Pueblo Morcillo
838	34393	Durango	Ejido Juan B. Ceballos
839	34393	Durango	Ranchería Rancho el Durazno
840	34393	Durango	Ranchería Rancho el Pilón
841	34394	Durango	Pueblo San Vicente de Chupaderos
842	34394	Durango	Fraccionamiento Fraccionamiento Campestre las Granjas Dos
843	34394	Durango	Fraccionamiento Fraccionamiento Campestre las Granjas Uno
844	34394	Durango	Fraccionamiento San Miguel de Casa Blanca 2
845	34394	Durango	Ranchería Rancho el Paraíso
846	34395	Durango	Ranchería La Joya
847	34395	Durango	Ranchería El Carmen y Anexos
848	34395	Durango	Rancho La Perla (Salcido)
849	34395	Durango	Ranchería Rancho Corral de Piedra (Postes Negros)
850	34395	Durango	Ranchería Rancho la Joya
851	34396	Durango	Ranchería El Toboso
852	34396	Durango	Ranchería Rancho el Norteño
853	34397	Durango	Colonia José María Morelos
854	34397	Durango	Ejido Vicente Suárez
855	34397	Durango	Ejido General Carlos Real
856	34397	Durango	Ranchería Rancho las Sanjuaneras
857	34397	Durango	Ranchería Rancho Viborillas
858	34398	Durango	Pueblo Abraham González
859	34398	Durango	Pueblo Veintisiete de Noviembre
860	34398	Durango	Hacienda Hacienda el Chorro
861	34398	Durango	Equipamiento CEFERESO Número 1
862	34398	Durango	Ranchería Rancho los Corrales
\.


--
-- TOC entry 5031 (class 0 OID 16409)
-- Dependencies: 219
-- Data for Name: cat_documentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat_documentos (id, documento, descripcion, idestatus) FROM stdin;
1	Comprobante de domicilio	Debe ser actual (un mes de antigüedad) y puede ser un recibo de Teléfono fijo, luz o agua.	8
2	Examen de agudeza visual	Examen de integridad física ante la dependencia correspondiente, o constancia de que dicho examen fue efectuado por alguna institución médica en fecha reciente.	8
3	Reconocimiento médico	En el caso de personas co discapacidad, el reconocimiento médico deberá tomar en cuenta el tipo de incapacidad del solicitante, su habilidad para superarla y el acondicionamiento de su vehículo.	9
4	Grupo sanguíneo	Manifestación del Grupo Sanguíneo y Factor RH	8
5	INE	Credencial INE por ambos lados	8
6	CURP	CURP Actualizada	9
7	Responsiva	En caso de ser menor, carta responsiva firmada por tus padres o tutor legal.	9
\.


--
-- TOC entry 5033 (class 0 OID 16415)
-- Dependencies: 221
-- Data for Name: cat_estatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat_estatus (id, estatus, tabla, activo) FROM stdin;
1	Activo	usuarios	t
2	Inactivo	usuarios	t
3	Bloqueado	usuarios	t
4	Baja	usuarios	t
5	TwoSteps	usuarios	t
6	Activo	cat_usuarios	t
7	Inactivo	cat_usuarios	t
11	Cargado	documentos	t
12	Sin cargar	documentos	t
13	Reemplazado	documentos	t
14	Aprovado	documentos	t
15	Rechazado	documentos	t
16	Activa	cat_vigencia	t
17	Inactiva	cat_vigencia	t
18	Activa	cat_licencias	t
19	Inactiva	cat_licencias	t
20	Nueva	solicitudes_licenicas	t
21	Incompleta	solicitudes_licenicas	t
22	Completa	solicitudes_licenicas	t
23	Pendiente de revisión	solicitudes_licenicas	t
24	Aprovada	solicitudes_licenicas	t
25	Rechazada	solicitudes_licenicas	t
26	Activa	cat_prueba	t
27	Inactiva	cat_prueba	t
28	Activa	cat_lugares	t
29	Inactiva	cat_lugares	t
30	En remodelación	cat_lugares	t
31	Pendiente	revision_solicitudes	t
32	Asignada	revision_solicitudes	t
33	En Progreso	revision_solicitudes	t
34	Aprobada	revision_solicitudes	t
35	Rechazada	revision_solicitudes	t
8	Obligatorio	cat_documentos	t
9	Opcional	cat_documentos	t
10	Inactivo	cat_documentos	t
\.


--
-- TOC entry 5035 (class 0 OID 16422)
-- Dependencies: 223
-- Data for Name: cat_licencias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat_licencias (id, licencia, descripcion, vigencia, idestatus, precio) FROM stdin;
1	A	Automovilista (3 años)	2	18	912
2	A	Motociclista (3 años)	2	18	608
3	D	Automovilistas (descuento jóvenes)	2	18	449
4	D	Motociclistas (descuento jóvenes)	2	18	299
\.


--
-- TOC entry 5037 (class 0 OID 16429)
-- Dependencies: 225
-- Data for Name: cat_lugares; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat_lugares (id, lugar, direccion, horario, telefono, idestatus) FROM stdin;
1	Lugar 1	Av. 123	De Lunes a Viernes de 9:00 a 16:00 horas	55-123-455678	28
2	lugar 2	Av. Principal # 3455	Sábados y Domingos de 11:00 a 18:00 horas.	55-0000-0000	28
\.


--
-- TOC entry 5039 (class 0 OID 16435)
-- Dependencies: 227
-- Data for Name: cat_pruebas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat_pruebas (id, prueba, descripcion, presencial, idestatus) FROM stdin;
\.


--
-- TOC entry 5041 (class 0 OID 16441)
-- Dependencies: 229
-- Data for Name: cat_usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat_usuarios (id, usuario, descripcion, idestatus) FROM stdin;
1	Admin	Administrador	1
2	Usuario	Usuario conductor	1
3	Revisor	Usuario revisor	1
\.


--
-- TOC entry 5043 (class 0 OID 16447)
-- Dependencies: 231
-- Data for Name: cat_vigencia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat_vigencia (id, vigencia, descripcion, anios, idestatus) FROM stdin;
1	1 año	Duración de 1 año	1	17
2	3 años	Duración de 3 años	3	16
3	5 años	Duración de 5 años	5	17
4	Permanente	Permanente	0	17
\.


--
-- TOC entry 5056 (class 0 OID 16637)
-- Dependencies: 244
-- Data for Name: detalle_sesion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_sesion (id, id_usuario, fecha_inicio, fecha_fin, ip, exitoso, token, id_status, comentarios) FROM stdin;
\.


--
-- TOC entry 5045 (class 0 OID 16453)
-- Dependencies: 233
-- Data for Name: documentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.documentos (id, idusuario, idsolicitud, creacion, idtipodocumento, formato, nombreoriginal, tamanio, validacionfecha, validacionusuario, validacioncomentarios, validacion, idestatus) FROM stdin;
\.


--
-- TOC entry 5058 (class 0 OID 16657)
-- Dependencies: 246
-- Data for Name: parametros; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parametros (id, parametro, valor) FROM stdin;
\.


--
-- TOC entry 5047 (class 0 OID 16460)
-- Dependencies: 235
-- Data for Name: pruebas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pruebas (id, creacion, modificacion, idsolicitud, idtipoprueba, idlugar, fecha, hora, idestatus) FROM stdin;
\.


--
-- TOC entry 5049 (class 0 OID 16466)
-- Dependencies: 237
-- Data for Name: revisiones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.revisiones (id, creacion, modificacion, idsolicitud, idrevisor, comentarios, idestatus) FROM stdin;
\.


--
-- TOC entry 5051 (class 0 OID 16474)
-- Dependencies: 239
-- Data for Name: solicitudes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solicitudes (id, idusuario, creacion, modificacion, idtipolicencia, idestatus) FROM stdin;
\.


--
-- TOC entry 5053 (class 0 OID 16480)
-- Dependencies: 241
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, creacion, modificacion, idtipousuario, nombres, username, password, logintype, apellidos, rfc, curp, domicilio, colonia, cp, municipio, localidad, entidad, email, nacionalidad, sexo, tiposangre, donador, lugartrabajo, restricciones, observacionmedica, conocido_nombres, conocido_apellidos, conocido_domicilio, conodico_cp, conodico_colonia, conodico_municipio, conodico_localidad, conodico_telefono, idestatus) FROM stdin;
1	2026-01-05	2026-01-05	1	draco hanzo	draco.hanzo.hattori@yopmail.com	$2a$10$WoJoPawXDXcPXQHrxsHjCu6u9tBsaNrx.9cKIkn2XvgbxL0Ut6Pxy	LOCAL	Hattori	\N	HAPJ800101HDFRRN09	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1
\.


--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 218
-- Name: cat_cp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cat_cp_id_seq', 862, true);


--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 220
-- Name: cat_documentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cat_documentos_id_seq', 7, true);


--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 222
-- Name: cat_estatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cat_estatus_id_seq', 35, true);


--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 224
-- Name: cat_licencias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cat_licencias_id_seq', 4, true);


--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 226
-- Name: cat_lugares_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cat_lugares_id_seq', 2, true);


--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 228
-- Name: cat_pruebas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cat_pruebas_id_seq', 1, false);


--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 230
-- Name: cat_usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cat_usuarios_id_seq', 3, true);


--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 232
-- Name: cat_vigencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cat_vigencia_id_seq', 4, true);


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 243
-- Name: detalle_sesion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_sesion_id_seq', 1, false);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 234
-- Name: documentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.documentos_id_seq', 1, false);


--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 245
-- Name: parametros_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parametros_id_seq', 1, false);


--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 236
-- Name: pruebas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pruebas_id_seq', 1, false);


--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 238
-- Name: revisiones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.revisiones_id_seq', 1, false);


--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 240
-- Name: solicitudes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitudes_id_seq', 1, false);


--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 242
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);


--
-- TOC entry 4827 (class 2606 OID 16489)
-- Name: cat_cp cat_cp_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_cp
    ADD CONSTRAINT cat_cp_pk PRIMARY KEY (id);


--
-- TOC entry 4829 (class 2606 OID 16491)
-- Name: cat_documentos cat_documentos_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_documentos
    ADD CONSTRAINT cat_documentos_pk PRIMARY KEY (id);


--
-- TOC entry 4831 (class 2606 OID 16493)
-- Name: cat_estatus cat_estatus_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_estatus
    ADD CONSTRAINT cat_estatus_pk PRIMARY KEY (id);


--
-- TOC entry 4833 (class 2606 OID 16495)
-- Name: cat_licencias cat_licencias_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_licencias
    ADD CONSTRAINT cat_licencias_pk PRIMARY KEY (id);


--
-- TOC entry 4835 (class 2606 OID 16497)
-- Name: cat_lugares cat_lugares_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_lugares
    ADD CONSTRAINT cat_lugares_pk PRIMARY KEY (id);


--
-- TOC entry 4837 (class 2606 OID 16499)
-- Name: cat_pruebas cat_pruebas_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_pruebas
    ADD CONSTRAINT cat_pruebas_pk PRIMARY KEY (id);


--
-- TOC entry 4839 (class 2606 OID 16501)
-- Name: cat_usuarios cat_usuarios_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_usuarios
    ADD CONSTRAINT cat_usuarios_pk PRIMARY KEY (id);


--
-- TOC entry 4841 (class 2606 OID 16503)
-- Name: cat_vigencia cat_vigencia_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_vigencia
    ADD CONSTRAINT cat_vigencia_pk PRIMARY KEY (id);


--
-- TOC entry 4853 (class 2606 OID 16645)
-- Name: detalle_sesion detalle_sesion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_sesion
    ADD CONSTRAINT detalle_sesion_pkey PRIMARY KEY (id);


--
-- TOC entry 4843 (class 2606 OID 16505)
-- Name: documentos documentos_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_pk PRIMARY KEY (id);


--
-- TOC entry 4855 (class 2606 OID 16664)
-- Name: parametros parametros_parametro_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parametros
    ADD CONSTRAINT parametros_parametro_key UNIQUE (parametro);


--
-- TOC entry 4857 (class 2606 OID 16662)
-- Name: parametros parametros_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parametros
    ADD CONSTRAINT parametros_pkey PRIMARY KEY (id);


--
-- TOC entry 4845 (class 2606 OID 16507)
-- Name: pruebas pruebas_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pruebas
    ADD CONSTRAINT pruebas_pk PRIMARY KEY (id);


--
-- TOC entry 4847 (class 2606 OID 16509)
-- Name: revisiones revisiones_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.revisiones
    ADD CONSTRAINT revisiones_pk PRIMARY KEY (id);


--
-- TOC entry 4849 (class 2606 OID 16511)
-- Name: solicitudes solicitudes_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_pk PRIMARY KEY (id);


--
-- TOC entry 4851 (class 2606 OID 16513)
-- Name: usuarios usuarios_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pk PRIMARY KEY (id);


--
-- TOC entry 4858 (class 2606 OID 16514)
-- Name: cat_documentos cat_documentos_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_documentos
    ADD CONSTRAINT cat_documentos_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4859 (class 2606 OID 16519)
-- Name: cat_licencias cat_licencias_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_licencias
    ADD CONSTRAINT cat_licencias_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4860 (class 2606 OID 16524)
-- Name: cat_licencias cat_licencias_cat_vigencia_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_licencias
    ADD CONSTRAINT cat_licencias_cat_vigencia_fk FOREIGN KEY (vigencia) REFERENCES public.cat_vigencia(id);


--
-- TOC entry 4861 (class 2606 OID 16529)
-- Name: cat_lugares cat_lugares_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_lugares
    ADD CONSTRAINT cat_lugares_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4862 (class 2606 OID 16534)
-- Name: cat_usuarios cat_usuarios_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_usuarios
    ADD CONSTRAINT cat_usuarios_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4863 (class 2606 OID 16539)
-- Name: cat_vigencia cat_vigencia_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_vigencia
    ADD CONSTRAINT cat_vigencia_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4864 (class 2606 OID 16544)
-- Name: documentos documentos_cat_documentos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_cat_documentos_fk FOREIGN KEY (idtipodocumento) REFERENCES public.cat_documentos(id);


--
-- TOC entry 4865 (class 2606 OID 16549)
-- Name: documentos documentos_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4866 (class 2606 OID 16554)
-- Name: documentos documentos_solicitudes_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_solicitudes_fk FOREIGN KEY (idsolicitud) REFERENCES public.solicitudes(id);


--
-- TOC entry 4867 (class 2606 OID 16559)
-- Name: documentos documentos_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos
    ADD CONSTRAINT documentos_usuarios_fk FOREIGN KEY (idestatus) REFERENCES public.usuarios(id);


--
-- TOC entry 4882 (class 2606 OID 16651)
-- Name: detalle_sesion fk_detalle_sesion_status; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_sesion
    ADD CONSTRAINT fk_detalle_sesion_status FOREIGN KEY (id_status) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4883 (class 2606 OID 16646)
-- Name: detalle_sesion fk_detalle_sesion_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_sesion
    ADD CONSTRAINT fk_detalle_sesion_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);


--
-- TOC entry 4868 (class 2606 OID 16564)
-- Name: pruebas pruebas_cat_documentos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pruebas
    ADD CONSTRAINT pruebas_cat_documentos_fk FOREIGN KEY (idestatus) REFERENCES public.cat_documentos(id);


--
-- TOC entry 4869 (class 2606 OID 16569)
-- Name: pruebas pruebas_cat_lugares_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pruebas
    ADD CONSTRAINT pruebas_cat_lugares_fk FOREIGN KEY (idlugar) REFERENCES public.cat_lugares(id);


--
-- TOC entry 4870 (class 2606 OID 16574)
-- Name: pruebas pruebas_cat_pruebas_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pruebas
    ADD CONSTRAINT pruebas_cat_pruebas_fk FOREIGN KEY (idtipoprueba) REFERENCES public.cat_pruebas(id);


--
-- TOC entry 4871 (class 2606 OID 16579)
-- Name: pruebas pruebas_solicitudes_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pruebas
    ADD CONSTRAINT pruebas_solicitudes_fk FOREIGN KEY (idsolicitud) REFERENCES public.solicitudes(id);


--
-- TOC entry 4872 (class 2606 OID 16584)
-- Name: revisiones revisiones_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.revisiones
    ADD CONSTRAINT revisiones_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4873 (class 2606 OID 16589)
-- Name: revisiones revisiones_solicitudes_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.revisiones
    ADD CONSTRAINT revisiones_solicitudes_fk FOREIGN KEY (idsolicitud) REFERENCES public.solicitudes(id);


--
-- TOC entry 4874 (class 2606 OID 16594)
-- Name: revisiones revisiones_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.revisiones
    ADD CONSTRAINT revisiones_usuarios_fk FOREIGN KEY (idrevisor) REFERENCES public.usuarios(id);


--
-- TOC entry 4875 (class 2606 OID 16599)
-- Name: solicitudes solicitudes_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4876 (class 2606 OID 16604)
-- Name: solicitudes solicitudes_cat_licencias_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_cat_licencias_fk FOREIGN KEY (idtipolicencia) REFERENCES public.cat_licencias(id);


--
-- TOC entry 4877 (class 2606 OID 16609)
-- Name: solicitudes solicitudes_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes
    ADD CONSTRAINT solicitudes_usuarios_fk FOREIGN KEY (idusuario) REFERENCES public.usuarios(id);


--
-- TOC entry 4878 (class 2606 OID 16614)
-- Name: usuarios usuarios_cat_cp_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_cat_cp_fk FOREIGN KEY (cp) REFERENCES public.cat_cp(id);


--
-- TOC entry 4879 (class 2606 OID 16619)
-- Name: usuarios usuarios_cat_cp_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_cat_cp_fk_1 FOREIGN KEY (conodico_cp) REFERENCES public.cat_cp(id);


--
-- TOC entry 4880 (class 2606 OID 16624)
-- Name: usuarios usuarios_cat_estatus_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_cat_estatus_fk FOREIGN KEY (idestatus) REFERENCES public.cat_estatus(id);


--
-- TOC entry 4881 (class 2606 OID 16629)
-- Name: usuarios usuarios_cat_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_cat_usuarios_fk FOREIGN KEY (idtipousuario) REFERENCES public.cat_usuarios(id);


-- Completed on 2026-01-06 14:19:59

--
-- PostgreSQL database dump complete
--

\unrestrict SCIWlHqjA8PKVVa25Jk8NEEnalpOnCcVNkihyihRuWwo6KNpzRxFuwzYRZmqu9h

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

\restrict Dyn3eZVg6jxy4cI26G2EoHjt8NHjWfASNbayrOvfhUmxngCjVKW9lvI0Zhj0lpc

-- Dumped from database version 17.7
-- Dumped by pg_dump version 17.7

-- Started on 2026-01-06 14:19:59

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16396)
-- Name: cat_cp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat_cp (
    id smallint NOT NULL,
    cp character varying NOT NULL,
    municipio character varying,
    localidad character varying NOT NULL
);


ALTER TABLE public.cat_cp OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16390)
-- Name: cat_documentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat_documentos (
    id smallint NOT NULL,
    documento character varying NOT NULL,
    descripcion character varying NOT NULL,
    idestatus integer NOT NULL
);


ALTER TABLE public.cat_documentos OWNER TO postgres;

--
-- TOC entry 4891 (class 0 OID 16396)
-- Dependencies: 218
-- Data for Name: cat_cp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat_cp (id, cp, municipio, localidad) FROM stdin;
\.


--
-- TOC entry 4890 (class 0 OID 16390)
-- Dependencies: 217
-- Data for Name: cat_documentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat_documentos (id, documento, descripcion, idestatus) FROM stdin;
\.


-- Completed on 2026-01-06 14:19:59

--
-- PostgreSQL database dump complete
--

\unrestrict Dyn3eZVg6jxy4cI26G2EoHjt8NHjWfASNbayrOvfhUmxngCjVKW9lvI0Zhj0lpc

-- Completed on 2026-01-06 14:19:59

--
-- PostgreSQL database cluster dump complete
--

