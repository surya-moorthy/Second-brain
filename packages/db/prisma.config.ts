import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  
  engine: "classic",
  datasource: {
    url: 'postgresql://neondb_owner:npg_3nHKTI0ESrcq@ep-tiny-shape-a1myex3g-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  },
});
