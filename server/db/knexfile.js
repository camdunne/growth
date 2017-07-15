module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'growth',
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
  },
};
