import PageTransitionLoading from "@/_components/PageTransitionLoading";

export default function StorefrontTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PageTransitionLoading />
      {children}
    </>
  );
}
