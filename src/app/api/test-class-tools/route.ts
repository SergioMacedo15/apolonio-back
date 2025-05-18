import { aiTools, OpenUrlTool, ClickTool } from "@/aiTools";
import { KeyInput } from "@/aiTools/pressKey/keyInputEnum";
import { getBrowser } from "@/lib/puppeteer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  page.setViewport({
    height: 1080,
    width: 1920,
  });

  try {
    // Usando as instâncias globais (modo Strategy existente)
    await aiTools.openUrl.execute(page, { url: "https://www.google.com" });
    await aiTools.fill.execute(page, {
      selector: "#APjFqb",
      value: "puppeteer",
    });
    await aiTools.pressKey.execute(page, { key: KeyInput.Enter });

    // Espera a navegação completar
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    // Agora usando as classes diretamente (nova abordagem orientada a objetos)
    const customOpenUrl = new OpenUrlTool();
    await customOpenUrl.execute(page, { url: "https://www.bing.com" });

    // Usando a nova ferramenta goBack
    await aiTools.goBack.execute(page, { waitForNavigation: true });

    const screenshot = await aiTools.screenshot.execute(page, {});

    await browser.close();

    return new NextResponse("Test completed successfully", {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error: any) {
    console.error("Erro durante o teste:", error);
    await browser.close();
    return new NextResponse(`Error: ${error.message || "Unknown error"}`, {
      status: 500,
    });
  }
}
