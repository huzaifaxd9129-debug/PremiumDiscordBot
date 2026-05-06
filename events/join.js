const { EmbedBuilder } = require("discord.js");

const WELCOME_CHANNEL_ID = "1500169320683147405";
const AUTO_ROLE_ID = "1500169262734512189"

module.exports = {
  name: "guildMemberAdd",

  async execute(member, client) {

    // =========================================================
    // 📌 GET WELCOME CHANNEL
    // =========================================================
    const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
    if (!channel) return;

    // =========================================================
    // 🎉 BIG WELCOME EMBED
    // =========================================================
    const embed = new EmbedBuilder()
      .setTitle("🎉 Welcome to the Server!")
      .setDescription(`
👋 Hey ${member}, welcome to **${member.guild.name}**!

📊 You are **#${member.guild.memberCount}** member

📌 Please read rules before chatting
❤️ Enjoy your stay!
      `)
      .setColor("Green")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: "We’re happy to have you here!" });

    channel.send({ content: `👋 Welcome ${member}`, embeds: [embed] });

    // =========================================================
    // 🎭 AUTO ROLE (OPTIONAL)
    // =========================================================
    if (AUTO_ROLE_ID) {
      const role = member.guild.roles.cache.get(AUTO_ROLE_ID);
      if (role) {
        member.roles.add(role).catch(() => {});
      }
    }
  }
};
