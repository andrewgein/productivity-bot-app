import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Calendar() {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayInMonth = new Date();
    dayInMonth.setDate(dayInMonth.getDate() + 4);

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={[
                {
                    title: "Новая задача",
                    date: `2025-11-${today.getDate()} 10:00`
                },
                {
                    title: "Новая задача 2",
                    date: `2025-11-${today.getDate()} 11:00`
                },
                {
                    title: "Задача на завтра 1",
                    date: `2025-11-${tomorrow.getDate()} 09:00`
                },
                {
                    title: "Задача на завтра 2",
                    date: `2025-11-${tomorrow.getDate()} 18:00`
                },
                {
                    title: "Задача на месяц",
                    date: `2025-11-${dayInMonth.getDate()} 23:01`
                },
                {
                    title: "Задача на месяц 2",
                    date: `2025-11-${dayInMonth.getDate()} 22:50`
                },

            ]}
        />
    )
}
