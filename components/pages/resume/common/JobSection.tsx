import { ContentsSection } from "../../../common/Document/ContentSection";

export interface JobSectionProps {
  companyName: string;
  teamName: string;
  jobTitle: string;
  dateRange: string;
  productDescription: string;
  workResponsibilities: string[];
  techStack: string[];
}

export function JobSection(props: JobSectionProps) {
  const {
    companyName,
    teamName,
    jobTitle,
    dateRange,
    productDescription,
    workResponsibilities,
    techStack,
  } = props;
  return (
    <ContentsSection
      accessibilityLabel={`job: ${companyName} - ${jobTitle}`}
      headerLabels={[
        {
          variant: "text",
          label: companyName,
        },
        {
          variant: "text",
          label: teamName,
        },
        {
          variant: "text",
          label: jobTitle,
        },
        {
          variant: "text",
          label: dateRange,
        },
      ]}
      bodyContents={[
        {
          accessibilityLabel: `product description: ${companyName} - ${jobTitle}`,
          contentType: "text",
          contentLabel: "product",
          textContent: productDescription,
        },
        {
          accessibilityLabel: `job responsibilities: ${companyName} - ${jobTitle}`,
          contentType: "columnList",
          contentLabel: "responsibilities",
          listItems: workResponsibilities,
        },
        {
          accessibilityLabel: `technology used: ${companyName} - ${jobTitle}`,
          contentType: "wrapList",
          contentLabel: "tech",
          listItems: techStack,
        },
      ]}
    />
  );
}
