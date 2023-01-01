import { Fragment, ReactNode } from "react";
import { DocumentSectionBase } from "../../../../common/Document/DocumentSectionBase";
import { DocumentSectionContent } from "../../../../common/Document/DocumentSectionContent";

export interface ResumeHeaderSectionProps {
  fullName: string;
  emailAddress: string;
  briefText: ReactNode;
  statusText: ReactNode;
  shortTermGoalText: ReactNode;
  longTermGoalText: ReactNode;
}

export function ResumeHeaderSection(props: ResumeHeaderSectionProps) {
  const {
    fullName,
    emailAddress,
    briefText,
    statusText,
    shortTermGoalText,
    longTermGoalText,
  } = props;
  return (
    <DocumentSectionBase
      sectionDivider={null}
      accessibilityLabel={`career overview: ${fullName}`}
      headerLabels={[
        {
          variant: "text",
          label: fullName,
        },
        {
          variant: "link",
          label: emailAddress,
          linkHref: `mailto:${emailAddress}`,
        },
      ]}
      bodyContent={
        <Fragment>
          <DocumentSectionContent
            accessibilityLabel={`career brief: ${fullName}`}
            contentType={"text"}
            contentLabel={"brief"}
            textContent={briefText}
          />
          <DocumentSectionContent
            accessibilityLabel={`career status: ${fullName}`}
            contentType={"text"}
            contentLabel={"status"}
            textContent={statusText}
          />
          <DocumentSectionContent
            accessibilityLabel={`short-term career goal: ${fullName}`}
            contentType={"text"}
            contentLabel={"short-term goal"}
            textContent={shortTermGoalText}
          />
          <DocumentSectionContent
            accessibilityLabel={`long-term career goal: ${fullName}`}
            contentType={"text"}
            contentLabel={"long-term goal"}
            textContent={longTermGoalText}
          />
        </Fragment>
      }
    />
  );
}
