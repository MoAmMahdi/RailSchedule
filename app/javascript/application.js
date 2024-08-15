// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

document.addEventListener("DOMContentLoaded", function () {

    // get all cells on the grid
    (document.querySelectorAll("#schedule-grid .cell")).forEach((cell) => {
        cell.addEventListener("click", function () {
            const startHour = parseInt(cell.getAttribute("data-hour"));
            const technicianId = cell.getAttribute("data-technician-id");
            let previousPlanEndTime = null;
            let nextPlanStartTime = null;

            // loop through and find the previous plan (plan above clicked point)

            for (let hour = startHour - 1; hour >= 0; hour--) {
                const previousCell = document.querySelector(`.cell[data-hour="${hour}"][data-technician-id="${technicianId}"]`);
                if (previousCell && previousCell.querySelector(".plan")) {
                    const planEndTimeStr = previousCell.querySelector(".plan").getAttribute("data-end-time");
                    const splitTime = planEndTimeStr.split(':')
                    const planEndTime = new Date();
                    planEndTime.setHours(splitTime[0])
                    planEndTime.setMinutes(splitTime[1])
                    planEndTime.setSeconds(0)
                    console.log(splitTime)
                    previousPlanEndTime = planEndTime;
                    break;
                }
            }

            // loop through and find the next plan (plan below clicked point)

            for (let hour = startHour; hour <= 23; hour++) {
                const currentCell = document.querySelector(`.cell[data-hour="${hour}"][data-technician-id="${technicianId}"]`);
                if (currentCell && currentCell.querySelector(".plan")) {
                    const planStartTimeStr = currentCell.querySelector(".plan").getAttribute("data-start-time");
                    console.log(planStartTimeStr)
                    const splitTime = planStartTimeStr.split(':')
                    const planStartTime = new Date();
                    planStartTime.setHours(splitTime[0])
                    planStartTime.setMinutes(splitTime[1])
                    planStartTime.setSeconds(0)
                    nextPlanStartTime = planStartTime;
                    break;
                }
            }

            let freeTimeMinutes = 0;
            let freeTimeHours = 0;

            // calculate time available

            // case where we don't have any plans above clicked point

            if (previousPlanEndTime && nextPlanStartTime) {
                freeTimeMinutes = Math.abs((nextPlanStartTime - previousPlanEndTime) / 60000); // Convert milliseconds to minutes
                freeTimeHours = Math.round(freeTimeMinutes / 60)
                freeTimeMinutes = Math.round(freeTimeMinutes % 60)
                alert(`Time available: ${freeTimeHours} hours(s) ${freeTimeMinutes} minute(s)`);
            }

            // case where we don't have any plans below clicked point
            else if (previousPlanEndTime) {
                console.log(previousPlanEndTime)
                const endOfDay = new Date();
                endOfDay.setHours(23, 59, 59, 999); // End of the day
                freeTimeMinutes = Math.abs((endOfDay - previousPlanEndTime) / 60000); // Convert milliseconds to minutes
                freeTimeHours = Math.round(freeTimeMinutes / 60)
                freeTimeMinutes = Math.round(freeTimeMinutes % 60)
                alert(`Time available: ${freeTimeHours} hours(s) ${freeTimeMinutes} minute(s)`);
            }

            // case where we don't have any plans above clicked point
            else if (nextPlanStartTime) {
                // console.log("Next: ", nextPlanStartTime)
                const startOfDay = new Date();
                startOfDay.setHours(0, 0, 0, 0); // 12 AM, start of grid
                // console.log(startOfDay)
                freeTimeMinutes = Math.abs((nextPlanStartTime - startOfDay) / 60000); // Convert milliseconds to minutes
                freeTimeHours = Math.round(freeTimeMinutes / 60)
                freeTimeMinutes = Math.round(freeTimeMinutes % 60)
                alert(`Time available: ${freeTimeHours} hours(s) ${freeTimeMinutes} minute(s)`);
            }
            // If we ever get here, that's nuts
            else {
                alert('No time found');
            }
        });
    });
});