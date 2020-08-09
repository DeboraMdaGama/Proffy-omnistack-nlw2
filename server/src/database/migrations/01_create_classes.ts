import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('classes', table =>{
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();
        //chave-estrangeira para saber qual o professor dessas aulas
        table.integer('user_id').notNullable().references('id').inTable('users')
        .onUpdate('CASCADE') //Define o que acontece se o id do professor for alterado. o CASCADE então altera ID em todos os campos
        .onDelete('CASCADE'); /*Define o que acontece se o id do professor for deletado.
        Nesse caso o CASCADE apaga todas as aulas relacionadas a esse ID*/
    });
}
export async function down(knex: Knex){
    return knex.schema.dropTable('classes');
}