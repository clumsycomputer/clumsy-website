import Link from "next/link";
import { ReactNode } from "react";
import navigationFooterStyles from "./NavigationFooter.module.scss";
import navigationFooterContainerStyles from "./NavigationFooterContainer.module.scss";
import navigationListContainerStyles from "./NavigationListContainer.module.scss";

export interface NavigationFooterProps {
  routeLinks: Array<{
    routeName: string;
    routeHref: string;
  }>;
  pdfLink: ReactNode;
}

export function NavigationFooter(props: NavigationFooterProps) {
  const { routeLinks, pdfLink } = props;
  return (
    <NavigationFooterContainer>
      <NavigationListContainer>
        {routeLinks.map((someRouteLink) => (
          <div
            role={"listitem"}
            className={navigationFooterStyles.routeLinkContainer}
            key={someRouteLink.routeName}
          >
            <Link href={someRouteLink.routeHref}>
              <a role={"link"} className={navigationFooterStyles.routeLink}>
                {someRouteLink.routeName}
              </a>
            </Link>
          </div>
        ))}
      </NavigationListContainer>
      {pdfLink}
    </NavigationFooterContainer>
  );
}

interface NavigationListContainerProps {
  children: ReactNode;
}

function NavigationListContainer(props: NavigationListContainerProps) {
  const { children } = props;
  return (
    <div
      role={"list"}
      className={navigationListContainerStyles.navigationLinksContainer}
    >
      {children}
    </div>
  );
}

interface NavigationFooterContainerProps {
  children: ReactNode;
}

function NavigationFooterContainer(props: NavigationFooterContainerProps) {
  const { children } = props;
  return (
    <div
      role={"none"}
      className={navigationFooterContainerStyles.footerContainer}
    >
      <div
        role={"navigation"}
        className={navigationFooterContainerStyles.navigationContainer}
      >
        {children}
      </div>
    </div>
  );
}
