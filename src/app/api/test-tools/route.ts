import { aiTools } from "@/aiTools";
import { KeyInput } from "@/aiTools/pressKey/keyInputEnum";
import { getBrowser } from "@/lib/puppeteer";
import { writeFileSync } from "fs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  page.setViewport({
    height: 1080,
    width: 1920,
  });

  await aiTools.openUrl.execute(page, { url: "https://www.google.com" });
  await aiTools.fill.execute(page, { selector: "#APjFqb", value: "puppeteer" });
  await aiTools.pressKey.execute(page, { key: KeyInput.Enter });
  // await aiTools.click.execute(page, {
  //   selector:
  //     "body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b",
  // });

  // const result = await aiTools.getPageInfo.execute(page, {});
  // writeFileSync("screenshot.json", result);

  return new Response("ok");
}
