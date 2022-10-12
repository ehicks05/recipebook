## Recipe Book Backend

[![GitHub license](https://badgen.net/github/license/Naereen/Strapdown.js)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

[Fly Dasbhboard](https://fly.io/apps/recipe-book)

[Grafana Dashboard](https://metrics.shicks255.com/d/XRAQQm67z/recipe-book)

[Github](https://github.com/hicks-team/recipeBook)

# Swagger URLs

| ENV | URL                                   |
| --- | ------------------------------------- |
| dev | http://localhost:8080/rest-docs       |
| fly | https://recipe-book.fly.dev/rest-docs |

# Developer Setup

1. Clone project
2. Create and update a .env file under backend/
3. Update the .env file with a DATABASE_URL variable in the format of
   postgresql://DB_USER:DB_PASSWORD@DB_URL:POST/DB_NAME

# Running Locally

### As NPM Script

1. npm run dev

### As Docker Image

1. docker build -t recipe-book-server .
2. docker-compose up

# Deploying

Deploying to http://Fly.IO

Dockerfile

declare the node version
declare the workdir

copy package.json, tsconfig.json and src
run npm ci
run npm run prisma:generate
copy node_modules
run npm run build

that was the build stage,
the enxt stage will be exposing and running the transpiled JS

delcare the node version
declare the workdir
env NODE_ENV=production

copy package.json, src/prisma
run npm ci --only=production
run npm run prisma:generate
copy --from=builder build ./build
copy env file
expose port
cmd [ "node", "build/index.js"]

With that dockerfile we can deploy to fly by running
flyctl deploy - this should automatically find this dockerfile and build an image on their repository and deploy it

other fly commands:

info - show you info about your current app (what is current app??)
apps list - list your apps
open - open your hostname in browser
