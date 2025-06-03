import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuthContext, signOut } from '@/context/AuthContext';
import { clientApi } from '@/services/api';
import Cookies from 'js-cookie';
import Router from 'next/router';

const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: mockReplace,
        push: jest.fn(), 
    }),
}));

jest.mock('next/router', () => ({
    replace: jest.fn(),
}))

jest.mock('@/services/api', () => ({
    clientApi: {
        post: jest.fn(),
    },
}));

jest.mock('js-cookie', () => ({
    set: jest.fn(),
    remove: jest.fn(),
}));

describe('AuthContext', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('signIn should call the API, set cookies and navigate to /dashboard on success', async () => {
        const mockUserData = {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            token: 'fake-token',
        };
        (clientApi.post as jest.Mock).mockResolvedValueOnce({ data: mockUserData });

        const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;
        const { result } = renderHook(() => useAuthContext(), { wrapper });

        await act(async () => {
            await result.current.signIn({ email: 'test@example.com', password: 'password' });
        });

        expect(clientApi.post).toHaveBeenCalledWith('/session', {
            email: 'test@example.com',
            password: 'password',
        });
        expect(Cookies.set).toHaveBeenCalledWith('beauty-token', 'fake-token', {
            path: '/',
            expires: 30,
        });
        expect(result.current.user).toEqual(mockUserData);
        expect(result.current.isAuthenticated).toBe(true);
        expect(mockReplace).toHaveBeenCalledWith('/dashboard');
    });

    it('should lose auth token and redirect to /login on signOut', () => {
        signOut();

        expect(Cookies.remove).toHaveBeenLastCalledWith('beauty-token', { path: '/' })
        expect(Router.replace).toHaveBeenCalledWith('/login')
    })
});