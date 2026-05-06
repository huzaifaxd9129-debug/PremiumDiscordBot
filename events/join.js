const config = require("../config");

module.exports = {
  name: "guildMemberAdd",
  execute(member) {

    const channel = member.guild.channels.cache.get(config.welcomeChannel);
    if (!channel) return;

    channel.send(`🎉 Welcome ${member} to the server!`);
  }
};
