class CreatePlans < ActiveRecord::Migration[7.2]
  def change
    create_table :plans do |t|
      t.references :technician, null: false, foreign_key: true # references id in Technician  Database
      t.references :location, null: false, foreign_key: true # references id in Location Database
      t.time :time # Stores time in (hours, minutes, seconds)
      t.integer :duration
      t.integer :price

      t.timestamps
    end
  end
end
