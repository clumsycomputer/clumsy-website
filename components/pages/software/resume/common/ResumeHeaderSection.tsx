import { Fragment, ReactNode } from "react";
import { DocumentSectionBase } from "../../../../common/Document/DocumentSectionBase";
import { DocumentSectionContent } from "../../../../common/Document/DocumentSectionContent";

export interface ResumeHeaderSectionProps {
  fullName: string;
  emailAddress: string;
  briefText: ReactNode;
  statusText: ReactNode;
  goalText: ReactNode;
  motivationsText: ReactNode;
}

export function ResumeHeaderSection(props: ResumeHeaderSectionProps) {
  const {
    fullName,
    emailAddress,
    briefText,
    statusText,
    goalText,
    motivationsText,
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
            accessibilityLabel={`career goal: ${fullName}`}
            contentType={"text"}
            contentLabel={"goal"}
            textContent={goalText}
          />
          <DocumentSectionContent
            accessibilityLabel={`career motivations: ${fullName}`}
            contentType={"text"}
            contentLabel={"motivations"}
            textContent={motivationsText}
          />
        </Fragment>
      }
    />
  );
}
