const {
  EmbedBuilder,
  PermissionsBitField
} = require("discord.js");

module.exports = {
  name: "mod",

  async execute(message, args) {

    const cmd = args[0]?.toLowerCase();
    const member = message.mentions.members.first();
    const reason = args.slice(2).join(" ") || "No reason provided";

    // ================= MAIN EMBED =================
    const mainEmbed = (title, desc, color = "Blurple") => {
      return new EmbedBuilder()
        .setTitle(title)
        .setDescription(desc)
        .setColor(color)
        .setFooter({ text: `${message.guild.name} Moderation System` })
        .setTimestamp();
    };

    // ================= HELP =================
    if (!cmd || cmd === "help") {

      const help = new EmbedBuilder()
        .setTitle("⚔️ PROFESSIONAL MODERATION PANEL")
        .setDescription(`
╔════════════════════╗
🛡️ **BAN SYSTEM**
\`ban\` \`unban\` \`massban\` \`softban\`

👢 **KICK SYSTEM**
\`kick\` \`masskick\`

🔇 **MUTE SYSTEM**
\`mute\` \`unmute\` \`vmute\` \`vunmute\`

🎧 **VOICE SYSTEM**
\`deafen\` \`undeafen\` \`move\` \`disconnect\`

🧹 **CHAT SYSTEM**
\`clear\` \`purge\` \`nuke\` \`slowmode\`

🔒 **CHANNEL SYSTEM**
\`lock\` \`unlock\` \`hidec\` \`showc\`

🏷️ **ROLE SYSTEM**
\`addrole\` \`removerole\` \`roleall\`

👤 **USER SYSTEM**
\`nick\` \`avatar\` \`userinfo\`

🌍 **SERVER SYSTEM**
\`serverinfo\`

📢 **UTILITY**
\`say\` \`embed\` \`announce\` \`poll\`

⚠️ **WARNING SYSTEM**
\`warn\` \`warnings\`

🛠️ **EXTRA**
\`hackban\` \`untimeout\` \`timeout\`
╚════════════════════╝
        `)
        .setColor("Red")
        .setThumbnail(message.guild.iconURL())
        .setFooter({ text: "Professional Moderation System" });

      return message.channel.send({ embeds: [help] });
    }

    // ================= BAN =================
    if (cmd === "ban") {
      if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers))
        return;

      if (!member)
        return message.reply("❌ Mention a user.");

      await member.ban({ reason });

      return message.channel.send({
        embeds: [
          mainEmbed(
            "🔨 USER BANNED",
            `✅ ${member.user.tag} has been banned.\n📄 Reason: ${reason}`,
            "Red"
          )
        ]
      });
    }

    // ================= UNBAN =================
    if (cmd === "unban") {

      const id = args[1];
      if (!id) return;

      await message.guild.members.unban(id);

      return message.channel.send({
        embeds: [
          mainEmbed(
            "✅ USER UNBANNED",
            `User ID \`${id}\` has been unbanned.`,
            "Green"
          )
        ]
      });
    }

    // ================= KICK =================
    if (cmd === "kick") {

      if (!member) return;

      await member.kick(reason);

      return message.channel.send({
        embeds: [
          mainEmbed(
            "👢 USER KICKED",
            `${member.user.tag} was kicked.\n📄 Reason: ${reason}`,
            "Orange"
          )
        ]
      });
    }

    // ================= CLEAR =================
    if (cmd === "clear" || cmd === "purge") {

      const amount = parseInt(args[1]);

      if (!amount)
        return message.reply("❌ Enter amount.");

      await message.channel.bulkDelete(amount, true);

      const msg = await message.channel.send({
        embeds: [
          mainEmbed(
            "🧹 CHAT CLEARED",
            `✅ Deleted ${amount} messages.`,
            "Green"
          )
        ]
      });

      setTimeout(() => msg.delete().catch(() => {}), 3000);
    }

    // ================= WARN =================
    if (cmd === "warn") {

      if (!member) return;

      return message.channel.send({
        embeds: [
          mainEmbed(
            "⚠️ USER WARNED",
            `${member.user.tag} has been warned.\n📄 Reason: ${reason}`,
            "Yellow"
          )
        ]
      });
    }

    // ================= MUTE =================
    if (cmd === "mute" || cmd === "timeout") {

      if (!member) return;

      await member.timeout(10 * 60 * 1000);

      return message.channel.send({
        embeds: [
          mainEmbed(
            "🔇 USER MUTED",
            `${member.user.tag} muted for 10 minutes.`,
            "Blue"
          )
        ]
      });
    }

    // ================= UNMUTE =================
    if (cmd === "unmute" || cmd === "untimeout") {

      if (!member) return;

      await member.timeout(null);

      return message.channel.send({
        embeds: [
          mainEmbed(
            "🔊 USER UNMUTED",
            `${member.user.tag} has been unmuted.`,
            "Green"
          )
        ]
      });
    }

    // ================= LOCK =================
    if (cmd === "lock") {

      await message.channel.permissionOverwrites.edit(message.guild.id, {
        SendMessages: false
      });

      return message.channel.send({
        embeds: [
          mainEmbed(
            "🔒 CHANNEL LOCKED",
            "This channel is now locked.",
            "Red"
          )
        ]
      });
    }

    // ================= UNLOCK =================
    if (cmd === "unlock") {

      await message.channel.permissionOverwrites.edit(message.guild.id, {
        SendMessages: true
      });

      return message.channel.send({
        embeds: [
          mainEmbed(
            "🔓 CHANNEL UNLOCKED",
            "This channel is now unlocked.",
            "Green"
          )
        ]
      });
    }

    // ================= HIDE CHANNEL =================
    if (cmd === "hidec") {

      await message.channel.permissionOverwrites.edit(message.guild.id, {
        ViewChannel: false
      });

      return message.channel.send("🙈 Channel hidden");
    }

    // ================= SHOW CHANNEL =================
    if (cmd === "showc") {

      await message.channel.permissionOverwrites.edit(message.guild.id, {
        ViewChannel: true
      });

      return message.channel.send("👀 Channel visible");
    }

    // ================= NICK =================
    if (cmd === "nick") {

      const nick = args.slice(2).join(" ");

      if (!member) return;

      await member.setNickname(nick);

      return message.channel.send(`✅ Nickname changed to ${nick}`);
    }

    // ================= SLOWMODE =================
    if (cmd === "slowmode") {

      const time = parseInt(args[1]);

      await message.channel.setRateLimitPerUser(time);

      return message.channel.send(`🐢 Slowmode set to ${time}s`);
    }

    // ================= ADD ROLE =================
    if (cmd === "addrole") {

      const role = message.mentions.roles.first();

      if (!member || !role) return;

      await member.roles.add(role);

      return message.channel.send(`✅ Role added`);
    }

    // ================= REMOVE ROLE =================
    if (cmd === "removerole") {

      const role = message.mentions.roles.first();

      if (!member || !role) return;

      await member.roles.remove(role);

      return message.channel.send(`❌ Role removed`);
    }

    // ================= ROLE ALL =================
    if (cmd === "roleall") {

      const role = message.mentions.roles.first();

      if (!role) return;

      message.guild.members.cache.forEach(m => {
        m.roles.add(role).catch(() => {});
      });

      return message.channel.send(`✅ Role given to all users`);
    }

    // ================= SAY =================
    if (cmd === "say") {

      const text = args.slice(1).join(" ");

      message.delete().catch(() => {});

      return message.channel.send(text);
    }

    // ================= EMBED =================
    if (cmd === "embed") {

      const text = args.slice(1).join(" ");

      const embed = new EmbedBuilder()
        .setDescription(text)
        .setColor("Blurple");

      return message.channel.send({ embeds: [embed] });
    }

    // ================= AVATAR =================
    if (cmd === "avatar") {

      const user = member ? member.user : message.author;

      const embed = new EmbedBuilder()
        .setTitle(`${user.username}'s Avatar`)
        .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setColor("Blue");

      return message.channel.send({ embeds: [embed] });
    }

    // ================= USER INFO =================
    if (cmd === "userinfo") {

      const user = member || message.member;

      const embed = new EmbedBuilder()
        .setTitle("👤 USER INFO")
        .addFields(
          { name: "Username", value: user.user.tag, inline: true },
          { name: "ID", value: user.id, inline: true },
          { name: "Joined", value: `<t:${parseInt(user.joinedTimestamp / 1000)}:R>`, inline: true }
        )
        .setThumbnail(user.user.displayAvatarURL())
        .setColor("Blue");

      return message.channel.send({ embeds: [embed] });
    }

    // ================= SERVER INFO =================
    if (cmd === "serverinfo") {

      const embed = new EmbedBuilder()
        .setTitle("🌍 SERVER INFO")
        .addFields(
          { name: "Server Name", value: message.guild.name, inline: true },
          { name: "Members", value: `${message.guild.memberCount}`, inline: true },
          { name: "Owner", value: `<@${message.guild.ownerId}>`, inline: true }
        )
        .setThumbnail(message.guild.iconURL())
        .setColor("Purple");

      return message.channel.send({ embeds: [embed] });
    }

    // ================= VOICE MUTE =================
    if (cmd === "vmute") {

      if (!member) return;

      await member.voice.setMute(true);

      return message.channel.send("🔇 Voice muted");
    }

    // ================= VOICE UNMUTE =================
    if (cmd === "vunmute") {

      if (!member) return;

      await member.voice.setMute(false);

      return message.channel.send("🔊 Voice unmuted");
    }

    // ================= DEAFEN =================
    if (cmd === "deafen") {

      if (!member) return;

      await member.voice.setDeaf(true);

      return message.channel.send("🎧 User deafened");
    }

    // ================= UNDEAFEN =================
    if (cmd === "undeafen") {

      if (!member) return;

      await member.voice.setDeaf(false);

      return message.channel.send("🎧 User undeafened");
    }

    // ================= DISCONNECT =================
    if (cmd === "disconnect") {

      if (!member) return;

      await member.voice.disconnect();

      return message.channel.send("📴 User disconnected");
    }

    // ================= MOVE =================
    if (cmd === "move") {

      const channel = message.mentions.channels.first();

      if (!member || !channel) return;

      await member.voice.setChannel(channel);

      return message.channel.send("➡️ User moved");
    }

    // ================= ANNOUNCE =================
    if (cmd === "announce") {

      const text = args.slice(1).join(" ");

      const embed = new EmbedBuilder()
        .setTitle("📢 ANNOUNCEMENT")
        .setDescription(text)
        .setColor("Gold");

      return message.channel.send({ embeds: [embed] });
    }

    // ================= POLL =================
    if (cmd === "poll") {

      const text = args.slice(1).join(" ");

      const poll = await message.channel.send(`📊 **POLL**\n${text}`);

      await poll.react("✅");
      await poll.react("❌");
    }

    // ================= MASS KICK =================
    if (cmd === "masskick") {

      message.guild.members.cache.forEach(m => {
        if (!m.user.bot) m.kick().catch(() => {});
      });

      return message.channel.send("👢 Mass kick completed");
    }

    // ================= MASS BAN =================
    if (cmd === "massban") {

      message.guild.members.cache.forEach(m => {
        if (!m.user.bot) m.ban().catch(() => {});
      });

      return message.channel.send("🔨 Mass ban completed");
    }

    // ================= HACKBAN =================
    if (cmd === "hackban") {

      const id = args[1];

      if (!id) return;

      await message.guild.members.ban(id);

      return message.channel.send(`🔨 Hackbanned user ID ${id}`);
    }

    // ================= NUKE =================
    if (cmd === "nuke") {

      const cloned = await message.channel.clone();

      await message.channel.delete();

      cloned.send("💥 Channel nuked successfully");
    }

  }
};
