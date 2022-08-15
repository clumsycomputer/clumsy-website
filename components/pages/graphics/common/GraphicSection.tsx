import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import graphicSectionStyles from "./GraphicSection.module.scss";

export interface GraphicSectionProps {
  sectionDivider: ReactNode;
  graphicName: string;
  graphicDescription: string;
  projectName: string;
  projectLocation: string;
  projectDate: string;
  soloUrl: string;
  listUrl: string;
}

export function GraphicSection(props: GraphicSectionProps) {
  const {
    sectionDivider,
    graphicName,
    projectName,
    projectLocation,
    projectDate,
    soloUrl,
    listUrl,
    graphicDescription,
  } = props;
  const accessibilityLabel = `graphic: ${graphicName}`;
  return (
    <div role={"none"} className={graphicSectionStyles.sectionContainer}>
      {sectionDivider}
      <div
        role={"region"}
        aria-label={accessibilityLabel}
        className={graphicSectionStyles.contentContainer}
      >
        <div
          role={"header"}
          aria-level={2}
          className={graphicSectionStyles.accessibilityHeader}
        >
          {accessibilityLabel}
        </div>
        <div
          role={"presentation"}
          className={graphicSectionStyles.bodyContainer}
        >
          <div
            role={"presentation"}
            className={graphicSectionStyles.bodyContentContainer}
          >
            <Link href={soloUrl} prefetch={false}>
              <a rel={"noreferrer"} target={"_blank"}>
                <Image
                  className={graphicSectionStyles.graphicImage}
                  src={listUrl}
                  alt={graphicDescription}
                  width={1280}
                  height={1280}
                />
              </a>
            </Link>
          </div>
          <div
            role={"presentation"}
            className={graphicSectionStyles.footerContainer}
          >
            <div role={"list"} className={graphicSectionStyles.labelsContainer}>
              {[graphicName, projectName, projectLocation, projectDate].map(
                (someGraphicLabel) => (
                  <div
                    role={"listitem"}
                    className={graphicSectionStyles.labelContainer}
                    key={someGraphicLabel}
                  >
                    <div
                      className={`${graphicSectionStyles.graphicLabel} ${graphicSectionStyles.footerTextBase}`}
                    >
                      {someGraphicLabel}
                    </div>
                  </div>
                )
              )}
            </div>
            <div
              role={"list"}
              className={graphicSectionStyles.actionsContainer}
            >
              {[
                {
                  prompt: "hi",
                  linkHref: soloUrl,
                },
              ].map((someGraphicAction, actionIndex) => (
                <div
                  role={"listitem"}
                  className={graphicSectionStyles.actionContainer}
                  key={`${actionIndex}`}
                >
                  <Link href={someGraphicAction.linkHref} prefetch={false}>
                    <a
                      className={`${graphicSectionStyles.graphicAction} ${graphicSectionStyles.footerTextBase}`}
                      rel={"noreferrer"}
                      target={"_blank"}
                    >
                      {someGraphicAction.prompt}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
