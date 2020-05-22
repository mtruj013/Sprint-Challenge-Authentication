//if doing heroku pg import here

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { 
      filename: './database/auth.db3' 
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { 
      directory: './database/seeds' 
    },
  },
  testing: {
    useNullAsDefault: true,
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};
