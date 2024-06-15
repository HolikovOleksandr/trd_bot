export default () => ({
  port: process.env.PORT,
  db: {
    host: process.env.PGHOST,
    port: +process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  },
  binance: {
    api: process.env.BINANCE_API_KEY,
    secret: process.env.BINANCE_SECRET_KEY,
  },
});
