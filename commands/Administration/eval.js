const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    if(message.author.id != "351382367530647554") return;

    let last, first, code;
    let correct = false;

    first = message.content.indexOf("`");
    last = message.content.length;
    code = message.content.substring(first + 5, last - 3);

    let linesArray = [];
    linesArray = code.match(/[^\r\n]+/g);

    let advancedFunctionNames = ["SEND_"];
    
    let advancedFunctionsCodes = [
        function SEND_(lines, index, func, code) {
            lines[index] = lines[index].replace(func, code);
            setTimeout(() => {
                message.delete();
            }, 100);
        }
    ];

    let functionsNames = ["send_"];
    let functionsCode = ["message.channel.send"];

    for (i = 0; i < linesArray.length; ++i) {
        for (j = 0; j < functionsNames.length; ++j) {
                if(linesArray[i].indexOf(functionsNames[j]) != -1) {
                    linesArray[i] = linesArray[i].replace(functionsNames[j], functionsCode[j]);
                }
        }

        for(k = 0; k < advancedFunctionNames.length; ++k) {
            const funcIndex = linesArray[k].indexOf(advancedFunctionNames[k]);

            if (funcIndex != -1) { // found func. k is index in the array of the functions
                if(advancedFunctionNames[k] == advancedFunctionNames[0]) { // hiddensend
                        advancedFunctionsCodes[0](linesArray, i, advancedFunctionNames[k], functionsCode[0]);
                }
            }
        }
    }

    code = linesArray.join("\n");

    try {
        if (eval(code)) {
            correct = true;
        } 
    } catch(err) {
        const embed = new Discord.MessageEmbed();
            embed.setTitle("Compile error");
            embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
            embed.setTimestamp();
            embed.setColor(config.errorColor);
            embed.setDescription("```" + err.message + "```");
            embed.setFooter(`${config.prefix}eval`, client.user.displayAvatarURL());

        message.react(config.wrongEmoji);
        message.channel.send(embed);
    }


if (correct) { 
    message.react(config.correctEmoji);
} 

}

module.exports.config = {
    name: "evaluate",
    aliases: ["eval", "ev"]
}   