import Head from "next/head";
import { Fragment, PropsWithChildren } from "react";
import pageStyles from "./Page.module.scss";

export type PageProps = PropsWithChildren<{
  accessibilityLabel: string;
  pageContentContainerClassname: string;
  pageTabTitle: string;
  pageDescription: string;
}>;

export function Page(props: PageProps) {
  const {
    pageTabTitle,
    pageDescription,
    pageContentContainerClassname,
    accessibilityLabel,
    children,
  } = props;
  return (
    <Fragment>
      <Head>
        <title>{pageTabTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <div role={"presentation"} className={pageStyles.pageContainer}>
        <div
          role={"main"}
          className={`${pageContentContainerClassname} ${pageStyles.contentContainerBase}`}
        >
          <div role={"header"} aria-level={1} className={pageStyles.mainHeader}>
            {accessibilityLabel}
          </div>
          {children}
        </div>
      </div>
    </Fragment>
  );
}
