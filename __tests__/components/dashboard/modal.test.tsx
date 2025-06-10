import { Modal } from "@/app/dashboard/components/modal";
import { ScheduleCard } from "@/app/dashboard/components/scheduleCard";
import { act, fireEvent, render, RenderResult, screen, waitFor } from "@/components/test-utils"
import { clientApi } from "@/services/api";
import toast from "react-hot-toast";

const mockRefresh = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        refresh: mockRefresh,
    }),
}));

jest.mock('@/services/api', () => ({
    clientApi: {
        delete: jest.fn(),
    },
}));

jest.mock('react-hot-toast', () => ({
    success: jest.fn(),
    error: jest.fn(),
}));

const scheduleItem = {
    id: '2',
    finished: false,
    time: new Date('2025-06-03T18:00:00'),
    assignment: { id: '1', name: 'Coloração', price: 200 },
    customer: { id: '1', name: 'Maria', phone: '999999999', schedules_count: 1, total_spent: 200 }
}

describe('Schedule Modal component', () => {
    const setupAndOpenModal = async (item = scheduleItem): Promise<RenderResult> => {
        const renderResult = render(
            <Modal item={item}>
                <ScheduleCard item={item} />
            </Modal>
        );

        const triggerButton = screen.getByText(item.customer.name, { selector: 'button *' });
        
        act(() => {
            fireEvent.click(triggerButton);
        });
        
        await screen.findByText('Detalhes');
        return renderResult;
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (clientApi.delete as jest.Mock).mockResolvedValue({ data: {} });
    })

    it('should open modal with scheduling details on trigger button', async () => {
        render(
            <Modal item={scheduleItem}>
                <ScheduleCard item={scheduleItem}/>
            </Modal>
        )

        expect(screen.queryByText('Detalhes')).not.toBeInTheDocument();

        const triggerButton = screen.getByText(scheduleItem.customer.name, { selector: 'button *' });
        
        act(() => {
            fireEvent.click(triggerButton);
        })
        
        expect(await screen.findByText('Detalhes')).toBeInTheDocument();
        expect(await screen.findByText(scheduleItem.customer.name, { selector: '[role="dialog"] *' })).toBeInTheDocument();
        expect(await screen.findByText('ter., 03/06/25')).toBeInTheDocument();
        expect(await screen.findByText('18:00', { selector: '[role="dialog"] *' })).toBeInTheDocument();
        expect(await screen.findByText(scheduleItem.customer.phone)).toBeInTheDocument();
        expect(await screen.findByText(scheduleItem.assignment.name, { selector: '[role="dialog"] *' })).toBeInTheDocument();
        expect(await screen.findByText('R$ 200,00')).toBeInTheDocument();
    })

    it('should call delete API, show success toast, and refresh router on "Finalizar agendamento" click', async () => {
        await setupAndOpenModal();

        const finishButton = await screen.findByRole('button', { name: /Finalizar agendamento/i });
        fireEvent.click(finishButton);

        await waitFor(() => {
            expect(clientApi.delete).toHaveBeenCalledTimes(1);
            expect(clientApi.delete).toHaveBeenCalledWith("/schedule", {
                params: { schedule_id: scheduleItem.id }
            });
        });

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledTimes(1);
            expect(toast.success).toHaveBeenCalledWith("Agendamento finalizado!");

            expect(mockRefresh).toHaveBeenCalledTimes(1);
        });
    })

    it('should show error toast if API delete fails', async () => {
        (clientApi.delete as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

        await setupAndOpenModal();

        const finishButton = await screen.findByRole('button', { name: /Finalizar agendamento/i });
        fireEvent.click(finishButton);

        await waitFor(() => {
            expect(clientApi.delete).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledTimes(1);
            expect(toast.error).toHaveBeenCalledWith("Erro ao finalizar agendamento");
            
            expect(toast.success).not.toHaveBeenCalled();
            expect(mockRefresh).not.toHaveBeenCalled();
        });
    });

    it('should close modal when close button is clicked', async () => {
        await setupAndOpenModal();

        const closeButton = await screen.findByRole('button', { name: /Close/i });
        fireEvent.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByText('Detalhes')).not.toBeInTheDocument();
        })
    })
})