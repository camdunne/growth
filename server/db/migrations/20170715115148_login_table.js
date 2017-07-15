exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary();
    t.string('email').notNullable();
    t.string('first_name').nullable();
    t.string('last_name').nullable();
    t.string('profile_pic').nullable();
    t.timestamp('created_at').notNullable();
  }),
  knex.schema.createTable('local_logins', (t) => {
    t.increments('id').unsigned().primary();
    t.string('email').notNullable();
    t.string('password').notNullable();
    t.integer('user_id').unsigned().notNullable();
    t.foreign('user_id').references('users.id');
  }),
  knex.schema.createTable('posts', (t) => {
    t.increments('id').unsigned().primary();
    t.string('title').notNullable();
    t.string('body').nullable();
    t.integer('author_id').unsigned().notNullable();
    t.foreign('author_id').references('users.id');
    t.timestamp('created_at').notNullable();
  }),
]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTableIfExists('local_logins'),
    knex.schema.dropTableIfExists('posts'),
  ])
  .then(() => knex.schema.dropTableIfExists('users'));
