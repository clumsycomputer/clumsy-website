import { DocumentContentSection } from "../../../../common/Document/DocumentContentSection";

export interface SoftwareProjectSectionProps {
  projectName: string;
  githubHref: string;
  npmHref: string;
  projectDescription: string;
  projectRoadmap: Array<string>;
  projectTech: Array<string>;
}

export function SoftwareProjectSection(props: SoftwareProjectSectionProps) {
  const {
    projectName,
    githubHref,
    npmHref,
    projectDescription,
    projectRoadmap,
    projectTech,
  } = props;
  return (
    <DocumentContentSection
      accessibilityLabel={`project: ${projectName}`}
      headerLabels={[
        {
          variant: "text",
          label: projectName,
        },
        {
          variant: "link",
          label: "github",
          linkHref: githubHref,
        },
        {
          variant: "link",
          label: "npm",
          linkHref: npmHref,
        },
      ]}
      bodyContents={[
        {
          accessibilityLabel: `project description: ${projectName}`,
          contentType: "text",
          contentLabel: "description",
          textContent: projectDescription,
        },
        {
          accessibilityLabel: `project roadmap: ${projectName}`,
          contentType: "columnList",
          contentLabel: "roadmap",
          listItems: projectRoadmap,
        },
        {
          accessibilityLabel: `technology used: ${projectName}`,
          contentType: "wrapList",
          contentLabel: "tech",
          listItems: projectTech,
        },
      ]}
    />
  );
}
