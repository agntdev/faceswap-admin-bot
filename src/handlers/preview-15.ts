import { Composer } from "grammy";

// SCAFFOLD — generated from the bot blueprint BEFORE the agent runs.
// Keep a LIVE registration (.command / .callbackQuery / …) so this feature is
// never an empty stub. Replace the reply body with real logic + copy; if you
// change the user-facing text, update tests/specs to match EXACTLY.
// Do NOT rewrite src/bot.ts — buildBot() already auto-loads this module.
// Menu: wire this into /start via registerMainMenuItem({ label: "15s Preview", data: "preview:15" }) if the toolkit exposes it.

const composer = new Composer();

composer.callbackQuery("preview:15", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Select 15-second preview length");
});

export default composer;
