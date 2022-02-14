module.exports = {
  type: "postgres",
  host: process.env.POSTGRES_HOST ,
  port: 5433,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE_NAME,
  logging: false,
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations/*.ts"
  }
}
