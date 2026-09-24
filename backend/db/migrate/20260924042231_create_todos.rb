class CreateTodos < ActiveRecord::Migration[7.1]
  def change
    create_table :todos do |t|
      t.string :name, null: false
      t.boolean :is_done, default: false, null: false
      t.boolean :is_trashed, default: false, null: false
      t.text :memo
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
