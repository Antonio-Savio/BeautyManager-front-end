import NewScheduling from '@/app/dashboard/new/page'
import { screen, render } from '@/components/test-utils'

describe('New scheduling page', () => {
    it('should render main elements', () => {
        render(<NewScheduling />);

        expect(screen.getByRole('link', { name: 'Voltar' })).toHaveAttribute('href', '/dashboard');
        expect(screen.getByText('Novo Agendamento')).toBeInTheDocument();
        expect(screen.getByLabelText('Formulário de novo agendamento')).toBeInTheDocument();
    })
})