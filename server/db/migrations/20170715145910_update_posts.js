
exports.up = knex => knex.schema.table('posts', (table) => {
  table.float('price').notNull().defaultTo(0);
  table.string('address').nullable();
  table.float('lat', 10, 8).nullable();
  table.float('lng', 10, 8).nullable();
});

exports.down = knex => knex.schema.table('posts', (table) => {
  table.dropColumn('price');
  table.dropColumn('address');
  table.dropColumn('lat');
  table.dropColumn('lng');
});
