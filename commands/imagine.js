const { AttachmentBuilder } = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Using Nano Banana 2 (Gemini 3.1 Image Preview)
const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-image-preview" });

module.exports = {
    name: "imagine",
    async execute(message, args) {
        const prompt = args.join(" ");
        if (!prompt) return message.reply("❌ Use: `+imagine a cool cat`!");

        await message.channel.sendTyping();
        const msg = await message.reply("🎨 Drawing...");

        try {
            const result = await model.generateContent(prompt);
            const artifact = result.response.artifacts?.[0];

            if (!artifact?.base64) return msg.edit("❌ Safety filter blocked this prompt.");

            const attachment = new AttachmentBuilder(Buffer.from(artifact.base64, 'base64'), { name: 'ai.png' });
            await msg.delete();
            await message.reply({ content: `🖌️ **${prompt}**`, files: [attachment] });
        } catch (e) {
            msg.edit("❌ Error generating image.");
        }
    }
};
