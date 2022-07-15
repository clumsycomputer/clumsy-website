import { ReactNode } from "react";
import resumeSectionBaseStyles from "./ResumeSectionBase.module.scss";

export interface ResumeSectionBaseProps {
  sectionDivider: ReactNode;
  accessibilityLabel: string;
  headerLabels: HeaderLabelProps[];
  bodyContent: ReactNode;
}

export function ResumeSectionBase(props: ResumeSectionBaseProps) {
  const { sectionDivider, accessibilityLabel, headerLabels, bodyContent } =
    props;
  return (
    <div role={"none"} className={resumeSectionBaseStyles.sectionContainer}>
      {sectionDivider}
      <div
        role={"region"}
        aria-label={accessibilityLabel}
        className={resumeSectionBaseStyles.contentContainer}
      >
        <div
          role={"header"}
          aria-level={2}
          className={resumeSectionBaseStyles.accessibilityHeader}
        >
          {accessibilityLabel}
        </div>
        <div role={"list"} className={resumeSectionBaseStyles.headerContainer}>
          {headerLabels.map((someHeaderLabel) => (
            <div
              role={"listitem"}
              className={resumeSectionBaseStyles.labelContainer}
              key={someHeaderLabel.label}
            >
              <HeaderLabel {...someHeaderLabel} />
            </div>
          ))}
        </div>
        <div
          role={"presentation"}
          className={resumeSectionBaseStyles.bodyContainer}
        >
          <div
            role={"group"}
            className={resumeSectionBaseStyles.bodyContentContainer}
          >
            {bodyContent}
          </div>
        </div>
      </div>
    </div>
  );
}

type HeaderLabelProps = TextHeaderLabelProps | LinkHeaderLabelProps;

interface TextHeaderLabelProps extends HeaderLabelBaseProps<"text"> {}

interface LinkHeaderLabelProps extends HeaderLabelBaseProps<"link"> {
  linkHref: string;
}

interface HeaderLabelBaseProps<SomeVariant extends string> {
  variant: SomeVariant;
  label: string;
}

function HeaderLabel(props: HeaderLabelProps) {
  switch (props.variant) {
    case "text":
      return (
        <div className={resumeSectionBaseStyles.headerLabel}>{props.label}</div>
      );
    case "link":
      return (
        <a
          className={resumeSectionBaseStyles.headerLabel}
          href={props.linkHref}
        >
          {props.label}
        </a>
      );
  }
}
