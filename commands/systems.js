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
    name: "tsetup", "verifypanel", "sendappofstaff", "gstart", "voicejoin", "help",
  async execute(message, args, client) {

    const cmd = args[0];

    // =========================================================
    // 🎟️ BIG TICKET PANEL
    // =========================================================
    if (cmd === "tsetup") {

      const embed = new EmbedBuilder()
        .setTitle("🎫 SUPPORT SYSTEM")
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
if (cmd === "verifypanel") {

  // 👇 Replace with your role ID
  const verifyRole = "1503438455680667688";

  const embed = new EmbedBuilder()
    .setTitle("🔐 SERVER VERIFICATION")
    .setDescription(`
Welcome to the server!

✅ Click the button below to verify yourself and unlock:

• 💬 Chat Access
• 🎉 Full Server Features
• 👥 Member Permissions
• 🚀 Exclusive Channels

⚠️ Verification is required to continue.
    `)
    .setColor("#00ff88")
    .setFooter({ text: `${message.guild.name} Verification System` })
    .setTimestamp();

  const btn = new ButtonBuilder()
    .setCustomId("verify_button")
    .setLabel("VERIFY NOW")
    .setEmoji("✅")
    .setStyle(ButtonStyle.Success);

  await message.channel.send({
    embeds: [embed],
    components: [new ActionRowBuilder().addComponents(btn)]
  });
}

// ================= VERIFY BUTTON =================

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "verify_button") {

    const verifyRole = "1503438455680667688";

    // Already verified
    if (interaction.member.roles.cache.has(verifyRole)) {
      return interaction.reply({
        content: "⚠️ You are already verified.",
        ephemeral: true
      });
    }

    try {
      await interaction.member.roles.add(verifyRole);

      const verifiedEmbed = new EmbedBuilder()
        .setTitle("✅ VERIFIED SUCCESSFULLY")
        .setDescription(`
You are now verified!

🎉 Enjoy the server and have fun.
        `)
        .setColor("Green")
        .setTimestamp();

      interaction.reply({
        embeds: [verifiedEmbed],
        ephemeral: true
      });

    } catch (err) {
      console.error(err);

      interaction.reply({
        content: "❌ Failed to give verify role.",
        ephemeral: true
      });
    }
  }
});

    // =========================================================
    // 📋 BIG STAFF APPLY PANEL
    // =========================================================
    if (cmd === "sendappofstaff") {

      const embed = new EmbedBuilder()
        .setTitle("📩 STAFF APPLICATIONS")
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
    if (cmd === "gstart") {

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
    if (cmd === "voicejoin") {

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
