import type { NextPage } from "next";
import { NavigationFooter } from "../../../common/NavigationFooter/NavigationFooter";
import { Page } from "../../../common/Page/Page";
import { SectionDivider } from "../../../common/SectionDivider/SectionDivider";
import { GraphicSection } from "./common/GraphicSection";
import graphicsPageStyles from "./GraphicsPage.module.scss";

export const GraphicsPage: NextPage = () => {
  return (
    <Page
      accessibilityLabel={"graphics"}
      pageTabTitle={"graphics - clumsycomputer"}
      pageDescription={"a sampling of recent explorations into space"}
      pageContentContainerClassname={graphicsPageStyles.pageContentContainer}
    >
      <GraphicSection
        sectionDivider={null}
        graphicName={"pastores"}
        graphicDescription={"what do you see?"}
        projectName={"viejo pais][new state"}
        projectLocation={"new mexico"}
        projectDate={"fall 2022"}
        soloUrl={"/graphics/pastores.hi.png"}
        listUrl={"/graphics/pastores.low.png"}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"rree-koh"}
        graphicDescription={"what do you see?"}
        projectName={"plural pinata"}
        projectLocation={"mexico city"}
        projectDate={"summer 2021"}
        soloUrl={"/graphics/rree-koh.hi.png"}
        listUrl={"/graphics/rree-koh.low.png"}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"kohm-plee-seh"}
        graphicDescription={"what do you see?"}
        projectName={"plural pinata"}
        projectLocation={"mexico city"}
        projectDate={"summer 2021"}
        soloUrl={"/graphics/kohm-plee-seh.hi.png"}
        listUrl={"/graphics/kohm-plee-seh.low.png"}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"mahs-koh-teh"}
        graphicDescription={"what do you see?"}
        projectName={"plural pinata"}
        projectLocation={"mexico city"}
        projectDate={"summer 2021"}
        soloUrl={"/graphics/mahs-koh-teh.hi.png"}
        listUrl={"/graphics/mahs-koh-teh.low.png"}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"kool-pah-bleh"}
        graphicDescription={"what do you see?"}
        projectName={"plural pinata"}
        projectLocation={"mexico city"}
        projectDate={"summer 2021"}
        soloUrl={"/graphics/kool-pah-bleh.hi.png"}
        listUrl={"/graphics/kool-pah-bleh.low.png"}
      />
      {/* <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"neon noodles"}
        graphicDescription={"what do you see?"}
        projectName={"grocery bag"}
        projectLocation={"san jose"}
        projectDate={"summer-fall 2019"}
        soloUrl={"/graphics/neonnoodles.hi.png"}
        listUrl={"/graphics/neonnoodles.png"}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"alignment untangled"}
        graphicDescription={"what do you see?"}
        projectName={"grocery bag"}
        projectLocation={"san jose"}
        projectDate={"summer-fall 2019"}
        soloUrl={"/graphics/alignmentuntangled.hi.png"}
        listUrl={"/graphics/alignmentuntangled.png"}
      /> */}
      {/* <GraphicSection
          sectionDivider={<SectionDivider />}
          graphicName={"maybe tomorrow"}
          graphicDescription={"what do you see?"}
          projectName={"grocery bag"}
          projectLocation={"san jose"}
          projectDate={"summer-fall 2019"}
          soloUrl={"/graphics/maybetomorrow.hi.png"}
          listUrl={"/graphics/maybetomorrow.png"}
        /> */}
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"crosswalk"}
        graphicDescription={"what do you see?"}
        projectName={"grocery bag"}
        projectLocation={"san jose"}
        projectDate={"summer-fall 2019"}
        soloUrl={"/graphics/crosswalk.hi.png"}
        listUrl={"/graphics/crosswalk.lo.png"}
      />
      {/* <GraphicSection
          sectionDivider={<SectionDivider />}
          graphicName={"candychain"}
          graphicDescription={"what do you see?"}
          projectName={"candy lane"}
          projectLocation={"fort collins"}
          projectDate={"winter 2018"}
          soloUrl={"/graphics/candychain.hi.png"}
          listUrl={"/graphics/candychain.png"}
        /> */}
      {/* <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"trywe"}
        graphicDescription={"what do you see?"}
        projectName={"try all"}
        projectLocation={"fort collins"}
        projectDate={"winter 2018"}
        soloUrl={"/graphics/trywe.hi.png"}
        listUrl={"/graphics/trywe.png"}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"trythee"}
        graphicDescription={"what do you see?"}
        projectName={"try all"}
        projectLocation={"fort collins"}
        projectDate={"winter 2018"}
        soloUrl={"/graphics/trythee.hi.png"}
        listUrl={"/graphics/trythee.png"}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"tryme"}
        graphicDescription={"what do you see?"}
        projectName={"try all"}
        projectLocation={"fort collins"}
        projectDate={"winter 2018"}
        soloUrl={"/graphics/tryme.hi.png"}
        listUrl={"/graphics/tryme.png"}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"litethrewyou"}
        graphicDescription={"what do you see?"}
        projectName={"chord theory"}
        projectLocation={"fort collins"}
        projectDate={"winter 2017-18"}
        soloUrl={"/graphics/litethrewyou.hi.png"}
        listUrl={"/graphics/litethrewyou.png"}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"leadtwowater"}
        graphicDescription={"what do you see?"}
        projectName={"chord theory"}
        projectLocation={"fort collins"}
        projectDate={"winter 2017-18"}
        soloUrl={"/graphics/leadtwowater.hi.png"}
        listUrl={"/graphics/leadtwowater.png"}
      /> */}
      {/* <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"sinkmylisten"}
        graphicDescription={"what do you see?"}
        projectName={"chord theory"}
        projectLocation={"fort collins"}
        projectDate={"winter 2017-18"}
        soloUrl={"/graphics/sinkmylisten.hi.png"}
        listUrl={"/graphics/sinkmylisten.png"}
      /> */}
      {/* <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"sonsetrise"}
        graphicDescription={"what do you see?"}
        projectName={"chord theory"}
        projectLocation={"fort collins"}
        projectDate={"winter 2017-18"}
        soloUrl={"/graphics/sonsetrise.hi.png"}
        listUrl={"/graphics/sonsetrise.png"}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"sircomevent"}
        graphicDescription={"what do you see?"}
        projectName={"chord theory"}
        projectLocation={"fort collins"}
        projectDate={"winter 2017-18"}
        soloUrl={"/graphics/sircomevent.hi.png"}
        listUrl={"/graphics/sircomevent.png"}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"cylean"}
        graphicDescription={"what do you see?"}
        projectName={"friend pretend"}
        projectLocation={"windsor"}
        projectDate={"summer-fall 2017"}
        soloUrl={"/graphics/cylean.hi.png"}
        listUrl={"/graphics/cylean.png"}
      />
      <GraphicSection
        sectionDivider={<SectionDivider />}
        graphicName={"wherebra"}
        graphicDescription={"what do you see?"}
        projectName={"hat not included"}
        projectLocation={"windsor"}
        projectDate={"summer 2017"}
        soloUrl={"/graphics/wherebra.hi.png"}
        listUrl={"/graphics/wherebra.png"}
      /> */}
      {/* <GraphicSection
          sectionDivider={<SectionDivider />}
          graphicName={"duction"}
          graphicDescription={"what do you see?"}
          projectName={"hat not included"}
          projectLocation={"windsor"}
          projectDate={"summer 2017"}
          soloUrl={"/graphics/duction.hi.png"}
          listUrl={"/graphics/duction.png"}
        /> */}
      <NavigationFooter
        routeLinks={[
          { routeName: "home", routeHref: "/" },
          { routeName: "packages", routeHref: "/software/packages" },
          { routeName: "resume", routeHref: "/software/resume" },
          { routeName: "- music +", routeHref: "/curations/music" },
        ]}
        pdfLink={null}
      />
    </Page>
  );
};
