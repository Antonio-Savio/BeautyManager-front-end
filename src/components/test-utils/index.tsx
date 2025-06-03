import { RenderOptions, render } from '@testing-library/react'
import { ReactElement } from 'react'
import { Provider } from '@/components/ui/provider'
import { AuthProvider } from '@/context/AuthContext'

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <Provider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </Provider>
)

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }