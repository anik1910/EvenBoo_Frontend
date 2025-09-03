export const metadata = {
  title: "Dashboard | EvenBoo",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No Header or Footer here
  return <>{children}</>;
}
