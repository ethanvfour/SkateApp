export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
      {/* No Header, no Footer - just the auth pages */}
    </div>
  );
}