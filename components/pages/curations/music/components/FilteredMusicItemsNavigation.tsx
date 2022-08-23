import Link from "next/link";
import { ReactNode } from "react";
import styles from "./FilteredMusicItemsNavigation.module.scss";

export interface FilteredMusicItemsNavigationProps {
  filteredMusicItemsPageCount: number;
  filteredMusicItemsPageIndex: number;
  previousPageLink: ReactNode;
  nextPageLink: ReactNode;
}

export function FilteredMusicItemsNavigation(
  props: FilteredMusicItemsNavigationProps
) {
  const {
    previousPageLink,
    filteredMusicItemsPageIndex,
    filteredMusicItemsPageCount,
    nextPageLink,
  } = props;

  return (
    <div
      className={styles.dataPageNavigationContainer}
      role={"navigation"}
      aria-label={"filtered music items page navigation"}
    >
      {previousPageLink}
      <div className={styles.focusedDataPageIndexDisplayContainer}>
        <label
          className={styles.filteredMusicItemsPageLabel}
          id={"filteredMusicItemsPageLabel"}
        >
          filtered music items page:
        </label>
        <div
          className={styles.filteredMusicItemsPageText}
          role={"meter"}
          aria-valuemin={1}
          aria-valuemax={filteredMusicItemsPageCount}
          aria-valuenow={filteredMusicItemsPageIndex}
          aria-labelledby={"filteredMusicItemsPageLabel"}
        >
          {`${filteredMusicItemsPageIndex} / ${filteredMusicItemsPageCount}`}
        </div>
      </div>
      {nextPageLink}
    </div>
  );
}

export interface ActiveMusicItemsPageLinkProps extends MusicItemsPageBaseProps {
  dataPageHref: string;
}

export function ActiveMusicItemsPageLink(props: ActiveMusicItemsPageLinkProps) {
  const { dataPageHref, relativePageLinkLabel } = props;
  return (
    <Link href={dataPageHref}>
      <a className={styles.activeFilteredMusicItemsPageLink}>
        {relativePageLinkLabel}
      </a>
    </Link>
  );
}

export interface DisabledMusicItemsPageLinkProps
  extends MusicItemsPageBaseProps {}

export function DisabledMusicItemsPageLink(
  props: DisabledMusicItemsPageLinkProps
) {
  const { relativePageLinkLabel } = props;
  return (
    <a className={styles.disabledFilteredMusicItemsPageLink}>
      {relativePageLinkLabel}
    </a>
  );
}

interface MusicItemsPageBaseProps {
  relativePageLinkLabel: string;
}
