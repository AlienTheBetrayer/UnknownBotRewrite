const Discord = require("discord.js");  
const snekfetch = require("snekfetch");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    let country = args.slice(0).join(" ");

    if(!country) {
        country = "Global";
    }

    const url = "https://api.covid19api.com/summary";

    let countryInfo;

    snekfetch.get(url).then(r => {
        if(!r) {
            message.react(config.wrongEmoji);
            return;
        }

        let found = false;

        const body = r.body;
        if(country != "Global") {
            body.Countries.forEach(countries => {
                if(countries.Country.toLowerCase().includes(country.toLowerCase())) {
                    countryInfo = countries;
                    found = true;
                 }
            });
        } else {
            countryInfo = body.Global;
        }

        if(!found) {
            countryInfo = body.Global;
        }

        
    const embed = new Discord.MessageEmbed();
    
    embed.setColor(config.defaultColor);
    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
    embed.setTimestamp();
    embed.setFooter(`${config.prefix}coronavirus`, client.user.displayAvatarURL());
    if(countryInfo != body.Global) {
    embed.setTitle(`${countryInfo.Country} information about COVID-19`);
    } else {
        embed.setTitle(`World information about COVID-19`);
    }
    embed.addField("Total Confirmed", "```" + countryInfo.TotalConfirmed + "```", true);
    embed.addField("Total Recovered", "```" + countryInfo.TotalRecovered + "```", true);
    embed.addField("Total Deaths", "```" + countryInfo.TotalDeaths + "```", true);
    embed.addField("New Confirmed", "```" + countryInfo.NewConfirmed + "```", true);
    embed.addField("New Recovered", "```" + countryInfo.NewRecovered + "```", true);
    embed.addField("New Deaths", "```" + countryInfo.NewDeaths + "```", true);
    
    message.channel.send(embed);
    message.react(config.correctEmoji);
    });
}

module.exports.config = {
    name: "coronavirus",
    aliases: ["covid"]
}