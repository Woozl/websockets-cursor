interface CursorProps {
  x: number;
  y: number;
  color?: string;
}

const Cursor = ({ x, y, color = "black" }: CursorProps) => {
  return (
    <svg
      className="cursor"
      style={{
        transform: `translate(${x || 0}px, ${y || 0}px)`,
        position: "absolute",
        left: "0px",
        top: "0px",
      }}
      fill={color}
      viewBox="0 0 16.3 24.7"
      width="16.3"
      height="24.7"
    >
      <path
        transform="scale(0.7)"
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M15.6 15.6L.6.6v20.5l4.6-4.5 3.2 7.5 3.4-1.3-3-7.2z"
      />
    </svg>
  );
};

export default Cursor;
