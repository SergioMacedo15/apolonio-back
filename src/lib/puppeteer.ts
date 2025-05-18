import puppeteer, { Browser } from "puppeteer";

const { NODE_ENV } = process.env;
const PROTOCOL_TIMEOUT = 1000 * 60 * 5; // 5 minutes

let browser: Browser | null = null;

export async function getBrowser(): Promise<Browser> {
  if (!browser || !browser.connected) {
    browser = await puppeteer.launch({
      protocolTimeout: PROTOCOL_TIMEOUT, // 5 minutes
      headless: NODE_ENV !== "development",
      args:
        NODE_ENV === "development"
          ? []
          : ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }

  return browser;
}
