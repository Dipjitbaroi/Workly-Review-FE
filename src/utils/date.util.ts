// date format or other date related util functions
import { format } from "date-fns"

export const DateUtil = {
    /**
     * @param date 2023-05-09
     * @returns 09 May 2023
     */
    formatOnlyDate: (date: Date | string) => {
        return format(new Date(date), "dd MMM yyyy")
    },
    /**
     * @param date 2023-05-09
     * @returns 09 May 2023 (11:43 AM)
     */
    formatDateTime: (date: Date | string) => {
        return format(new Date(date), "dd MMM yyyy (hh:mm a)")
    },
    /**
     * @param date 2024-05-24T12:23:00.000Z"
     * @returns 12:23 AM
     */
    formatOnlyTime: (dateString: Date | string) => {
        const date = new Date(dateString)

        const hours = date.getUTCHours()
        const minutes = date.getUTCMinutes()

        // Convert to 12-hour format with AM/PM
        const amPm = hours >= 12 ? "PM" : "AM"
        const adjustedHours = hours % 12 || 12 // Handle 0 hour as 12 AM and adjust for 12-hour format

        const formattedTime = `${adjustedHours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")} ${amPm}`

        return formattedTime
    },
}
