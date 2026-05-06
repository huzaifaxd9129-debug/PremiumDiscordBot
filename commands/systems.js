const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ChannelType,
  PermissionFlagsBits
} = require("discord.js");

const LOG_CHANNEL_ID = "1500169350307647488";

module.exports = {
  name: "panel",
  async execute(message, args, client) {

    const cmd = args[0];

    // =========================================================
    // 🎟️ BIG TICKET PANEL
    // =========================================================
    if (cmd === "ticket") {

      const embed = new EmbedBuilder()
        .setTitle("🎫 SUPPORT TICKET SYSTEM")
        .setDescription(`
**Need help? Open a ticket below**

📌 What you can get:
• Support from staff
• Report a user
• Partnership request
• General help

⚠️ Do not spam tickets
✔ Staff will respond ASAP
        `)
        .setColor("Blue");

      const menu = new StringSelectMenuBuilder()
        .setCustomId("ticket_select")
        .setPlaceholder("🎫 Select Ticket Type")
        .addOptions([
          { label: "Support", value: "support" },
          { label: "Report", value: "report" },
          { label: "Partnership", value: "partner" },
          { label: "Other", value: "other" }
        ]);

      const row = new ActionRowBuilder().addComponents(menu);

      return message.channel.send({
        embeds: [embed],
        components: [row]
      });
    }

    // =========================================================
    // 🔐 BIG VERIFY PANEL
    // =========================================================
    if (cmd === "verify") {

      const embed = new EmbedBuilder()
        .setTitle("🔐 VERIFICATION SYSTEM")
        .setDescription(`
Welcome to the server!

✔ Click verify to unlock:
• Chat access
• Full server features
• Member roles

⚠ You must verify to continue
        `)
        .setColor("Green");

      const btn = new ButtonBuilder()
        .setCustomId("verify")
        .setLabel("VERIFY NOW")
        .setStyle(ButtonStyle.Success);

      return message.channel.send({
        embeds: [embed],
        components: [new ActionRowBuilder().addComponents(btn)]
      });
    }

    // =========================================================
    // 📋 BIG STAFF APPLY PANEL
    // =========================================================
    if (cmd === "apply") {

      const embed = new EmbedBuilder()
        .setTitle("📩 STAFF APPLICATION SYSTEM")
        .setDescription(`
**Want to join staff team?**

📌 Requirements:
• Must be active daily
• Age 13+
• Good behavior in server
• Must know basic Discord rules
• No toxicity / spam

✔ Click below to start application
        `)
        .setColor("Purple");

      const btn = new ButtonBuilder()
        .setCustomId("apply_start")
        .setLabel("Apply Now")
        .setStyle(ButtonStyle.Primary);

      return message.channel.send({
        embeds: [embed],
        components: [new ActionRowBuilder().addComponents(btn)]
      });
    }

    // =========================================================
    // 🎉 BIG GIVEAWAY PANEL
    // =========================================================
    if (cmd === "giveaway") {

      const embed = new EmbedBuilder()
        .setTitle("🎉 GIVEAWAY SYSTEM")
        .setDescription(`
🎁 Prize: **${args.slice(2).join(" ") || "Unknown"}**
⏰ Time: **${args[1] || "Not set"}**

🔥 How to join:
• Click button below

🏆 Giveaway Will Be Rerolled, If Winner Did Not Complete Requirements
        `)
        .setColor("Gold");

      const joinBtn = new ButtonBuilder()
        .setCustomId("giveaway_join")
        .setLabel("Join Giveaway 🎉")
        .setStyle(ButtonStyle.Success);

      const row = new ActionRowBuilder().addComponents(joinBtn);

      return message.channel.send({
        embeds: [embed],
        components: [row]
      });
    }

    // =========================================================
    // 🎤 VOICE JOIN SYSTEM (NEW ADDED)
    // =========================================================
    if (cmd === "join") {

      const vc = message.member.voice.channel;

      if (!vc) {
        return message.reply("❌ You must join a voice channel first!");
      }

      const { joinVoiceChannel } = require("@discordjs/voice");

      joinVoiceChannel({
        channelId: vc.id,
        guildId: vc.guild.id,
        adapterCreator: vc.guild.voiceAdapterCreator
      });

      return message.reply("🎤 Joined your voice channel!");
    }

    // =========================================================
    // 📋 BIG HELP PANEL (NEW ADDED)
    // =========================================================
    if (cmd === "help") {

      const embed = new EmbedBuilder()
        .setTitle("📋 NAMIX SUPPORT PANEL")
        .setDescription(`
**Welcome to Help Panel**

📌 Available Categories:
• ⚔ Moderation Commands
• 🎟 Ticket System
• 📩 Staff Application
• 🎉 Giveaway System
• ⚙ Utility Commands

👉 Select a category below to see commands
        `)
        .setColor("Aqua");

      const menu = new StringSelectMenuBuilder()
        .setCustomId("help_menu")
        .setPlaceholder("📋 Select Category")
        .addOptions([
          { label: "Moderation", value: "mod" },
          { label: "Tickets", value: "ticket" },
          { label: "Systems", value: "systems" },
          { label: "Utility", value: "util" }
        ]);

      const row = new ActionRowBuilder().addComponents(menu);

      return message.channel.send({
        embeds: [embed],
        components: [row]
      });
    }
  }
};
