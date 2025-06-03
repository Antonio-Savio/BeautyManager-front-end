import { Form } from "@/app/login/components/form";
import { fireEvent, render, screen, waitFor } from "@/components/test-utils";
import { useAuthContext } from "@/context/AuthContext";

jest.mock('@/context/AuthContext', () => ({
    useAuthContext: jest.fn(() => ({
        signIn: jest.fn(),
        user: undefined,
        isAuthenticated: false
    })),
    AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

describe('Login form component', () => {
    const mockSignIn = jest.fn();
    beforeEach(() => {
        (useAuthContext as jest.Mock).mockImplementation(() => ({
            signIn: mockSignIn,
            user: undefined,
            isAuthenticated: false
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update states filling the input fields', () => {
        render(<Form />)
        
        const emailInput = screen.getByPlaceholderText('Digite seu e-mail')
        const passwordInput = screen.getByPlaceholderText('Digite sua senha')

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        fireEvent.change(passwordInput, { target: { value: 'senha123' } })

        expect(emailInput).toHaveValue('test@example.com')
        expect(passwordInput).toHaveValue('senha123')
    })

    it('should call signIn method with credencials', async () => {
        render(<Form />)
        
        fireEvent.change(screen.getByPlaceholderText('Digite seu e-mail'), { 
            target: { value: 'cliente@salão.com' } 
        })
        fireEvent.change(screen.getByPlaceholderText('Digite sua senha'), { 
            target: { value: 'senhaSegura' } 
        })
        fireEvent.click(screen.getByText('Acessar'))

        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith({
                email: 'cliente@salão.com',
                password: 'senhaSegura'
            })
        })
    })
})