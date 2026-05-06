const {
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const LOG_CHANNEL_ID = "1500169350307647488";

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {

    // =========================================================
    // 🎟️ TICKET SYSTEM (CREATE)
    // =========================================================
    if (interaction.isStringSelectMenu()) {

      if (interaction.customId === "ticket_select") {

        const channel = await interaction.guild.channels.create({
          name: `ticket-${interaction.user.username}`,
          type: ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [PermissionFlagsBits.ViewChannel]
            },
            {
              id: interaction.user.id,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages
              ]
            }
          ]
        });

        const close = new ButtonBuilder()
          .setCustomId("ticket_close")
          .setLabel("Close")
          .setStyle(ButtonStyle.Danger);

        const claim = new ButtonBuilder()
          .setCustomId("ticket_claim")
          .setLabel("Claim")
          .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(close, claim);

        channel.send({
          content: `🎫 Ticket opened by ${interaction.user}`,
          components: [row]
        });

        return interaction.reply({
          content: `✅ Ticket created: ${channel}`,
          ephemeral: true
        });
      }

      // =========================================================
      // 📋 HELP MENU
      // =========================================================
      if (interaction.customId === "help_menu") {

        const value = interaction.values[0];

        if (value === "mod") {
          return interaction.reply({
            content: "⚔️ **Moderation Commands:** ban, kick, mute, clear, warn",
            ephemeral: true
          });
        }

        if (value === "ticket") {
          return interaction.reply({
            content: "🎟️ Use +panel ticket to open tickets",
            ephemeral: true
          });
        }

        if (value === "systems") {
          return interaction.reply({
            content: "📩 Staff Apply, 🎉 Giveaway, 🎟 Tickets are available",
            ephemeral: true
          });
        }

        if (value === "util") {
          return interaction.reply({
            content: "⚙ ping, avatar, userinfo, serverinfo, calc",
            ephemeral: true
          });
        }
      }
    }

    // =========================================================
    // 🔐 VERIFY BUTTON
    // =========================================================
    if (interaction.isButton() && interaction.customId === "verify") {
      return interaction.reply({
        content: "✅ You are now verified!",
        ephemeral: true
      });
    }

    // =========================================================
    // 📩 STAFF APPLY SYSTEM
    // =========================================================
    if (interaction.isButton() && interaction.customId === "apply_start") {

      await interaction.reply({
        content: "📩 Application sent to staff for review!",
        ephemeral: true
      });

      const logChannel = interaction.guild.channels.cache.get(LOG_CHANNEL_ID);
      if (!logChannel) return;

      const embed = new EmbedBuilder()
        .setTitle("📩 STAFF APPLICATION")
        .setDescription(`
👤 User: ${interaction.user.tag}
🆔 ID: ${interaction.user.id}

Status: Pending Review
        `)
        .setColor("Purple");

      const accept = new ButtonBuilder()
        .setCustomId(`apply_accept_${interaction.user.id}`)
        .setLabel("ACCEPT")
        .setStyle(ButtonStyle.Success);

      const reject = new ButtonBuilder()
        .setCustomId(`apply_reject_${interaction.user.id}`)
        .setLabel("REJECT")
        .setStyle(ButtonStyle.Danger);

      const row = new ActionRowBuilder().addComponents(accept, reject);

      logChannel.send({ embeds: [embed], components: [row] });
    }

    // =========================================================
    // 📩 STAFF ACCEPT / REJECT LOGIC
    // =========================================================
    if (interaction.isButton()) {

      // ACCEPT
      if (interaction.customId.startsWith("apply_accept_")) {
        const userId = interaction.customId.split("_")[2];

        const member = await interaction.guild.members.fetch(userId).catch(() => null);

        if (member) {
          member.send("🎉 Your staff application was ACCEPTED!");
        }

        return interaction.reply({
          content: "Accepted ✅",
          ephemeral: true
        });
      }

      // REJECT
      if (interaction.customId.startsWith("apply_reject_")) {
        const userId = interaction.customId.split("_")[2];

        const member = await interaction.guild.members.fetch(userId).catch(() => null);

        if (member) {
          member.send("❌ Your staff application was REJECTED.");
        }

        return interaction.reply({
          content: "Rejected ❌",
          ephemeral: true
        });
      }

      // =========================================================
      // 🎟️ TICKET CLOSE / CLAIM
      // =========================================================
      if (interaction.customId === "ticket_close") {
        return interaction.channel.delete().catch(() => {});
      }

      if (interaction.customId === "ticket_claim") {
        return interaction.reply({
          content: `🎫 Ticket claimed by ${interaction.user}`,
          ephemeral: false
        });
      }

      // =========================================================
      // 🎉 GIVEAWAY JOIN BUTTON (optional safety)
      // =========================================================
      if (interaction.customId === "giveaway_join") {
        return interaction.reply({
          content: "🎉 You joined the giveaway!",
          ephemeral: true
        });
      }
    }
  }
};
