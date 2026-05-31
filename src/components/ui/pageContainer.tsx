interface PageContainerProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  footer,
}) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center pt-12 md:pt-32 pb-12 px-1 sm:items-start space-y-4">
        {children}
      </main>
      {footer}
    </div>
  );
};
