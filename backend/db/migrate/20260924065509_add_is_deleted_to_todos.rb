class AddIsDeletedToTodos < ActiveRecord::Migration[7.1]
  def change
    add_column :todos, :is_deleted, :boolean, default: false, null: false
  end
end
