# Todo API DevOps

API de gestion de tâches réalisée dans le cadre du cours :

- DevOps
- Docker
- Docker Compose
- GitLab CI/CD
- PostgreSQL
- Conteneurisation

## Lancement local

Installer les dépendances :

```bash
npm install



## Lancement local

Mesures réalisées localement sous Docker Desktop.

| Image     | Taille      | Nombre de couches | Couche la plus lourde | Build à froid | Build à chaud |  HTTP  |
| todo-api  | 58952036    | 17                | 158 MB                | 5,82 s        | 2,36 s        | 7,79 s |
| stats-api | 51336473    | 21                | 87,4 MB               | 10,12 s       | 2,61 s        | 8,32 s |