import Dashboard from "@/app/dashboard/page";
import { serverApi } from "@/services/serverApi";
import { render, screen } from "@/components/test-utils";

jest.mock('@/services/serverApi')

const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
const futureDate = new Date(new Date().setDate(new Date().getDate() + 5))

const mockSchedulings = [
  {
    id: '1',
    finished: false,
    time: tomorrow,
    assignment: { name: 'Corte' },
    customer: { name: 'Cliente 1' }
  },
  {
    id: '2',
    finished: false,
    time: new Date(),
    assignment: { name: 'Coloração' },
    customer: { name: 'Cliente 2' }
  },
  {
    id: '3',
    finished: false,
    time: futureDate,
    assignment: { name: 'Manicure' },
    customer: { name: 'Cliente 3' }
  }
]

describe('Dashboard page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should have a title and button for new scheduling, and handle empty data', async () => {
        const mockApiGet = jest.fn().mockResolvedValue({ data: [] });
        (serverApi as jest.Mock).mockResolvedValue({ get: mockApiGet })

        render(await Dashboard())

        expect(screen.getByText('Agendamentos')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Novo Agendamento/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Novo Agendamento/i })).toHaveAttribute('href', '/dashboard/new')
        expect(screen.getByText('Nenhum agendamento cadastrado')).toBeInTheDocument();
        expect(screen.queryByText('Hoje')).not.toBeInTheDocument();
        expect(mockApiGet).toHaveBeenCalledTimes(1);
        expect(mockApiGet).toHaveBeenCalledWith("/schedule");
    })

    it('should have categories by date', async () => {
        const mockApiGet = jest.fn().mockResolvedValue({ data: mockSchedulings });
        (serverApi as jest.Mock).mockResolvedValue({ get: mockApiGet });

        render(await Dashboard())

        const dateRegex = /^(Seg|Ter|Qua|Qui|Sex|Sáb|Dom)\.,\s(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/;

        expect(screen.getByText('Hoje')).toBeInTheDocument();
        expect(screen.getByText('Amanhã')).toBeInTheDocument();
        expect(screen.getByText('Datas futuras')).toBeInTheDocument();
        expect(screen.getByText(dateRegex)).toBeInTheDocument();
    })
})