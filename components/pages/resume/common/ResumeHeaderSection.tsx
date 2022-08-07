import { Fragment, ReactNode } from "react";
import { DocumentSectionBase } from "../../../common/Document/DocumentSectionBase";
import { DocumentSectionContent } from "../../../common/Document/DocumentSectionContent";

export interface ResumeHeaderSectionProps {
  fullName: string;
  emailAddress: string;
  briefText: string;
  statusText: ReactNode;
}

export function ResumeHeaderSection(props: ResumeHeaderSectionProps) {
  const { fullName, emailAddress, briefText, statusText } = props;
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
        </Fragment>
      }
    />
  );
}
