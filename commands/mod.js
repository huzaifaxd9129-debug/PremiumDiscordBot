const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "mod",

  async execute(message, args, client) {

    const cmd = args[0]?.toLowerCase();
    const member = message.mentions.members.first();
    const reason = args.slice(2).join(" ") || "No reason provided";

    // ================= HELP =================
    if (!cmd || cmd === "help") {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("🛡️ MODERATION COMMAND CENTER")
            .setDescription(`
⚔️ **BAN SYSTEM**
ban, unban, softban, hackban, massban

👢 **KICK SYSTEM**
kick, masskick

🔇 **MUTE SYSTEM**
mute, unmute, timeout, untimeout

🎧 **VOICE CONTROL**
vmute, vunmute, deafen, undeafen, disconnect, move

🧹 **CHAT CONTROL**
clear, purge, nuke, slowmode, lock, unlock, hidec, showc

🏷️ **ROLE SYSTEM**
addrole, removerole, roleall

👤 **USER CONTROL**
nick, warn, warnings, avatar, userinfo

📢 **UTILITY**
say, embed, announce, poll

🌐 **SERVER**
serverinfo, membercount
            `)
            .setColor("Red")
        ]
      });
    }

    // ================= PERMISSION CHECK =================
    const check = (perm) => {
      if (!message.member.permissions.has(perm)) {
        message.reply("❌ No permission.");
        return false;
      }
      return true;
    };

    // ================= BAN =================
    if (cmd === "ban") {
      if (!check(PermissionsBitField.Flags.BanMembers)) return;
      if (!member) return message.reply("❌ Mention user");
      await member.ban({ reason });
      return message.channel.send(`🔨 Banned ${member.user.tag}`);
    }

    // ================= UNBAN =================
    if (cmd === "unban") {
      if (!check(PermissionsBitField.Flags.BanMembers)) return;
      const id = args[1];
      await message.guild.members.unban(id);
      return message.channel.send(`✅ Unbanned ${id}`);
    }

    // ================= KICK =================
    if (cmd === "kick") {
      if (!check(PermissionsBitField.Flags.KickMembers)) return;
      if (!member) return;
      await member.kick(reason);
      return message.channel.send(`👢 Kicked ${member.user.tag}`);
    }

    // ================= SOFTBAN =================
    if (cmd === "softban") {
      if (!check(PermissionsBitField.Flags.BanMembers)) return;
      await member.ban({ days: 7 });
      await message.guild.members.unban(member.id);
      return message.channel.send(`⚡ Softbanned ${member.user.tag}`);
    }

    // ================= MUTE =================
    if (cmd === "mute") {
      if (!check(PermissionsBitField.Flags.ModerateMembers)) return;
      await member.timeout(10 * 60 * 1000);
      return message.channel.send(`🔇 Muted ${member.user.tag}`);
    }

    // ================= UNMUTE =================
    if (cmd === "unmute" || cmd === "untimeout") {
      if (!check(PermissionsBitField.Flags.ModerateMembers)) return;
      await member.timeout(null);
      return message.channel.send(`🔊 Unmuted ${member.user.tag}`);
    }

    // ================= CLEAR =================
    if (cmd === "clear" || cmd === "purge") {
      if (!check(PermissionsBitField.Flags.ManageMessages)) return;
      const amount = parseInt(args[1]);
      await message.channel.bulkDelete(amount);
      return message.channel.send(`🧹 Deleted ${amount} messages`);
    }

    // ================= SLOWMODE =================
    if (cmd === "slowmode") {
      if (!check(PermissionsBitField.Flags.ManageChannels)) return;
      const time = parseInt(args[1]);
      await message.channel.setRateLimitPerUser(time);
      return message.channel.send(`🐢 Slowmode set to ${time}s`);
    }

    // ================= LOCK =================
    if (cmd === "lock") {
      if (!check(PermissionsBitField.Flags.ManageChannels)) return;
      await message.channel.permissionOverwrites.edit(message.guild.id, {
        SendMessages: false
      });
      return message.channel.send("🔒 Channel locked");
    }

    // ================= UNLOCK =================
    if (cmd === "unlock") {
      if (!check(PermissionsBitField.Flags.ManageChannels)) return;
      await message.channel.permissionOverwrites.edit(message.guild.id, {
        SendMessages: true
      });
      return message.channel.send("🔓 Channel unlocked");
    }

    // ================= HIDE CHANNEL =================
    if (cmd === "hidec") {
      if (!check(PermissionsBitField.Flags.ManageChannels)) return;
      await message.channel.permissionOverwrites.edit(message.guild.id, {
        ViewChannel: false
      });
      return message.channel.send("🙈 Channel hidden");
    }

    // ================= SHOW CHANNEL =================
    if (cmd === "showc") {
      if (!check(PermissionsBitField.Flags.ManageChannels)) return;
      await message.channel.permissionOverwrites.edit(message.guild.id, {
        ViewChannel: true
      });
      return message.channel.send("👀 Channel visible");
    }

    // ================= ROLE ADD =================
    if (cmd === "addrole") {
      const role = message.mentions.roles.first();
      await member.roles.add(role);
      return message.channel.send("➕ Role added");
    }

    // ================= ROLE REMOVE =================
    if (cmd === "removerole") {
      const role = message.mentions.roles.first();
      await member.roles.remove(role);
      return message.channel.send("➖ Role removed");
    }

    // ================= ROLE ALL =================
    if (cmd === "roleall") {
      const role = message.mentions.roles.first();
      message.guild.members.cache.forEach(m => {
        m.roles.add(role).catch(() => {});
      });
      return message.channel.send("👥 Role given to all");
    }

    // ================= NICK =================
    if (cmd === "nick") {
      const nick = args.slice(2).join(" ");
      await member.setNickname(nick);
      return message.channel.send("✏ Nick changed");
    }

    // ================= WARN =================
    if (cmd === "warn") {
      return message.channel.send(`⚠ Warned ${member.user.tag}`);
    }

    // ================= VOICE CONTROL =================
    if (cmd === "vmute") return member.voice.setMute(true);
    if (cmd === "vunmute") return member.voice.setMute(false);
    if (cmd === "deafen") return member.voice.setDeaf(true);
    if (cmd === "undeafen") return member.voice.setDeaf(false);
    if (cmd === "disconnect") return member.voice.disconnect();

    // ================= SAY =================
    if (cmd === "say") {
      message.delete().catch(() => {});
      return message.channel.send(args.slice(1).join(" "));
    }

    // ================= EMBED =================
    if (cmd === "embed") {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setDescription(args.slice(1).join(" "))
            .setColor("Blue")
        ]
      });
    }

    // ================= SERVER INFO =================
    if (cmd === "serverinfo") {
      return message.channel.send(`🌐 Server: ${message.guild.name} | Members: ${message.guild.memberCount}`);
    }

    // ================= MASS ACTIONS =================
    if (cmd === "masskick") {
      message.guild.members.cache.forEach(m => {
        if (!m.user.bot) m.kick().catch(() => {});
      });
      return message.channel.send("👢 Mass kick done");
    }

    if (cmd === "massban") {
      message.guild.members.cache.forEach(m => {
        if (!m.user.bot) m.ban().catch(() => {});
      });
      return message.channel.send("🔨 Mass ban done");
    }

    // ================= NUKE =================
    if (cmd === "nuke") {
      const clone = await message.channel.clone();
      await message.channel.delete();
      clone.send("💥 Channel nuked");
    }

    // ================= AVATAR =================
    if (cmd === "avatar") {
      const user = member || message.member;
      return message.channel.send(user.user.displayAvatarURL({ dynamic: true }));
    }

    // ================= USERINFO =================
    if (cmd === "userinfo") {
      return message.channel.send(`👤 ${member.user.tag} | ID: ${member.id}`);
    }

  }
};
