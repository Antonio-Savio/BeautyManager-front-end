import { render, screen } from '@/components/test-utils'
import InitialPage from '../../src/app/page'

describe('Initial Page', () => {
    it('should render links', () => {
        render(<InitialPage/>)

        const links = screen.getAllByRole('link')
        
        expect(links.length).toBe(2)
    })

    it('should have the correct href in the links', () => {
        render(<InitialPage/>)

        const loginLink = screen.getByRole('link', { name: /login/i });
        const signupLink = screen.getByRole('link', { name: /cadastre-se/i });

        expect(loginLink).toHaveAttribute('href', '/login');
        expect(signupLink).toHaveAttribute('href', '/signup');
    })
})