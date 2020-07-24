const Discord = require("discord.js");
const random = require("random");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    const modules_and_information = new Map(
        [["Administration", "Module only administrators can use."],
        ["Coins", "This module introduces coins system, you can buy items in admin-created shops, 2 commands, transfer coins to other people and more"],
        ["Fun", "With this module you can have some fun and laugh."],
        ["Help", "Thanks to this module you are currently reading this."],
        ["Informative", "This module just gives information about stuff."],
        ["Level", "With this module everyone can have their own level, you can see the leaderboard, each level you get coins."],
        ["Moderation", "Only moderators can use this module."],
        ["Profile", "Profile system module, everyone can have their own fully customizable profile, you can change everything."],
        ["Roleplay", "Roleplay module, has all the commands you need for roleplaying with you friends."],
        ["Events", "Events module. This is useful for administrators who want to see logs of the server."]]
    );

    const module_specific_commands = new Map(
        [["Administration", ["addrole", "createrole", "deleterole", "evaluate", "removerole"]],
        ["Coins", ["buyitem", "coins", "createitem", "createstore", "deleteitem", "deletestore", "getitemdescription", "inventory", "setitemdescription", "store", "transfercoins"]],
        ["Fun", ["8ball", "embedmessage", "embedmessagecolor", "match", "percentage", "rand", "randitem"]],
        ["Help", ["changelog", "documentation", "github", "help"]],
        ["Informative", ["avatar", "botinfo", "guildinfo", "ping", "roblox", "uptime", "userinfo"]],
        ["Level", ["leaderboard", "userlevel"]],
        ["Moderation", ["ban", "kick", "mute", "purge", "report","unban", "warn"]],
        ["Profile", ["changeprofile", "profile", "resetprofiledata", "transferprofile"]],
        ["Roleplay", ["breakup", "do", "hug", "kill", "kiss", "me", "punch", "relationship", "relationshipinfo", "roleplayinfo", "try"]],
        ["Events", ["Message delete", "Message bulk delete", "Message edit", "Emoji create", "Emoji delete", "Channel create", "Channel delete", "Member join", "Member leave", "Role create", "Role delete"]]]
    );

    // commandname: args: description
    const commands_and_information = new Map( 
        // Administration
        [[["addrole", "ar"], ["<member> <role>", "Adds a role to the member."]],
        [["createrole", "cr"], ["[#hex_color] <role_name>", "Creates a role with a name and an optional color."]],
        [["deleterole", "dr"], ["<role>", "Deletes a role."]],
        [["evaluate", "eval"], ["<js>", "Evaluates a javascript code."]],
        [["removerole", "rr"], ["<member> <role>", "Removes a role from the member."]],

        // Coins
        [["buyitem", "itembuy"], ["<item_name>", "Buys an item in the store."]],
        [["coins"], ["[member]", "Tells how many coins you or a specified member have."]],
        [["createitem", "itemcreate"], ["<cost> <item_name>", "Creates an item in the store with cost."]],
        [["createstore", "createshop", "createmarket"], ["<void>", "Creates a store in the guild if it does not exist yet."]],
        [["deleteitem", "itemdelete"], ["<item_name>", "Deletes an item in the store."]],
        [["deletestore"], ["<void>", "Deletes a store in the guild if it exists."]],
        [["getitemdescription", "getiteminfo"], ["<void>", "Gets an item's description."]],
        [["inventory"], ["<void>", "Tells every single item you have in your inventory."]],
        [["setitemdescription", "setiteminfo"], ["<item_name> | <item_description>", "Sets item's description."]],
        [["store", "shop", "market"], ["<void>", "Tells every single item your guild's store has."]],
        [["transfercoins"], ["<amount> <user>", "Transfers coins to another user."]],

        // Fun
        [["8ball"], ["<message>", "Gives a random answer on your message."]],
        [["embedmessage", "embedmsg"], ["<message>", "Deletes your message and sends a new one in an embed.\n\nYou can get this command by buying it(1000)."]],
        [["embedmessagecolor", "embedmsgclr"], ["<#hex_color> <message>", "Deletes your message and sends a new one in an embed with specified hexadecimal color.\n\nYou can get this command by buying $embedmessage(1000) and an upgrade to it(500)."]],
        [["match"], ["<person_one> <person_two>", "Matches love chances of two people."]],
        [["percentage", "%"], ["<message>", "Gives a percentage on the message."]],
        [["random", "rand"], ["<min> <max>", "Gives a random number in between given range."]],
        [["randomitem", "randitem"], ["<items>", "Gives a random item out of your items."]],

        // Help
        [["changelog"], ["<void>", ""]],
        [["documentation"], ["<void>", ""]],
        [["github"], ["<void>", ""]],
        [["help"], ["[module_name]/[$command_name]", "Gives a help about module/command name."]],

        // Informative
        [["avatar", "av"], ["[member]", "Gives avatar of the member."]],
        [["botinfo", "bi"], ["<void>", "Tells information about this bot."]],
        [["guildinfo", "gi"], ["<void>", "Tells information about current guild."]],
        [["ping"], ["<void>", "Gives bot's ping."]],
        [["roblox", "rbx"], ["[member]", "Gives roblox user of the member."]],
        [["uptime"], ["<void>", "Gives bot's uptime."]],
        [["userinfo", "ui"], ["[member]", "Gives information about member."]],

        // Level
        [["leaderboard", "levels", "lvls", "top"], ["<void>", "Shows the top 5 levels of the current guild."]],
        [["lvl", "userlevel"], ["[member]", "Tells the level and some more cool stuff about level of the member."]],
        
        // Moderation
        [["ban"], ["<member> [reason]", "Bans a member with an optional reason."]],
        [["kick"], ["<member> [reason]", "Kicks a member with an optional reason."]],
        [["mute"], ["<member> <time<s/m/h/d>> [reason]", "Not implemented yet."]],
        [["purge", "prune"], ["<amount>", "Purges amount of messages."]],
        [["report"], ["<member> <report_message>", "Reports a member with specified message. All messages go to #reports channel."]],
        [["unban"], ["<member>", "Unbans a member."]],
        [["warn"], ["<member> [reason]", "Warns a member with an optional reason."]],

        // Profile
        [["changeprofile", "profilechange"], ["<data> <new_value>", "Changes your profile's data to new value. Check documentation for all available datas."]],
        [["profile"], ["[member]", "Gives the profile of the member."]],
        [["resetprofiledata"], ["<data>", "Resets your prfile's data. Check documentation for all available datas."]],
        [["transferprofile"], ["<data> <guild_name>", "Copies data from one guild to another. Check documentation for all available datas."]],

        // Roleplay
        [["breakup"], ["<void>", "Breaks up with your current love."]],
        [["do"], ["<message>", "Does a message."]],
        [["hug"], ["<member>", "Hugs a member."]],
        [["kill"], ["<member>", "Kills a member."]],
        [["kiss"], ["<member>", "Kisses a member."]],
        [["me"], ["<message>", "Does a message from your perspective."]],
        [["punch"], ["<member>", "Punches a member."]],
        [["relationship", "rs"], ["<member>", "Proposes a relationship to another member. They can either accept or decline the proposal."]],
        [["relationshipinfo", "rsi"], ["[void]", "Tells information about your relationship if you have one."]],
        [["roleplayinfo", "rpi"], ["[member]", "Tells about members' roleplay information."]],
        [["try"], ["<message>", "Tries a message."]]]
    );

    const helpObject = args[0];

    if(!helpObject) { // General help
        const embed = new Discord.MessageEmbed();

        embed.setColor(config.defaultColor);
        embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
        embed.setTimestamp();
        embed.setFooter(`${config.prefix}help | $h <module_name> to get information about module.`, client.user.displayAvatarURL());

        let commands = 0;

        for(const [key, value] of module_specific_commands.entries()) {
            commands += value.length;
            embed.addField(key, `\`\`\`${value.length}\`\`\``, true);
        }

        embed.setTitle(`${commands} commands | All modules help(link for documentation)`);
        embed.setURL("https://github.com/AlienTheBetrayer/UnknownBotRewrite/blob/master/README.md");

        message.channel.send(embed);
    } else if(!helpObject.startsWith("$")) { // Module-specific help
        for(const [key, value] of modules_and_information.entries()) {
            if(key.toLowerCase().indexOf(helpObject.toLowerCase()) != -1) {
                const embed = new Discord.MessageEmbed();
    
                embed.setColor(config.defaultColor);
                embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
                embed.setTimestamp();
                embed.setFooter(`${config.prefix}help | $h <$command_name> to get information about command. `, client.user.displayAvatarURL());
                embed.setTitle(`${key} module help`);

                let commands = "";

                for(const [k, v] of module_specific_commands.get(key).entries()) {
                    commands += ((key.toLowerCase() != "events") ? "$" : "") + `${v}\n`;
                }
                
                embed.setDescription(value + `\`\`\`\n${commands}\`\`\``);

                message.channel.send(embed);

                break;
            }   
        }
    } else { // Command-specific help
        for(const [key, value] of commands_and_information.entries()) {
            let found = false;

            for(let i = 0; i < key.length; ++i) {
                if(`$${key[i]}`.toLowerCase().indexOf(helpObject.toLowerCase()) != -1 && key != "") {
                    let msg;

                    msg = `$${key[i]}` + " " + ((value[0] != "<void>") ? value[0] : "") + ((value[0] == "<void>") ? "- " : " - ") + `${value[1]}`;

                    const embed = new Discord.MessageEmbed();
    
                    embed.setColor(config.defaultColor);
                    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
                    embed.setTimestamp();
                    embed.setFooter(`${config.prefix}help`, client.user.displayAvatarURL());
                    embed.setTitle(`$${key[i]} command help`);
                    embed.setDescription(`\`\`\`json\n${msg}\`\`\``);

                    message.channel.send(embed);
                    found = true;

                    break;
                }
            }

            if(found)
                break;
        }
    }
}

module.exports.config = {
    name: "help",
    aliases: ["h"]
}