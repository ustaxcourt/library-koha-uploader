export function Button({
  children,
  onClick,
  isActive = true,
  isDisabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  isDisabled?: boolean;
  isActive?: boolean;
}) {
  return (
    <button
      className={`font-bold py-2 px-4 rounded ${
        isDisabled
          ? "opacity-45 bg-blue-500 text-white cursor-not-allowed"
          : isActive
          ? "bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
          : "opacity-65 bg-gray-500 text-white hover:bg-blue-700 cursor-pointer hover:opacity-100"
      }`}
      {...{ onClick }}
    >
      {children}
    </button>
  );
}
