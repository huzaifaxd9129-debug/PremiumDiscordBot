module.exports = {
  name: "fun",
  async execute(message, args) {

    const cmd = args[0];

    // ================= HELP =================
    if (!cmd || cmd === "help") {
      return message.channel.send(`
🎮 FUN COMMANDS

8ball / dice / coinflip / slap / hug / joke / roast / ascii / reverse / calc / avatar / ping
      `);
    }

    // ================= 8BALL =================
    if (cmd === "8ball") {
      const responses = [
        "Yes ✅", "No ❌", "Maybe 🤔", "Definitely 👍",
        "Ask again later ⏳", "I don't think so ❌"
      ];
      return message.channel.send(responses[Math.floor(Math.random() * responses.length)]);
    }

    // ================= DICE =================
    if (cmd === "dice") {
      return message.channel.send(`🎲 You rolled: ${Math.floor(Math.random() * 6) + 1}`);
    }

    // ================= COINFLIP =================
    if (cmd === "coin") {
      const result = Math.random() < 0.5 ? "Heads 🪙" : "Tails 🪙";
      return message.channel.send(result);
    }

    // ================= SLAP =================
    if (cmd === "slap") {
      const user = message.mentions.users.first();
      if (!user) return message.reply("Mention someone");
      return message.channel.send(`${message.author} slapped ${user} 👋`);
    }

    // ================= HUG =================
    if (cmd === "hug") {
      const user = message.mentions.users.first();
      if (!user) return message.reply("Mention someone");
      return message.channel.send(`${message.author} hugged ${user} 🤗`);
    }

    // ================= JOKE =================
    if (cmd === "joke") {
      const jokes = [
        "Why don’t programmers like nature? Too many bugs 🐛",
        "I told my computer I needed a break... it said no problem, it will crash 💀",
        "Why did the developer go broke? Because he used up all his cache 😂"
      ];
      return message.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
    }

    // ================= ROAST =================
    if (cmd === "roast") {
      const user = message.mentions.users.first();
      if (!user) return message.reply("Mention someone");
      const roasts = [
        "You're like a cloud... when you disappear, it's a beautiful day ☁️",
        "You bring everyone so much joy… when you leave the room 😭",
        "You're proof evolution can go in reverse 🧬"
      ];
      return message.channel.send(`${user} ${roasts[Math.floor(Math.random() * roasts.length)]}`);
    }

    // ================= REVERSE TEXT =================
    if (cmd === "reverse") {
      const text = args.slice(1).join(" ");
      if (!text) return message.reply("Enter text");
      return message.channel.send(text.split("").reverse().join(""));
    }

    // ================= CALC =================
    if (cmd === "calc") {
      try {
        const expr = args.slice(1).join(" ");
        return message.channel.send(`Result: ${eval(expr)}`);
      } catch {
        return message.reply("Invalid math");
      }
    }

    // ================= AVATAR =================
    if (cmd === "avatar") {
      const user = message.mentions.users.first() || message.author;
      return message.channel.send(user.displayAvatarURL({ dynamic: true, size: 512 }));
    }

    // ================= PING =================
    if (cmd === "ping") {
      return message.channel.send(`🏓 Pong: ${Date.now() - message.createdTimestamp}ms`);
    }

  }
};
