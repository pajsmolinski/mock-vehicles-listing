interface ColorIconProps {
  color: string;
}

export const ColorIcon: React.FC<ColorIconProps> = ({ color }) => {
  return (
    <span
      className="inline-block w-5 h-5 rounded-full mr-2"
      style={{ backgroundColor: color.toLowerCase() }}
    ></span>
  );
};
