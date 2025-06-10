import { ScheduleCard } from "@/app/dashboard/components/scheduleCard";
import { fireEvent, render, screen } from "@/components/test-utils";

const scheduleItem = {
    id: '2',
    finished: false,
    time: new Date(),
    assignment: { id: '1', name: 'Coloração', price: 200 },
    customer: { id: '1', name: 'Maria', phone: '999999999', schedules_count: 1, total_spent: 200 }
}

describe('Schedule Card component', () => {
    it('should have scheduling data', () => {
        render(<ScheduleCard item={scheduleItem} />)

        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
        const clockIcon = screen.getByLabelText('ícone de relógio')

        expect(screen.getByText('Maria')).toBeInTheDocument();
        expect(screen.getByText('Coloração')).toBeInTheDocument();
        expect(screen.getByText(timeRegex)).toBeInTheDocument();
        expect(clockIcon).toBeInTheDocument();
    })
})