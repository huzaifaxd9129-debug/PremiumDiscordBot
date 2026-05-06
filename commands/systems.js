const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
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
          { label: "Support", value: "support" },
          { label: "Report", value: "report" }
        ]);

      return message.channel.send({
        content: "🎫 Ticket Panel",
        components: [new ActionRowBuilder().addComponents(menu)]
      });
    }

    // ================= ✅ VERIFY PANEL =================
    if (args[0] === "verify") {
      const btn = new ButtonBuilder()
        .setCustomId("verify")
        .setLabel("Verify")
        .setStyle(ButtonStyle.Success);

      return message.channel.send({
        content: "Click to verify",
        components: [new ActionRowBuilder().addComponents(btn)]
      });
    }

    // ================= 📋 HELP PANEL =================
    if (args[0] === "help") {
      const menu = new StringSelectMenuBuilder()
        .setCustomId("help_menu")
        .setPlaceholder("Select category")
        .addOptions([
          { label: "Moderation", value: "mod" },
          { label: "Systems", value: "systems" }
        ]);

      return message.channel.send({
        content: "Help Panel",
        components: [new ActionRowBuilder().addComponents(menu)]
      });
    }

    // ================= 🎉 GIVEAWAY =================
    if (args[0] === "giveaway") {
      const time = args[1];
      const prize = args.slice(2).join(" ");

      if (!time || !prize) {
        return message.reply("Usage: +panel giveaway <time> <prize>");
      }

      const msg = await message.channel.send(`🎉 ${prize}\nReact 🎉`);
      await msg.react("🎉");

      setTimeout(async () => {
        const users = await msg.reactions.cache.get("🎉").users.fetch();
        const winner = users.filter(u => !u.bot).random();
        message.channel.send(`Winner: ${winner}`);
      }, ms(time));
    }

    // ================= 📩 STAFF APPLY PANEL =================
    if (args[0] === "apply") {
      const btn = new ButtonBuilder()
        .setCustomId("apply_start")
        .setLabel("Apply for Staff")
        .setStyle(ButtonStyle.Primary);

      return message.channel.send({
        content: "📩 Click below to apply for staff",
        components: [new ActionRowBuilder().addComponents(btn)]
      });
    }

    // ================= 🎤 VOICE JOIN =================
    if (args[0] === "join") {
      const vc = message.member.voice.channel;
      if (!vc) return message.reply("Join a voice channel first!");

      const { joinVoiceChannel } = require("@discordjs/voice");

      joinVoiceChannel({
        channelId: vc.id,
        guildId: vc.guild.id,
        adapterCreator: vc.guild.voiceAdapterCreator
      });

      return message.reply("🎤 Joined your voice channel!");
    }

  }
};
