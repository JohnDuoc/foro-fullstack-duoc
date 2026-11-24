# ForoHub Cloud — Sistema FullStack de Foros

Plataforma web full-stack para gestión de comunidades, discusiones y moderación de contenido, desarrollada con arquitectura de microservicios en **Java 21 / Spring Boot**, persistencia en **Oracle Cloud Autonomous Database (Wallet)**, frontend en **Angular + Bootstrap 5** y orquestación con **Docker**.

---

## Arquitectura del Monorepo

```text
foro-fullstack/
├── ms-usuario/           # Microservicio de Usuarios, Roles y Autenticación JWT (Puerto 8081)
├── ms-foro/              # Microservicio de Categorías, Publicaciones, Comentarios y Moderación (Puerto 8082)
├── frontend-foro/        # Aplicación Web SPA en Angular + Bootstrap 5 Grid 12 columnas (Puerto 4200)
├── docker-compose.yml    # Orquestación de contenedores Docker
├── .gitignore            # Exclusión de compilados, dependencias y credenciales Wallet
└── README.md             # Documentación técnica del proyecto