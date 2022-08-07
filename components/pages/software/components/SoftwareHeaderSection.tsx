import { DocumentSectionBase } from "../../../common/Document/DocumentSectionBase";
import { DocumentSectionContent } from "../../../common/Document/DocumentSectionContent";

export interface SoftwareHeaderSectionProps {
  githubHref: string;
  fullName: string;
  pageTitle: string;
  softwareOverview: string;
}

export function SoftwareHeaderSection(props: SoftwareHeaderSectionProps) {
  const { fullName, pageTitle, githubHref, softwareOverview } = props;
  return (
    <DocumentSectionBase
      sectionDivider={null}
      accessibilityLabel={`${pageTitle}: ${fullName}`}
      headerLabels={[
        {
          variant: "text",
          label: pageTitle,
        },
        {
          variant: "link",
          label: "github",
          linkHref: githubHref,
        },
      ]}
      bodyContent={
        <DocumentSectionContent
          accessibilityLabel={`software overview: ${fullName}`}
          contentType={"text"}
          contentLabel={"overview"}
          textContent={softwareOverview}
        />
      }
    />
  );
}
