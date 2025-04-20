import pgtools from 'pgtools';
import config from 'src/config/config.js';

const environment = process.env.NODE_ENV || 'development';

const dbConfig = config[environment];
const DBNAME = dbConfig.database;
const pgtoolsConfig = {
  user: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
};
async function createDatabaseIfNotExists() {
  try {
    await pgtools
      .createdb(pgtoolsConfig, DBNAME)
      .then(() => {
        console.log(`Database "${DBNAME}" successfully created.`);
        process.exit(0);
      })
      .catch(async (err) => {
        if (err.name === 'duplicate_database') {
          console.log(`Database "${DBNAME}" already exists.`);
        } else {
          console.error('Error during database creation:', err);
          process.exit(1);
        }
      });
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

createDatabaseIfNotExists();
