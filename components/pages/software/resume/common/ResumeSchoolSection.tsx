import { DocumentContentSection } from "../../../../common/Document/DocumentContentSection";

export interface ResumeSchoolSectionProps {
  schoolName: string;
  programName: string;
  dateRange: string;
  programDescription: string;
  techStack: string[];
}

export function ResumeSchoolSection(props: ResumeSchoolSectionProps) {
  const { schoolName, programName, dateRange, programDescription, techStack } =
    props;
  return (
    <DocumentContentSection
      accessibilityLabel={`school: ${schoolName} - ${programName}`}
      headerLabels={[
        {
          variant: "text",
          label: schoolName,
        },
        {
          variant: "text",
          label: programName,
        },
        {
          variant: "text",
          label: "student",
        },
        {
          variant: "text",
          label: dateRange,
        },
      ]}
      bodyContents={[
        {
          accessibilityLabel: `program description: ${schoolName} - ${programName}: `,
          contentType: "text",
          contentLabel: "description",
          textContent: programDescription,
        },
        {
          accessibilityLabel: `technology used: ${schoolName} - ${programName}`,
          contentType: "wrapList",
          contentLabel: "tech",
          listItems: techStack,
        },
      ]}
    />
  );
}
