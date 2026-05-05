class CreateFeedbacks < ActiveRecord::Migration[8.1]
  def change
    create_table :feedbacks do |t|
      t.text :text
      t.string :username

      t.timestamps
    end
  end
end
