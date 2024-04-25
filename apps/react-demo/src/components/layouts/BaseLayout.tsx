interface BaseLayoutProps {
  children: React.ReactNode
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <main className="flex bg-gray-700 text-white h-screen w-screen overflow-hidden">
      {children}
    </main>
  )
}
