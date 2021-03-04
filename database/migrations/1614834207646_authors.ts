import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Authors extends BaseSchema {
  protected tableName = 'authors'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
