import { metadata } from "@/app/login/page";
import Login from "@/app/login/page";
import { render, screen } from "@/components/test-utils";

describe("Login page", () => {
    it('should have specific metadata', () => {
        expect(metadata.title).toMatch(/login/i)
        expect(metadata.description).toMatch(/faça seu login/i)
    })

    it('should render main structure correctly', () => {
        render(<Login/>)

        expect(screen.getByAltText('Logo do BeautyManager')).toBeInTheDocument();
        expect(screen.getByRole('form')).toBeInTheDocument();
    })
})