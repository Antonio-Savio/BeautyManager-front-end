import { Form } from "@/app/signup/components/form";
import { fireEvent, render, screen, waitFor } from "@/components/test-utils";
import { clientApi } from "@/services/api";

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: jest.fn(),
        push: mockPush, 
    }),
}));

jest.mock('@/services/api', () => ({
    clientApi: {
        post: jest.fn(),
    },
}));

describe("Signup form component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should update states correctly', () => {
        render(<Form/>)

        const nameInput = screen.getByPlaceholderText('Nome do salão de beleza')
        const emailInput = screen.getByPlaceholderText('Digite seu e-mail')
        const passwordInput = screen.getByPlaceholderText('Digite sua senha')

        fireEvent.change(nameInput, { target: { value: 'Salão Exemplo' } })
        fireEvent.change(emailInput, { target: { value: 'salao@exemplo.com' } })
        fireEvent.change(passwordInput, { target: { value: 'senha123' } })

        expect(nameInput).toHaveValue('Salão Exemplo')
        expect(emailInput).toHaveValue('salao@exemplo.com')
        expect(passwordInput).toHaveValue('senha123')
    })

    it('should call API with /users route and redirect to /login on submitting the form successfully', async () => {
        (clientApi.post as jest.Mock).mockResolvedValueOnce({ data: { message: 'User created' } });
        
        render(<Form/>)

        const nameInput = screen.getByPlaceholderText('Nome do salão de beleza')
        const emailInput = screen.getByPlaceholderText('Digite seu e-mail')
        const passwordInput = screen.getByPlaceholderText('Digite sua senha')
        const button = screen.getByText('Cadastrar')

        const testData = {
            name: 'Salão Exemplo',
            email: 'salao@exemplo.com',
            password: 'senha123'
        };

        fireEvent.change(nameInput, { target: { value: testData.name } });
        fireEvent.change(emailInput, { target: { value: testData.email } });
        fireEvent.change(passwordInput, { target: { value: testData.password } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(clientApi.post).toHaveBeenCalledTimes(1);
            expect(clientApi.post).toHaveBeenLastCalledWith('/users', {
                name: testData.name,
                email: testData.email,
                password: testData.password
            })
        })

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledTimes(1);
            expect(mockPush).toHaveBeenCalledWith("/login");
        });
    })

    it('should not call API or redirect if fields are empty', async () => {
        render(<Form/>);

        const button = screen.getByText('Cadastrar');
        fireEvent.click(button);

        const nameInput = screen.getByPlaceholderText('Nome do salão de beleza');
        expect(nameInput).toHaveValue('');

        await waitFor(() => {
            expect(clientApi.post).not.toHaveBeenCalled();
            expect(mockPush).not.toHaveBeenCalled();
        });
    })
})