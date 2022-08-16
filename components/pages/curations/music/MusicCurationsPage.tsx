import { NextPage } from "next";
import { Page } from "../../../common/Page/Page";
import pageStyles from "./MusicCurationsPage.module.scss";
import Link from "next/link";
import { ReactNode } from "react";
import { NavigationFooter } from "../../../common/NavigationFooter/NavigationFooter";
import { musicItemsData } from "./musicItemsData";

export const MusicCurationsPage: NextPage = () => (
  <Page
    accessibilityLabel={"music curations"}
    pageTabTitle={"+ music - clumsycomputer"}
    pageDescription={"a catalog of awesome music"}
    pageContentContainerClassname={pageStyles.pageContentContainer}
  >
    <div className={pageStyles.musicItemsContainer}>
      {musicItemsData.map((someMusicItem) => {
        return (
          <div
            key={someMusicItem.itemId}
            className={pageStyles.musicItemContainer}
          >
            <div className={pageStyles.musicItemTopRowContainer}>
              <Link href={someMusicItem.externalLinks[0]!.linkHref}>
                <a
                  className={pageStyles.thumbnailLink}
                  rel={"noreferrer"}
                  target={"_blank"}
                >
                  <svg
                    className={pageStyles.thumbnailSvg}
                    viewBox={"0 0 100 100"}
                  >
                    <rect
                      x={0}
                      y={0}
                      width={100}
                      height={100}
                      rx={3}
                      ry={3}
                      fill={"rgb(241,241,241"}
                    />
                    <image
                      href={someMusicItem.thumbnailHref}
                      x={1}
                      y={1}
                      width={98}
                      height={98}
                      clipPath={"inset(0% round 2.5)"}
                    />
                  </svg>
                </a>
              </Link>
              <div className={pageStyles.externalLinksContainer}>
                {someMusicItem.externalLinks.map((someExternalLink) => {
                  return (
                    <Link
                      key={someExternalLink.linkLabel}
                      href={someExternalLink.linkHref}
                    >
                      <a
                        className={pageStyles.linkLabel}
                        rel={"noreferrer"}
                        target={"_blank"}
                      >
                        {someExternalLink.linkLabel}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className={pageStyles.musicItemLabelsContainer}>
              <MusicItemLabelList>
                <MusicItemLabel musicItemLabel={someMusicItem.musicName} />
              </MusicItemLabelList>
              <MusicItemLabelList>
                {someMusicItem.musicArtist.map((someMusicArtist) => (
                  <MusicItemLabel
                    key={someMusicArtist}
                    musicItemLabel={someMusicArtist}
                  />
                ))}
              </MusicItemLabelList>
              <MusicItemLabelList>
                <MusicItemLabel
                  musicItemLabel={`${someMusicItem.recordingStyle.join("/")} ${
                    someMusicItem.sourceType === "collection"
                      ? someMusicItem.collectionType
                      : someMusicItem.sourceType
                  }${someMusicItem.itemType === "clip" ? " (clip)" : ""}`}
                />
              </MusicItemLabelList>
              <MusicItemLabelList>
                {someMusicItem.musicTags.map((someMusicTag) => (
                  <MusicItemLabel
                    key={someMusicTag}
                    musicItemLabel={someMusicTag}
                  />
                ))}
              </MusicItemLabelList>
            </div>
          </div>
        );
      })}
    </div>
    <NavigationFooter
      routeLinks={[
        { routeName: "home", routeHref: "/" },
        { routeName: "software", routeHref: "/software" },
        { routeName: "resume", routeHref: "/resume" },
        { routeName: "graphics", routeHref: "/graphics" },
      ]}
      pdfLink={null}
    />
  </Page>
);

interface MusicItemLabelListProps {
  children: ReactNode;
}

function MusicItemLabelList(props: MusicItemLabelListProps) {
  const { children } = props;
  return <div className={pageStyles.musicItemLabelList}>{children}</div>;
}

interface MusicItemLabelProps {
  musicItemLabel: string;
}

function MusicItemLabel(props: MusicItemLabelProps) {
  const { musicItemLabel } = props;
  return (
    <div className={pageStyles.musicItemLabel}>
      {musicItemLabel.toLowerCase()}
    </div>
  );
}
