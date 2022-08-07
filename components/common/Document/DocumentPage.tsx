import { Page, PageProps } from "../Page/Page";
import documentPageStyles from "./DocumentPage.module.scss";

export interface DocumentPageProps
  extends Pick<
    PageProps,
    "accessibilityLabel" | "pageTabTitle" | "pageDescription" | "children"
  > {}

export function DocumentPage(props: DocumentPageProps) {
  const { accessibilityLabel, pageTabTitle, pageDescription, children } = props;
  return (
    <Page
      accessibilityLabel={accessibilityLabel}
      pageTabTitle={pageTabTitle}
      pageDescription={pageDescription}
      pageContentContainerClassname={documentPageStyles.pageContentContainer}
    >
      {children}
    </Page>
  );
}
