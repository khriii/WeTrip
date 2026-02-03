interface StopsContainerProps {
  children?: React.ReactNode;
}

const StopContainer: React.FC<StopsContainerProps> = ({
  children,
}) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {children}
    </div>
  );
}

export default StopContainer
