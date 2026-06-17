import { MdNavigateBefore } from "react-icons/md";

export default function PrevArrow(props: any) {
  const { className, style, onClick } = props;

  return (
    <div>
      <MdNavigateBefore
        className={`${className} text-brand-emerald-500 text-4xl`}
        onClick={onClick}
        style={{
          ...style,
          display: "block",
          color: "green",
          width: "50px",
          height: "50px",
          fontSize: "50px",
        }}
      />
    </div>
  );
}
