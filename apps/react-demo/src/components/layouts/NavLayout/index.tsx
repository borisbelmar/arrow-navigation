import SidebarMenu from './components/SidebarMenu'
import BaseLayout from '../BaseLayout'

interface NavLayoutProps {
  children: React.ReactNode
}

export default function NavLayout({ children }: NavLayoutProps) {
  return (
    <BaseLayout>
      <SidebarMenu />
      <div className="flex flex-col ml-24 w-full overflow-hidden">
        {children}
      </div>
    </BaseLayout>
  )
}

