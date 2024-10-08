# Import Rake Task, run by using rake import:import_csv in terminal
namespace :import do
    desc "Import data from CSV files into the database"
    task import_csv: :environment do
        require "csv"
        locations_file = "db/locations.csv"
        technicians_file = "db/technicians.csv"
        work_orders_file = "db/work_orders.csv"
        # Adds csv files to database, can disregard id column as it is auto generated by Rails
        CSV.foreach(locations_file, headers: true) do |row|
            data = row.to_hash
            Location.create!(name: data["name"], city: data["city"])
        end
        CSV.foreach(technicians_file, headers: true) do |row|
            data = row.to_hash
            Technician.create!(name: data["name"])
        end
        CSV.foreach(work_orders_file, headers: true) do |row|
            data = row.to_hash
            Plan.create!(technician_id: data["technician_id"],
            location_id: data["location_id"],
            time: data["time"],
            duration: data["duration"].to_i, # to_i makes string to intege
            price: data["price"].to_i)
        end
    end
end
