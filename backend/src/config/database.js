module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'truckeria',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
