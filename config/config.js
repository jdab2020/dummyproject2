module.exports =
{
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_NAME,
        "host": "127.0.0.1",
        "dialect": "mysql",
        "operatorsAliases": false
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "operatorsAliases": false
    },
    "production": {
        "username": process.env.JAWSDB_USER,
        "password": process.env.JAWSDB_PASS,
        "database": process.env.JAWSDB_DB,
        "host": "127.0.0.1",
        "dialect": "mysql",
        "operatorsAliases": false,
        "use_env_variable": "JAWSDB_URL"
    }
}