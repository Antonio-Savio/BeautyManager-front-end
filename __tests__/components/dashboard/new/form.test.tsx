import { screen, render, fireEvent, waitFor } from '@/components/test-utils'
import { NewSchedulingForm } from '@/app/dashboard/new/components/form'
import { clientApi } from '@/services/api';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

jest.mock('@/services/api', () => ({
    clientApi: {
        get: jest.fn(),
        post: jest.fn(),
    },
}));

const mockCustomers = [
    { id: 'cust1', name: 'Roberta Santos', phone: '11999990001', email: 'roberta@example.com', schedules_count: 1, total_spent: 100 },
    { id: 'cust2', name: 'Roberto Silva', phone: '11999990002', email: 'roberto@example.com', schedules_count: 0, total_spent: 0 },
];

const mockAssignments = [
    { id: 'assign1', name: 'Corte Feminino', price: 80, duration: 60, status: true, commission: 0.5 },
    { id: 'assign2', name: 'Manicure', price: 30, duration: 45, status: true, commission: 0.4 },
];

describe('New scheduling component form', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        
        (clientApi.get as jest.Mock).mockImplementation((url) => {
            if (url === '/customers') {
                return Promise.resolve({ data: mockCustomers });
            }
            if (url === '/assignments') {
                return Promise.resolve({ data: mockAssignments });
            }
            return Promise.resolve({ data: [] });
        });
        
        (clientApi.post as jest.Mock).mockResolvedValue({ data: { message: 'Success' } });
    });


    it('should call API if customer Input have 3 or more characters', async () => {
        render(<NewSchedulingForm/>);

        const customerInput = screen.getByPlaceholderText(/Ex:/i)

        expect(clientApi.get).not.toHaveBeenCalledWith('/customers')

        fireEvent.change(customerInput, { target : { value: 'Rob' } });
        
        expect(customerInput).toHaveValue('Rob');
       
        await waitFor(() => {
            expect(clientApi.get).toHaveBeenCalledWith('/customers', {
                params: { name: 'Rob', phone: 'Rob' }
            });
        })

        expect(await screen.findByText(mockCustomers[0].name)).toBeInTheDocument();
        expect(await screen.findByText(mockCustomers[0].phone)).toBeInTheDocument();
        expect(await screen.findByText(mockCustomers[1].name)).toBeInTheDocument();
    })

    it('should display "Cliente não encontrado" message if API returns no customers', async () => {
        (clientApi.get as jest.Mock).mockImplementation((url) => {
            if (url === '/customers') {
                return Promise.resolve({ data: [] });
            }

            return Promise.resolve({ data: [] });
        });

        render(<NewSchedulingForm />);
        const customerInput = screen.getByPlaceholderText(/Ex:/i);

        fireEvent.change(customerInput, { target: { value: 'Xyz' } });

        await waitFor(() => {
            expect(clientApi.get).toHaveBeenCalledWith('/customers', {
                params: { name: 'Xyz', phone: 'Xyz' },
            });
        });

        expect(await screen.findByText(/Cliente não encontrado nesta busca/i)).toBeInTheDocument();
        expect(await screen.findByRole('link')).toHaveAttribute('href', '/dashboard/customers/new')
    });

    it('should update customer input and value when a customer is selected', async () => {
        render(<NewSchedulingForm />);
        const customerInput = screen.getByPlaceholderText(/Ex:/i);

        fireEvent.change(customerInput, { target: { value: 'Rob' } });

        const customerOption = await screen.findByText(mockCustomers[0].name);
        fireEvent.click(customerOption);

        await waitFor(() => {
            expect(customerInput).toHaveValue(mockCustomers[0].name);
        })
    });

    it('should display assignments and allow selection', async () => {
        render(<NewSchedulingForm />);
        
        await waitFor(() => expect(clientApi.get).toHaveBeenCalledWith('/assignments'));

        const assignmentSelectTrigger = screen.getByText('Selecione o serviço');
        fireEvent.click(assignmentSelectTrigger);

        const assignmentOption = await screen.findByText(mockAssignments[0].name);
        fireEvent.click(assignmentOption);

        expect(await screen.findByText(mockAssignments[0].name, { selector: 'button span' })).toBeInTheDocument();
    });

    it('should display "Nenhum serviço foi criado" message if API returns no assignments', async () => {
        (clientApi.get as jest.Mock).mockImplementation((url) => {
            if (url === '/assignments') {
                return Promise.resolve({ data: [] }); // Simula nenhum serviço
            }
            return Promise.resolve({ data: [] });
        });

        render(<NewSchedulingForm />);

        await waitFor(() => expect(clientApi.get).toHaveBeenCalledWith('/assignments'));
        
        const assignmentSelectTrigger = screen.getByText('Selecione o serviço');
        fireEvent.click(assignmentSelectTrigger);

        expect(await screen.findByText(/Nenhum serviço foi criado/i)).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/dashboard/assignments/new');
    });
})