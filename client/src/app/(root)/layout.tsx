import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClinicSathi",
  description:
    "ClinicSathi is a doctor appointment system with preditction of diseases and give recommendation of doctors to patients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
          {children}
      </body>
    </html>
  );
}
