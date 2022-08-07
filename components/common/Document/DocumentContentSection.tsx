import { SectionDivider } from "../SectionDivider/SectionDivider";
import {
  DocumentSectionBase,
  DocumentSectionBaseProps,
} from "./DocumentSectionBase";
import {
  DocumentSectionContent,
  DocumentSectionContentProps,
} from "./DocumentSectionContent";

export interface DocumentContentSectionProps
  extends Pick<
    DocumentSectionBaseProps,
    "accessibilityLabel" | "headerLabels"
  > {
  bodyContents: DocumentSectionContentProps[];
}

export function DocumentContentSection(props: DocumentContentSectionProps) {
  const { accessibilityLabel, headerLabels, bodyContents } = props;
  return (
    <DocumentSectionBase
      sectionDivider={<SectionDivider />}
      accessibilityLabel={accessibilityLabel}
      headerLabels={headerLabels}
      bodyContent={bodyContents.map((contentProps) => (
        <DocumentSectionContent
          key={contentProps.contentLabel}
          {...contentProps}
        />
      ))}
    />
  );
}
