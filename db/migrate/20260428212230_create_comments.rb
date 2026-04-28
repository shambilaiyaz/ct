class CreateComments < ActiveRecord::Migration[8.1]
  def change
    create_table :comments do |t|
      t.string :user
      t.text :text
      t.string :date
      t.string :time

      t.timestamps
    end
  end
end
