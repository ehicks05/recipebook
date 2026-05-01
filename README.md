# Welcome to your InstantDB Tanstack Start app 👋

[TanStack Start Docs](https://tanstack.com/start/latest/docs/framework/react/overview)
[InstantDB Docs](https://www.instantdb.com/docs)

This is a Tanstack Start project scaffolded with create-instant-app.

To run the development server:
`npm run dev`

To push schema changes:
`npx instant-cli push`

To pull schema changes:
`npx instant-cli pull`

Got any feedback or questions? Join our [Discord](https://discord.gg/hgVf9R6SBm)

# potential todos

Build simple cron into the tanstack start server. This would be to pick the daily featured recipe. Could also be used for regular backups.

Make ingredients embedded json. This simplifies writes and avoid potential ordering issues (since order is implicit and based on creation date). The main obstacle is being able to search by ingredient. You'd have to fetch all recipes and do client side search. Which is fine for personal use but wouldn't scale if we ever open to the public.

