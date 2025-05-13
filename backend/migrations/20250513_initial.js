// migrations/20250513_initial.js
/**
 * @param { import("knex").Knex } knex
 */
exports.up = async function(knex) {
  await knex.schema
    .createTable('salespeople', table => {
      table.increments('id').primary();
      table.text('name').notNullable();
      table.text('email').unique().notNullable();
      table.decimal('commission_rate', 5, 2).notNullable().defaultTo(0);
    })
    .createTable('customers', table => {
      table.increments('id').primary();
      table.text('name').notNullable();
      table.text('code').unique().notNullable();
      table
        .integer('salesperson_id')
        .references('id')
        .inTable('salespeople');
    })
    .createTable('orders', table => {
      table.integer('order_number').primary();
      table.text('client_code').notNullable();
      table.date('order_date').notNullable();
      table.decimal('total', 12, 2).notNullable();
    })
    .createTable('invoices', table => {
      table.increments('id').primary();
      table.integer('order_number').references('order_number').inTable('orders');
      table.date('due_date').notNullable();
      table.date('paid_date');
      table.decimal('amount', 12, 2).notNullable();
      table.text('status').notNullable(); // open|paid|overdue
    })
    .createTable('products', table => {
      table.increments('id').primary();
      table.string('code', 50).unique().notNullable();
      table.text('name').notNullable();
      table.decimal('price', 12, 2).notNullable();
      table.integer('stock').defaultTo(0);
    });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('invoices')
    .dropTableIfExists('orders')
    .dropTableIfExists('customers')
    .dropTableIfExists('salespeople')
    .dropTableIfExists('products');
};
