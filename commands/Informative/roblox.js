const Discord = require("discord.js");
const snekfetch = require("snekfetch");

const config = require("../../config.json");

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

module.exports.run = async(client, message, args) => {
    let member = message.mentions.members.first();
    let found = false;

    if(!member && args[0]) { // text
        const members = message.guild.members.cache;

        members.forEach(cachedMember => {
            if(cachedMember.user.username.toLowerCase().includes(args[0].toLowerCase())) {
                member = cachedMember;
                found = true;
            }
        });
    }

    if(!args[0]) { // myself
        member = message.member;
    }
    
    const url = "https://verify.eryn.io/api/user/"
    snekfetch.get(url + member.user.id).then(r => {
           let body = r.body; 
           
           if(body.status != "ok") {
                message.react(config.wrongEmoji);
                return;
           }

           const embed = new Discord.MessageEmbed();
    
           embed.setColor(config.defaultColor);
           embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
           embed.setTimestamp();
           embed.setTitle("Roblox Profile");
           embed.setFooter(`${config.prefix}warn`, client.user.displayAvatarURL());
           embed.setURL(`https://www.roblox.com/users/${body.robloxId}/profile`)
           embed.addField("Roblox Username", "```" + body.robloxUsername +"```");
           embed.addField("Roblox Identificator", "```" + body.robloxId +"```");

           message.channel.send(embed);
    });
    
}

module.exports.config = {
    name: "roblox",
    aliases: ["rbx"]
}