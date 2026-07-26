import { Composer } from "grammy";

// SCAFFOLD — generated from the bot blueprint BEFORE the agent runs.
// Keep a LIVE registration (.command / .callbackQuery / …) so this feature is
// never an empty stub. Replace the reply body with real logic + copy; if you
// change the user-facing text, update tests/specs to match EXACTLY.
// Do NOT rewrite src/bot.ts — buildBot() already auto-loads this module.
// Menu: wire this into /start via registerMainMenuItem({ label: "10s Preview", data: "preview:10" }) if the toolkit exposes it.

const composer = new Composer();

composer.callbackQuery("preview:10", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Select 10-second preview length");
});

export default composer;
