import { SectionDivider } from "../../../common/SectionDivider/SectionDivider";
import { ResumeSectionBase, ResumeSectionBaseProps } from "./ResumeSectionBase";
import { SectionContent, SectionContentProps } from "./SectionContent";

export interface ContentsSectionProps
  extends Pick<ResumeSectionBaseProps, "accessibilityLabel" | "headerLabels"> {
  bodyContents: SectionContentProps[];
}

export function ContentsSection(props: ContentsSectionProps) {
  const { accessibilityLabel, headerLabels, bodyContents } = props;
  return (
    <ResumeSectionBase
      sectionDivider={<SectionDivider />}
      accessibilityLabel={accessibilityLabel}
      headerLabels={headerLabels}
      bodyContent={bodyContents.map((contentProps) => (
        <SectionContent key={contentProps.contentLabel} {...contentProps} />
      ))}
    />
  );
}
