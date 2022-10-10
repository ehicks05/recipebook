## Recipe Book Backend

[![GitHub license](https://badgen.net/github/license/Naereen/Strapdown.js)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

[Fly Dasbhboard](https://fly.io/apps/recipe-book)

[Grafana Dashboard](https://metrics.shicks255.com/d/XRAQQm67z/recipe-book)

[Github](https://github.com/hicks-team/recipeBook)

# Swagger URLs
| ENV | URL                                   |
|-----|---------------------------------------|
| dev | http://localhost:8080/rest-docs       |
| fly | https://recipe-book.fly.dev/rest-docs |

# Developer Setup

1. Clone project
2. Create and update a .env file under server/
3. Update the .env file with a DATABASE_URL variable in the format of 
postgresql://DB_USER:DB_PASSWORD@DB_URL:POST/DB_NAME

# Running Locally

### As NPM Script
1. npm run dev

### As Docker Image
1. docker build -t recipe-book-server .
2. docker-compose up
