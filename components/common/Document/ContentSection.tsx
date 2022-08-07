import { SectionDivider } from "../SectionDivider/SectionDivider";
import {
  DocumentSectionBase,
  DocumentSectionBaseProps,
} from "./DocumentSectionBase";
import { SectionContent, SectionContentProps } from "./SectionContent";

export interface ContentsSectionProps
  extends Pick<
    DocumentSectionBaseProps,
    "accessibilityLabel" | "headerLabels"
  > {
  bodyContents: SectionContentProps[];
}

export function ContentsSection(props: ContentsSectionProps) {
  const { accessibilityLabel, headerLabels, bodyContents } = props;
  return (
    <DocumentSectionBase
      sectionDivider={<SectionDivider />}
      accessibilityLabel={accessibilityLabel}
      headerLabels={headerLabels}
      bodyContent={bodyContents.map((contentProps) => (
        <SectionContent key={contentProps.contentLabel} {...contentProps} />
      ))}
    />
  );
}
