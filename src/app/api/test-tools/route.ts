import { aiTools } from "@/aiTools";
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
  const screenshot = await aiTools.screenshot.execute(page, {});
  writeFileSync("screenshot.png", screenshot);

  await browser.close();

  return new Response("ok");
}
