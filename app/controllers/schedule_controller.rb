class ScheduleController < ApplicationController
  def index
    @technicians = Technician.all
    @plan = Plan.includes(:location).order(:time)
  end
end

