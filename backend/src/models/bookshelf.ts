const knex = require('knex')(require('knexfile').development);
const bookshelf = require('bookshelf')(knex);
export { bookshelf };