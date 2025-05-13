export async function up(knex) {
  // Vendedores
  await knex.schema.createTable('salespeople', table => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.text('email').unique().notNullable();
    table.decimal('commission_rate',5,2).notNullable().defaultTo(0);
  });

  // Clientes
  await knex.schema.createTable('customers', table => {
    table.string('code',20).primary();
    table.text('name').notNullable();
    table.text('address');
    table.integer('salesperson_id').references('id').inTable('salespeople');
  });

  // Pedidos
  await knex.schema.createTable('orders', table => {
    table.increments('order_number').primary();
    table.string('client_code',20).references('code').inTable('customers').notNullable();
    table.date('order_date').notNullable();
    table.decimal('total',12,2).notNullable();
  });

  // Boletos / Invoices
  await knex.schema.createTable('invoices', table => {
    table.increments('id').primary();
    table.integer('order_number').references('order_number').inTable('orders');
    table.date('due_date').notNullable();
    table.date('paid_date');
    table.decimal('amount',12,2).notNullable();
    table.text('status').notNullable();
  });

  // Usuários
  await knex.schema.createTable('usuarios', table => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.text('email').unique().notNullable();
    table.text('senha').notNullable();
    table.text('cargo').notNullable();
  });

  // Produtos
  await knex.schema.createTable('products', table => {
    table.increments('id').primary();
    table.string('code',50).unique().notNullable();
    table.text('name').notNullable();
    table.decimal('price',12,2).notNullable();
    table.integer('stock').defaultTo(0);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('usuarios');
  await knex.schema.dropTableIfExists('invoices');
  await knex.schema.dropTableIfExists('orders');
  await knex.schema.dropTableIfExists('customers');
  await knex.schema.dropTableIfExists('salespeople');
}
