import { InputHTMLAttributes } from "react";
import styles from "./SearchQueryInput.module.scss";

export interface SearchQueryInputProps {
  value: string;
  onChange: InputHTMLAttributes<HTMLInputElement>["onChange"];
  clearSearchQuery: () => void;
}

export function SearchQueryInput(props: SearchQueryInputProps) {
  const { value, onChange, clearSearchQuery } = props;
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.searchInput}
        type={"text"}
        placeholder={"search music"}
        value={value}
        onChange={onChange}
      />
      <div className={styles.clearSearchContainer}>
        <svg
          className={styles.clearSearchButton}
          viewBox={"0 0 1 1"}
          onClick={clearSearchQuery}
        >
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
        </svg>
      </div>
    </div>
  );
}
