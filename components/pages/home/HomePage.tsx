import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalNavigationFooter } from "../../common/NavigationFooter/NavigationFooter";
import { Page } from "../../common/Page/Page";
import homePageStyles from "./HomePage.module.scss";

export const HomePage: NextPage = () => {
  return (
    <Page
      accessibilityLabel={"home"}
      pageTabTitle={"clumsycomputer"}
      pageDescription={"a junction of shareables"}
      pageContentContainerClassname={homePageStyles.pageContentContainer}
    >
      <div role={"figure"} className={homePageStyles.landingImageContainer}>
        <Image
          className={homePageStyles.landingImage}
          src={"/graphics/gary.jpeg"}
          alt={"gary"}
          width={1024}
          height={1024}
        />
      </div>
      <div role={"list"} className={homePageStyles.routesContainer}>
        {[
          {
            prompt: "graphics",
            linkHref: "/graphics",
          },
          {
            prompt: "toys/rhythm",
            linkHref: "/rhythm-explorer",
          },
          {
            prompt: "resume",
            linkHref: "/resume",
          },
        ].map((someRouteAction) => (
          <div
            role={"listitem"}
            className={homePageStyles.routeActionContainer}
            key={someRouteAction.linkHref}
          >
            <Link href={someRouteAction.linkHref}>
              <a className={homePageStyles.routeAction}>
                {someRouteAction.prompt}
              </a>
            </Link>
          </div>
        ))}
      </div>
      <ExternalNavigationFooter
        websiteLinks={[
          {
            linkLabel: "github",
            linkText: "clumsycomputer",
            linkHref: "https://github.com/clumsycomputer",
          },
          {
            linkLabel: "hnews",
            linkText: "jmath",
            linkHref: "https://news.ycombinator.com/user?id=jmath",
          },
        ]}
      />
    </Page>
  );
};
