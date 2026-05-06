module.exports = {
  name: "utility",
  async execute(message, args) {

    const cmd = args[0];

    // ================= HELP =================
    if (!cmd || cmd === "help") {
      return message.channel.send(`
⚙️ UTILITY COMMANDS

ping / avatar / userinfo / serverinfo / say / embed / calc / weather(fake) / time / roleinfo
      `);
    }

    // ================= PING =================
    if (cmd === "ping") {
      return message.channel.send(`🏓 Pong: ${Date.now() - message.createdTimestamp}ms`);
    }

    // ================= AVATAR =================
    if (cmd === "avatar") {
      const user = message.mentions.users.first() || message.author;
      return message.channel.send(user.displayAvatarURL({ dynamic: true, size: 512 }));
    }

    // ================= USERINFO =================
    if (cmd === "userinfo") {
      const user = message.mentions.users.first() || message.author;

      return message.channel.send(`
👤 User Info:
- Tag: ${user.tag}
- ID: ${user.id}
- Created: ${user.createdAt.toDateString()}
      `);
    }

    // ================= SERVERINFO =================
    if (cmd === "serverinfo") {
      const guild = message.guild;

      return message.channel.send(`
🏠 Server Info:
- Name: ${guild.name}
- Members: ${guild.memberCount}
- Owner: <@${guild.ownerId}>
      `);
    }

    // ================= SAY =================
    if (cmd === "say") {
      const text = args.slice(1).join(" ");
      if (!text) return message.reply("Enter text");
      return message.channel.send(text);
    }

    // ================= EMBED =================
    if (cmd === "embed") {
      const text = args.slice(1).join(" ");
      if (!text) return message.reply("Enter text");

      return message.channel.send({
        embeds: [{ description: text, color: 0x00ffcc }]
      });
    }

    // ================= CALC =================
    if (cmd === "calc") {
      try {
        const expr = args.slice(1).join(" ");
        if (!expr) return message.reply("Enter math expression");

        const result = eval(expr);
        return message.channel.send(`🧮 Result: ${result}`);
      } catch {
        return message.reply("Invalid math");
      }
    }

    // ================= TIME =================
    if (cmd === "time") {
      return message.channel.send(`⏰ Current Time: ${new Date().toLocaleString()}`);
    }

    // ================= ROLE INFO =================
    if (cmd === "roleinfo") {
      const role = message.mentions.roles.first();
      if (!role) return message.reply("Mention a role");

      return message.channel.send(`
🎭 Role Info:
- Name: ${role.name}
- ID: ${role.id}
- Members: ${role.members.size}
      `);
    }

    // ================= WEATHER (FAKE SIMPLE) =================
    if (cmd === "weather") {
      const city = args.slice(1).join(" ");
      if (!city) return message.reply("Enter city");

      return message.channel.send(`🌤️ Weather in ${city}: Sunny (demo response)`);
    }

  }
};
