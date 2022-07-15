import sectionDividerStyles from "./SectionDivider.module.scss";

export function SectionDivider() {
  return (
    <div role={"separator"} className={sectionDividerStyles.sectionDivider} />
  );
}
