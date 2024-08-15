class Plan < ApplicationRecord
  belongs_to :technician
  belongs_to :location
end
