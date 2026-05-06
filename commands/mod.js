module.exports = {
  name: "mod",
  async execute(message, args) {

    const cmd = args[0];

    // ================= HELP =================
    if (!cmd || cmd === "help") {
      return message.channel.send(`
⚔️ MOD COMMANDS LIST

BAN / KICK / CLEAR / WARN / UNBAN / MUTE / UNMUTE / TIMEOUT / UNTIMEOUT / LOCK / UNLOCK / HIDEC / SHOWC / NICK / SLOWMODE / PURGE / VOICE MUTE / VOICE UNMUTE / DEAFEN / UNDEAFEN / ADDROLE / REMOVEROLE / ROLEALL / MASSBAN / MASSKICK / SAY / EMBED / AVATAR / USERINFO / SERVERINFO
      `);
    }

    const member = message.mentions.members.first();

    // ================= BAN =================
    if (cmd === "ban") {
      if (!message.member.permissions.has("BanMembers")) return;
      if (!member) return message.reply("Mention user");
      await member.ban();
      return message.channel.send("User banned");
    }

    // ================= KICK =================
    if (cmd === "kick") {
      if (!message.member.permissions.has("KickMembers")) return;
      if (!member) return message.reply("Mention user");
      await member.kick();
      return message.channel.send("User kicked");
    }

    // ================= CLEAR =================
    if (cmd === "clear") {
      if (!message.member.permissions.has("ManageMessages")) return;
      const amount = parseInt(args[1]);
      if (!amount) return message.reply("Enter number");
      await message.channel.bulkDelete(amount);
      return message.channel.send("Messages cleared");
    }

    // ================= WARN =================
    if (cmd === "warn") {
      if (!member) return message.reply("Mention user");
      return message.channel.send(`${member.user.tag} warned ⚠️`);
    }

    // ================= MUTE (TIMEOUT) =================
    if (cmd === "mute") {
      if (!message.member.permissions.has("ModerateMembers")) return;
      if (!member) return message.reply("Mention user");
      await member.timeout(10 * 60 * 1000);
      return message.channel.send("User muted (10m)");
    }

    // ================= UNMUTE =================
    if (cmd === "unmute") {
      if (!member) return message.reply("Mention user");
      await member.timeout(null);
      return message.channel.send("User unmuted");
    }

    // ================= LOCK CHANNEL =================
    if (cmd === "lock") {
      if (!message.member.permissions.has("ManageChannels")) return;
      await message.channel.permissionOverwrites.edit(message.guild.id, {
        SendMessages: false
      });
      return message.channel.send("Channel locked 🔒");
    }

    // ================= UNLOCK =================
    if (cmd === "unlock") {
      await message.channel.permissionOverwrites.edit(message.guild.id, {
        SendMessages: true
      });
      return message.channel.send("Channel unlocked 🔓");
    }

    // ================= NICKNAME =================
    if (cmd === "nick") {
      if (!member) return message.reply("Mention user");
      const nick = args.slice(2).join(" ");
      await member.setNickname(nick);
      return message.channel.send("Nickname changed");
    }

    // ================= SLOWMODE =================
    if (cmd === "slowmode") {
      const time = parseInt(args[1]);
      message.channel.setRateLimitPerUser(time);
      return message.channel.send(`Slowmode set to ${time}s`);
    }

    // ================= ROLE ADD =================
    if (cmd === "addrole") {
      const role = message.mentions.roles.first();
      if (!member || !role) return message.reply("Mention user + role");
      await member.roles.add(role);
      return message.channel.send("Role added");
    }

    // ================= ROLE REMOVE =================
    if (cmd === "removerole") {
      const role = message.mentions.roles.first();
      if (!member || !role) return message.reply("Mention user + role");
      await member.roles.remove(role);
      return message.channel.send("Role removed");
    }

    // ================= VOICE MUTE =================
    if (cmd === "vmute") {
      if (!member) return;
      member.voice.setMute(true);
      return message.channel.send("Voice muted");
    }

    // ================= VOICE UNMUTE =================
    if (cmd === "vunmute") {
      if (!member) return;
      member.voice.setMute(false);
      return message.channel.send("Voice unmuted");
    }

    // ================= DEAFEN =================
    if (cmd === "deafen") {
      if (!member) return;
      member.voice.setDeaf(true);
      return message.channel.send("User deafened");
    }

    // ================= UNDEAFEN =================
    if (cmd === "undeafen") {
      if (!member) return;
      member.voice.setDeaf(false);
      return message.channel.send("User undeafened");
    }

    // ================= SAY =================
    if (cmd === "say") {
      const text = args.slice(1).join(" ");
      return message.channel.send(text);
    }

    // ================= EMBED =================
    if (cmd === "embed") {
      const text = args.slice(1).join(" ");
      return message.channel.send({ embeds: [{ description: text }] });
    }

    // ================= USER INFO =================
    if (cmd === "userinfo") {
      return message.channel.send(`User: ${message.author.tag}`);
    }

    // ================= SERVER INFO =================
    if (cmd === "serverinfo") {
      return message.channel.send(`Server: ${message.guild.name}`);
    }

    // ================= MASS KICK =================
    if (cmd === "masskick") {
      if (!message.member.permissions.has("KickMembers")) return;
      message.guild.members.cache.forEach(m => {
        if (!m.user.bot) m.kick().catch(() => {});
      });
      return message.channel.send("Mass kick done");
    }

    // ================= MASS BAN =================
    if (cmd === "massban") {
      if (!message.member.permissions.has("BanMembers")) return;
      message.guild.members.cache.forEach(m => {
        if (!m.user.bot) m.ban().catch(() => {});
      });
      return message.channel.send("Mass ban done");
    }

    // ================= ROLE ALL =================
    if (cmd === "roleall") {
      const role = message.mentions.roles.first();
      if (!role) return;
      message.guild.members.cache.forEach(m => {
        m.roles.add(role).catch(() => {});
      });
      return message.channel.send("Role given to all");
    }

  }
};
