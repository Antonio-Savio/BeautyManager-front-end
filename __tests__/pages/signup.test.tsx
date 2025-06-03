import { metadata } from "@/app/signup/page";
import Signup from "@/app/signup/page";
import { render, screen } from "@/components/test-utils";

describe("Signup page", () => {
    it('should have specific metadata', () => {
        expect(metadata.title).toMatch(/cadastro/i)
        expect(metadata.description).toMatch(/faça seu cadastro/i)
    })

    it('should render main structure correctly', () => {
        render(<Signup/>)

        expect(screen.getByAltText('Logo do BeautyManager')).toBeInTheDocument();
        expect(screen.getByRole('form')).toBeInTheDocument();
    })
})