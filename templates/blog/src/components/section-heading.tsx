export default function SectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl py-4">
      {children}
    </h2>
  );
}
