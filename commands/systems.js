const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const ms = require("ms");

module.exports = {
  name: "panel",
  async execute(message, args) {

    // ================= 🎟️ TICKET PANEL =================
    if (args[0] === "ticket") {
      const menu = new StringSelectMenuBuilder()
        .setCustomId("ticket_select")
        .setPlaceholder("Create a ticket")
        .addOptions([
          {
            label: "Support",
            description: "Get help from staff",
            value: "support"
          },
          {
            label: "Report",
            description: "Report a user",
            value: "report"
          },
          {
            label: "Other",
            description: "Other issues",
            value: "other"
          }
        ]);

      const row = new ActionRowBuilder().addComponents(menu);

      return message.channel.send({
        content: "🎫 **Ticket Panel**\nSelect a category below:",
        components: [row]
      });
    }

    // ================= ✅ VERIFY PANEL =================
    if (args[0] === "verify") {
      const button = new ButtonBuilder()
        .setCustomId("verify")
        .setLabel("Verify")
        .setStyle(ButtonStyle.Success);

      const row = new ActionRowBuilder().addComponents(button);

      return message.channel.send({
        content: "✅ Click the button to verify yourself",
        components: [row]
      });
    }

    // ================= 📋 HELP PANEL =================
    if (args[0] === "help") {
      const menu = new StringSelectMenuBuilder()
        .setCustomId("help_menu")
        .setPlaceholder("Select a category")
        .addOptions([
          {
            label: "Moderation",
            value: "mod",
            description: "Ban, Kick, Timeout, etc"
          },
          {
            label: "Systems",
            value: "systems",
            description: "Tickets, Giveaway, Verify"
          }
        ]);

      const row = new ActionRowBuilder().addComponents(menu);

      return message.channel.send({
        content: "📋 **Help Panel**",
        components: [row]
      });
    }

    // ================= 🎉 GIVEAWAY =================
    if (args[0] === "giveaway") {
      const time = args[1];
      const prize = args.slice(2).join(" ");

      if (!time || !prize) {
        return message.reply("Usage: +panel giveaway <time> <prize>");
      }

      const giveawayMsg = await message.channel.send(
        `🎉 **GIVEAWAY** 🎉\nPrize: **${prize}**\nReact with 🎉\nEnds in: ${time}`
      );

      await giveawayMsg.react("🎉");

      setTimeout(async () => {
        const fetched = await giveawayMsg.fetch();
        const users = await fetched.reactions.cache.get("🎉").users.fetch();

        const validUsers = users.filter(u => !u.bot);
        const winner = validUsers.random();

        if (!winner) {
          return message.channel.send("❌ No valid participants.");
        }

        message.channel.send(`🏆 Winner: ${winner}`);
      }, ms(time));
    }

  }
};
