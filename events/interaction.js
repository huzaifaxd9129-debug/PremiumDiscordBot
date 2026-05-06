const { ChannelType, PermissionFlagsBits } = require("discord.js");
const config = require("../config");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {

    // 🎟️ TICKET SYSTEM
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
              allow: [PermissionFlagsBits.ViewChannel]
            }
          ]
        });

        return interaction.reply({
          content: `🎫 Ticket created: ${channel}`,
          ephemeral: true
        });
      }

      // 📋 HELP MENU
      if (interaction.customId === "help_menu") {
        if (interaction.values[0] === "mod") {
          return interaction.reply({
            content: "⚔️ Mod Commands: ban, kick, clear...",
            ephemeral: true
          });
        }
      }
    }

    // ✅ VERIFY BUTTON
    if (interaction.isButton()) {
      if (interaction.customId === "verify") {
        const role = interaction.guild.roles.cache.get(config.verifiedRole);
        if (!role) return interaction.reply({ content: "Role not found", ephemeral: true });

        await interaction.member.roles.add(role);

        return interaction.reply({
          content: "✅ You are verified!",
          ephemeral: true
        });
      }
    }
  }
};
