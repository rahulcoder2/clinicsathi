

export default function HospitalDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <main className="w-full">
        {children}
      </main>

  );
}
