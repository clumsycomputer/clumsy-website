import { DocumentContentSection } from "../../../common/Document/DocumentContentSection";

export interface SoftwareProjectSectionProps {
  projectName: string;
  repositoryHref: string;
  packageHref: string;
  projectDescription: string;
  projectRoadmap: Array<string>;
  projectTech: Array<string>;
}

export function SoftwareProjectSection(props: SoftwareProjectSectionProps) {
  const {
    projectName,
    repositoryHref,
    packageHref,
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
          label: "repository",
          linkHref: repositoryHref,
        },
        {
          variant: "link",
          label: "package",
          linkHref: packageHref,
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
