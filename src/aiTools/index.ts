import { openUrl, OpenUrlTool } from "./openUrl";
import { Page } from "puppeteer";
import { screenshot, ScreenshotTool } from "./screenshot";
import { getPageInfo, GetPageInfoTool } from "./getPageInfo";
import { fillAiToolInfo, FillTool } from "./fill";
import { clickAiToolInfo, ClickTool } from "./click";
import { pressKeyAiToolInfo, PressKeyTool } from "./pressKey";
import { goBack, GoBackTool } from "./goBack";
import { AiTool, AIToolsRegistry } from "./AiTool";
import { setCompletedInfo, SetCompletedInfoTool } from "./setCompletedInfo";

export {
  AiTool,
  OpenUrlTool,
  ScreenshotTool,
  GetPageInfoTool,
  FillTool,
  ClickTool,
  PressKeyTool,
  GoBackTool,
  SetCompletedInfoTool
};
export type { AIToolsRegistry };

export type AIToolsProps = AIToolsRegistry;

export const aiTools = {
  openUrl,
  screenshot,
  getPageInfo,
  setCompletedInfo,
  fill: fillAiToolInfo,
  click: clickAiToolInfo,
  pressKey: pressKeyAiToolInfo,
  goBack,
} as const satisfies AIToolsRegistry;
