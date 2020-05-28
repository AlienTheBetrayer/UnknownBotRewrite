const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    const msg = args[0];

    console.log(msg);

    for(i = 0; i < msg.length; ++i) {
        message.react("\\:regional_indicator_a:");
    }
}

module.exports.config = {
    name: "reactmessage",
    aliases: ["reactmsg"]
}