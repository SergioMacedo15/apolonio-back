import puppeteer, { Browser } from "puppeteer";

let browser: Browser | null = null;

export async function getBrowser(): Promise<Browser> {
  if (!browser) browser = await puppeteer.launch();

  return browser;
}
