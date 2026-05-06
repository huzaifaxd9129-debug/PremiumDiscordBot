const config = require("../config");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;

    // 🔗 ANTI-LINK
    if (message.content.includes("discord.gg")) {
      await message.delete().catch(() => {});
      return message.channel.send("❌ Links are not allowed");
    }

    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const cmdName = args.shift()?.toLowerCase();

    const command = client.commands.get(cmdName);
    if (!command) return;

    try {
      command.execute(message, args, client);
    } catch (err) {
      console.error(err);
      message.reply("❌ Error running command");
    }
  }
};
