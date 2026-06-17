import { MdNavigateNext } from "react-icons/md";

export default function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div>
      <MdNavigateNext
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
