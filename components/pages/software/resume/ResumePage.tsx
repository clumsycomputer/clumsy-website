import type { NextPage } from "next";
import Link from "next/link";
import { Fragment, ReactNode } from "react";
import { DocumentPage } from "../../../common/Document/DocumentPage";
import { NavigationFooter } from "../../../common/NavigationFooter/NavigationFooter";
import { PdfLink } from "../../../common/NavigationFooter/PdfLink";
import { ResumeHeaderSection } from "./common/ResumeHeaderSection";
import { ResumeJobSection } from "./common/ResumeJobSection";
import { ResumeSchoolSection } from "./common/ResumeSchoolSection";

export const ResumePage: NextPage = () => {
  return (
    <ResumePageBase
      softwarePageHref={"/software/packages"}
      navigationFooter={
        <NavigationFooter
          routeLinks={[
            { routeName: "home", routeHref: "/" },
            { routeName: "packages", routeHref: "/software/packages" },
            { routeName: "graphics", routeHref: "/art/graphics" },
            { routeName: "- music +", routeHref: "/curations/music" },
          ]}
          pdfLink={<PdfLink pdfHref={"/pdfs/resume.pdf"} />}
        />
      }
    />
  );
};

export const ResumePdfPage: NextPage = () => {
  return (
    <ResumePageBase
      softwarePageHref={"https://www.clumsycomputer.com/software"}
      navigationFooter={
        <NavigationFooter
          routeLinks={[
            {
              routeName: "website",
              routeHref: "https://www.clumsycomputer.com",
            },
            {
              routeName: "github",
              routeHref: "https://github.com/clumsycomputer",
            },
          ]}
          pdfLink={null}
        />
      }
    />
  );
};

interface ResumePageBaseProps {
  navigationFooter: ReactNode;
  softwarePageHref: string;
}

function ResumePageBase(props: ResumePageBaseProps) {
  const { navigationFooter, softwarePageHref } = props;
  return (
    <DocumentPage
      accessibilityLabel={"resume"}
      pageTabTitle={"resume - clumsycomputer"}
      pageDescription={
        "a concise overview of jared mathews's career in software development"
      }
    >
      <ResumeHeaderSection
        fullName={"jared mathews"}
        emailAddress={"clumsycomputer@gmail.com"}
        briefText={
          "a balanced frontend developer who has worked on a variety of products across several companies"
        }
        statusText={
          <Fragment>
            focused on developing, maintaining, and sharing open-source{" "}
            <Link href={softwarePageHref}>
              <a>
                <b>software</b>
              </a>
            </Link>{" "}
            that assists developers in their creative pursuits
          </Fragment>
        }
        shortTermGoalText={
          <Fragment>
            convert my developer skills into resources{" "}
            <i>(engineers,money,etc.)</i> for building musical instruments/toys
          </Fragment>
        }
        longTermGoalText={"make a living building musical instruments/toys"}
      />
      <ResumeJobSection
        companyName={"wyyerd intuition"}
        teamName={"engineering"}
        jobTitle={"frontend developer"}
        dateRange={"2022.06 - 2022.02"}
        productDescription={
          "a web app aimed at internet service providers that assists employees in scheduling and completing a variety of tasks ranging from managing network infrastructure to analyzing client subscriptions"
        }
        workResponsibilities={[
          "provide thorough code reviews with an emphasis on iteration",
          "refactor a number of entrenched components in order to enable a requested feature or fix an outstanding bug while minimizing breaking changes to existing apis",
          "adapt third-party component libraries to support undocumented use-cases",
          "participate in establishing best practices for frontend development with a focus on component composition that is fairly formulaic in implementation and resulted in code that was more straightforward to reason about",
          "participate in sprint planning and issue prioritization",
          "collaborate with teammates on problems where unobivous or unique solutions were required",
        ]}
        techStack={[
          "vue@2",
          "apollo",
          "bootstrap",
          "playwright",
          "typescript",
          "scss",
          "graphql",
          "git",
        ]}
      />
      <ResumeJobSection
        companyName={"native roots"}
        teamName={"operations"}
        jobTitle={"frontend developer"}
        dateRange={"2021.04 - 2020.12"}
        productDescription={
          "two unique web stores each serving their own market of cannabis consumers either in colorado, united states or manitoba, canada"
        }
        workResponsibilities={[
          "provide clients with a simpler less error-prone purchase flow",
          "revive an abandoned and brittle nextjs codebase",
          "stabilize repository via typescript, more comprehensive e2e test, simpler environment/dependency management, and a modernized palette of development scripts for a streamlined workflow",
          "migrate from shopify api to dutchie plus api for a smoother cannabis shopping experience",
          "resolve outstanding wcag 2.1 level aa and ada title iii accessibility lawsuit",
        ]}
        techStack={[
          "nextjs",
          "react",
          "typescript",
          "graphql",
          "nodejs",
          "cypress",
          "firebase",
          "git",
        ]}
      />
      <ResumeJobSection
        companyName={"confident cannabis"}
        teamName={"wholesale"}
        jobTitle={"junior developer"}
        dateRange={"2020.04 - 2019.05"}
        productDescription={
          "a b2b marketplace/network that helps licensed businesses in the cannabis industry manage and transact tested inventory"
        }
        workResponsibilities={[
          "empower clients by simplifying their operations in a tightly regulated industry",
          "improve experience around order creation/management",
          "collaborate with teammates on monthly milestones",
          "identify, describe, and patch bugs",
          "maintain, design, and implement react forms/inputs",
          "maintain, design, and implement react hooks",
          "maintain and refactor legacy react components",
        ]}
        techStack={[
          "react",
          "typescript",
          "material-ui",
          "redux",
          "storybook",
          "git",
        ]}
      />
      <ResumeJobSection
        companyName={"datasplice"}
        teamName={"research & development"}
        jobTitle={"apprentice developer"}
        dateRange={"2018.05 - 2016.05"}
        productDescription={
          "an offline-first/mobile-first web app that helps enterprise organize, navigate, and manipulate data regardless of location"
        }
        workResponsibilities={[
          "collaborate with teammates towards providing clients with a flexible and reliable platform for assisting workers out in the field",
          "identify, describe, and patch bugs",
          "maintain and integrate bluetooth hardware for cordova ios extension",
          "design and implement a robust component for marking-up/annotating images on the fly",
          "maintain, design, and implement a shared react components library",
          "begin refactor of core app functionality towards improved readability/testability by way of redux-saga",
        ]}
        techStack={[
          "react",
          "redux",
          "redux-saga",
          "cordova",
          "coffeescript",
          "git",
        ]}
      />
      <ResumeSchoolSection
        schoolName={"galvanize"}
        programName={"fullstack web development"}
        dateRange={"2016.04 - 2015.10"}
        programDescription={
          "an immersive six-month bootcamp that covered technologies, patterns, and best-practices applied throughout industry"
        }
        techStack={[
          "javascript",
          "nodejs",
          "git",
          "css",
          "express",
          "postgresql",
        ]}
      />
      {navigationFooter}
    </DocumentPage>
  );
}
