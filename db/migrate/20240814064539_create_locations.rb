class CreateLocations < ActiveRecord::Migration[7.2]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :city

      t.timestamps
    end
  end
end
