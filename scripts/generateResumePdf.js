#!/usr/bin/env node
const ChildProcess = require("child_process");
const FileSystem = require("fs/promises");
const Path = require("path");
const Playwright = require("@playwright/test");

generateResumePdf();

async function generateResumePdf() {
  ChildProcess.execSync("next build", {
    stdio: "inherit",
  });
  ChildProcess.exec("next start", {
    stdio: "inherit",
  });
  const playwrightBrowser = await Playwright.chromium.launch();
  const playwrightContext = await playwrightBrowser.newContext();
  const playwrightPage = await playwrightContext.newPage();
  await playwrightPage.goto("http://localhost:3000/_pdfs/resume");
  const bodyHandle = await playwrightPage.$("body");
  const bodyBoundingBox = await bodyHandle.boundingBox();
  const resumePdfBuffer = await playwrightPage.pdf({
    printBackground: true,
    height: bodyBoundingBox.height + 1,
    width: 832,
  });
  await playwrightBrowser.close();
  await FileSystem.writeFile(
    Path.join(process.cwd(), `public/pdfs/resume.pdf`),
    resumePdfBuffer
  );
}
