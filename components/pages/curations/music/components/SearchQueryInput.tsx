import { InputHTMLAttributes } from "react";

export interface SearchQueryInputProps {
  value: string;
  onChange: InputHTMLAttributes<HTMLInputElement>["onChange"];
  clearSearchQuery: () => void;
}

export function SearchQueryInput(props: SearchQueryInputProps) {
  const { value, onChange, clearSearchQuery } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderColor: "black",
        borderStyle: "solid",
        borderRadius: 3,
        borderWidth: 1.5,
        paddingBlock: 1,
        paddingInline: 4,
        paddingInlineEnd: 2,
      }}
    >
      <input
        type={"text"}
        style={{
          flexGrow: 1,
          border: "none",
          outline: "none",
          padding: 0,
          fontFamily: "monospace",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: 18,
        }}
        placeholder={"search music"}
        value={value}
        onChange={onChange}
      />
      <svg
        width={18}
        height={18}
        viewBox={"0 0 1 1"}
        style={{ paddingLeft: 8, cursor: "pointer" }}
        onClick={clearSearchQuery}
      >
        <g transform={"translate(0.0,0)"}>
          <circle
            cx={0.5}
            cy={0.5}
            r={0.35}
            stroke={"black"}
            strokeWidth={0.07}
            strokeLinejoin={"round"}
            strokeLinecap={"round"}
            fill={"white"}
          />
          <polygon
            points={
              "0.5,0.5 0.625,0.375, 0.5,0.5 0.625,0.625 0.5,0.5, 0.375,0.625 0.5,0.5, 0.375,0.375 0.5,0.5"
            }
            stroke={"black"}
            strokeWidth={0.07}
            strokeLinejoin={"round"}
            fill={"white"}
          />
        </g>
      </svg>
    </div>
  );
}
