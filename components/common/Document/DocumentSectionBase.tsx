import { ReactNode } from "react";
import documentSectionBaseStyles from "./documentSectionBase.module.scss";

export interface DocumentSectionBaseProps {
  sectionDivider: ReactNode;
  accessibilityLabel: string;
  headerLabels: HeaderLabelProps[];
  bodyContent: ReactNode;
}

export function DocumentSectionBase(props: DocumentSectionBaseProps) {
  const { sectionDivider, accessibilityLabel, headerLabels, bodyContent } =
    props;
  return (
    <div role={"none"} className={documentSectionBaseStyles.sectionContainer}>
      {sectionDivider}
      <div
        role={"region"}
        aria-label={accessibilityLabel}
        className={documentSectionBaseStyles.contentContainer}
      >
        <div
          role={"header"}
          aria-level={2}
          className={documentSectionBaseStyles.accessibilityHeader}
        >
          {accessibilityLabel}
        </div>
        <div
          role={"list"}
          className={documentSectionBaseStyles.headerContainer}
        >
          {headerLabels.map((someHeaderLabel) => (
            <div
              role={"listitem"}
              className={documentSectionBaseStyles.labelContainer}
              key={someHeaderLabel.label}
            >
              <HeaderLabel {...someHeaderLabel} />
            </div>
          ))}
        </div>
        <div
          role={"presentation"}
          className={documentSectionBaseStyles.bodyContainer}
        >
          <div
            role={"group"}
            className={documentSectionBaseStyles.bodyContentContainer}
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
        <div className={documentSectionBaseStyles.headerLabel}>
          {props.label}
        </div>
      );
    case "link":
      return (
        <a
          className={documentSectionBaseStyles.headerLabel}
          href={props.linkHref}
        >
          {props.label}
        </a>
      );
  }
}
