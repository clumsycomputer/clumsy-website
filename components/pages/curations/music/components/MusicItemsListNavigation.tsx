import Link from "next/link";
import { ReactNode } from "react";
import styles from "./MusicItemsListNavigation.module.scss";

export interface MusicItemsListNavigationProps {
  _pageIndex: number;
  pageCount: number;
  previousPageLink: ReactNode;
  nextPageLink: ReactNode;
}

export function MusicItemsListNavigation(props: MusicItemsListNavigationProps) {
  const { previousPageLink, _pageIndex, pageCount, nextPageLink } = props;

  return (
    <div
      className={styles.navigationContainer}
      role={"navigation"}
      aria-label={"music items list page navigation"}
    >
      {previousPageLink}
      <div className={styles.currentIndexContainer}>
        <label
          className={styles.currentIndexLabel}
          id={"musicItemsListPageLabel"}
        >
          music items list page:
        </label>
        <div
          className={styles.navigationText}
          role={"meter"}
          aria-valuemin={1}
          aria-valuemax={pageCount}
          aria-valuenow={_pageIndex}
          aria-labelledby={"musicItemsListPageLabel"}
        >
          {`${_pageIndex} / ${pageCount}`}
        </div>
      </div>
      {nextPageLink}
    </div>
  );
}

export interface ActiveMusicItemsListPageLinkProps
  extends MusicItemsListPageLinkPropsBase {
  dataPageHref: string;
}

export function ActiveMusicItemsListPageLink(
  props: ActiveMusicItemsListPageLinkProps
) {
  const { dataPageHref, linkLabel } = props;
  return (
    <Link href={dataPageHref}>
      <a className={styles.activeNavigationLink}>{linkLabel}</a>
    </Link>
  );
}

export interface DisabledMusicItemsListPageLinkProps
  extends MusicItemsListPageLinkPropsBase {}

export function DisabledMusicItemsListPageLink(
  props: DisabledMusicItemsListPageLinkProps
) {
  const { linkLabel } = props;
  return <div className={styles.disabledNavigationLink}>{linkLabel}</div>;
}

interface MusicItemsListPageLinkPropsBase {
  linkLabel: string;
}
