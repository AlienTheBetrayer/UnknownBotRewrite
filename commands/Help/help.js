const Discord = require("discord.js");

const config = require("../.././config.json");

module.exports.run = async(client, message, args) => {
    const modules = ["Administration", "Moderation", "Help", "Fun", "Informative", "Events", "Profile", "Levels", "Roleplay"];
    const numberOfCommands = ["5", "7", "4", "5", "7", "10", "4", "2", "11"];


    const modulesInfo = ["```• $eval <js_code>\n• $addrole <guild_member> <role>\n• $removerole <guild_member> <role>\n• $createrole [role_color] <role_name>\n• $deleterole <role_name>```", 
    "```• $ban <guild_member> [reason]\n• $kick <guild_member> [reason]\n• $purge <number_of_messages> [guild_member]\n• $warn <member> [reason]\n• $report <member> <reason>```", 
    "```• $help [module_name/$command_name]\n• $changelog\n• $github\n• $documentation```", 
    "```• $match <person_one> <person_two>\n• $8ball <message>\n• $percentage <message>\n• $randitem <items>\n• $rand <mim> <max>```",
    "```• $avatar [guild_member]\n• $userinfo [guild_member]\n• $botinfo\n• $uptime\n• $ping\n• $guildinfo\n• $roblox```",
    "```• Message Delete\n• Message Bulk Delete\n• Message Edit\n• Emoji Create\n• Emoji Delete\n• Channel Create\n• Channel Delete\n• Member join\n• Member leave\n• Role create\n• Role Delete```",
    "```• $changeprofile <data> <new_value>\n• $profile [guild_member]\n• $resetprofiledata <data>\n• $transferprofile <data> <guild_name>```",
    "```• $lvl [guild_member]\n• $levels```",
    "```• $breakup\n• $do <message>\n• $hug <guild_member>\n• $kill <guild_member>\n• $kiss <guild_member>\n• $me <message>\n• $punch <guild_member>\n• $relationship <guild_member>\n• $relationshipinfo <guild_member>\n• $roleplayinfo <guild_member>\n• $try```"];
    

    const modulesDescription = ["This is module for administration purposes. It has commands that only administrators can run.",
"This is module for moderation purposes. Only moderators can use this.",
"This is help module. Thanks to this module you can see this text.",
"Want to have fun? This module has commands that can make you happy.",
"This module gives information about everything.",
"This module doesn't have any commands, but it has some events that might be useful for the staff team.",
"Profile system module. Each user can have a unique profile which they can customize.",
"Level system module. Each user has their experience and levels, you can see them either by typing a command or seeing it at their profile.",
"Roleplay system module. With this module you can roleplay with friends, it allows you to have love or to have fun with friends using different commands."];

    // ------------------------------------

    const commands = ["$eval", "$ban", "$kick", "$help", "$match", "$avatar", "$addrole", "$removerole", "$createrole", "$deleterole", "$purge", "$userinfo", "$botinfo", "$uptime", "$ping"
,"$warn", "$8ball", "$guildinfo", "$percentage", "$roblox", "$report", "$changeprofile", "$profile", "$resetprofiledata", "$transferprofile", "$lvl",
"$breakup", "$do", "$hug", "$kill", "$kiss", "$me", "$punch", "$relationship", "$relationshipinfo", "$roleplayinfo", "$try", "$levels",
"$rand", "$randitem", "$github", "$documentation", "$changelog"];



    const commandsInfo = [`\`\`\`$eval <js_code> - Evaluates and runs javascript code, will return error description if the code isn't correct.\`\`\``,
`\`\`\`$ban <guild_member> [reason] - Bans guild member with optional reason.\`\`\``,
`\`\`\`$kick <guild_member> [reason] - Kicks guild member with optional reason.\`\`\``,
`\`\`\`$help {$h} [module_name/$command_name] - Gives information about module or command.\`\`\``,
`\`\`\`$match <person_one> <person_two> - Tells whether person_one is a great soulmate to person_two. \`\`\``,
`\`\`\`$avatar {$av} [optional_user] - Gives you optional_user's avatar picture, or yours if you didn't mention anybody.\`\`\``,
`\`\`\`$addrole {$ar} <guild_member> <role> - Adds a role to the guild member.\`\`\``,
`\`\`\`$removerole {$rr} <guild_member> <role> - Removes a role from guild member.\`\`\``,
`\`\`\`$createrole {$cr} [#role_color] <role_name> - Creates a role with a name with an optional color.\`\`\``,
`\`\`\`$deleterole {$dr} <role_name> - Deletes a role with a name.\`\`\``,
`\`\`\`$purge <number_of_messages> [guild_member] - Deletes amount of messages, deletes number_of_messages only by guild_member if guild_member is included.\`\`\``,
`\`\`\`$userinfo {$ui} [guild_member] - Gives information about guild member.\`\`\``,
`\`\`\`$botinfo {$bi} - Gives information about the bot.\`\`\``,
`\`\`\`$uptime - Gives how many time has elapsed since the start of the bot.\`\`\``,
`\`\`\`$ping - Gives bot's and API latency.\`\`\``,
`\`\`\`$warn <user> [reason] - Warns a user with an optional reason.\`\`\``,
`\`\`\`$8ball <message> - Replies randomly to a message.\`\`\``,
`\`\`\`$guildinfo {$gi} - Gives information about current guild.\`\`\``,
`\`\`\`$percentage {$%} <message> - Gives percentages between 1 and 100 on the specified message.\`\`\``,
`\`\`\`$roblox {$rbx} [user] - Gives information about roblox user of the discord user.\`\`\``,
`\`\`\`$report <member> <reason> - Reports a member with a specified reason. \`\`\``,
`\`\`\`$changeprofile <data> <value> - Sets profile data with a new value. \n\n Available data: 'name', 'age', 'status', 'mood', 'love', 'color', 'avatar', 'birthday'. \`\`\``,
`\`\`\`$profile [member] - Shows you the profile of yourself or the member you mentioned. \`\`\``,
`\`\`\`$resetprofiledata <data> - Resets specific data in your profile. Set data to 'ALL' to reset everything.  \n\n Available data: 'name', 'age', 'status', 'mood', 'love', 'color', 'avatar', 'birthday'.  \`\`\``,
`\`\`\`$transferprofile <data> <guild_name> - Transfers specific data in your profile to specific guild. Set data to 'ALL' to transfer everything to that guild. \n\n Available data: 'name', 'age', 'status', 'mood', 'love', 'color', 'avatar', 'birthday'.  \`\`\``,
`\`\`\`$lvl [member] - Gives information about yours or user's level and experience. \`\`\``,
`\`\`\`$breakup - Break-ups with your current love, if you have one.- \`\`\``,
`\`\`\`$do <movement> - Does movement from third person.  \`\`\``,
`\`\`\`$hug <user> - Hugs user.  \`\`\``,
`\`\`\`$kill <user> - Kills user.  \`\`\``,
`\`\`\`$kiss <user> - Kisses user.  \`\`\``,
`\`\`\`$me <movement> - Does movement from your person.  \`\`\``,
`\`\`\`$punch <user> - Punches user.  \`\`\``,
`\`\`\`$relationship {rs} <user> - Proposes a relationship to user, if you and user don't have any love.  \`\`\``,
`\`\`\`$relationshipinfo {rsi} - Gives information about relationship, if you have one.  \`\`\``,
`\`\`\`$roleplayinfo {rpi} - Gives information about all your roleplay actions. (hug, kiss, etc.)  \`\`\``,
`\`\`\`$try <movement> - Tries a movement from your person.\`\`\``,
`\`\`\`$levels {leaderboard} - Gives leaderboard of all levels in current guild. \`\`\``,
`\`\`\`$random <min> <max> {rand} - Gives random in range. \`\`\``,
`\`\`\`$randitem <items> - Gives random item in your message. \`\`\``,
`\`\`\`$github - Gives a link to bot's github page.\`\`\``,
`\`\`\`$documentation - Gives a link to bot's documentation github page. \`\`\``,
`\`\`\`$changelog - Gives a link to bot's changelog github page. \`\`\``];

    if (!args[0]) { // All module names
        const embed = new Discord.MessageEmbed();

        embed.setColor(config.defaultColor);
        embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
        embed.setTimestamp();
        embed.setFooter(`Type $help <module_name> to get information about specific module.`, client.user.displayAvatarURL());
        embed.setTitle("Available modules (press for documentation)");
        embed.setURL("https://github.com/AlienTheBetrayer/UnknownBotRewrite/blob/master/README.md");
        

        embed.addField("**Help**", "```1 command ```", true);
        embed.addField("**Fun**", "```3 commands```", true);
        embed.addField("**Informative**", "```7 command```", true);
        embed.addField("**Administration**", "```5 command```", true);
        embed.addField("**Moderation**", "```5 commands```", true);
        embed.addField("**Profile**", "```4 commands```", true);
        embed.addField("**Events**", "```10 events```", true);
        embed.addField("**Levels**", "```1 command```", true);
        embed.addField("**Roleplay**", "```11 commands```", true);
     

        message.channel.send(embed);
    } else { // Module info
        const prefixIndex = args[0].indexOf(config.prefix);

        if (prefixIndex == -1) {
            for (i = 0; i < modules.length; ++i) {
                if (modules[i].toLowerCase().includes(args[0].toLowerCase())) {
                    const moduleName = modules[i];

                    const embed = new Discord.MessageEmbed();

                    embed.setColor(config.defaultColor);
                    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
                    embed.setTimestamp();
                    embed.setFooter(`Type ${config.prefix}help <${config.prefix}command_name> to get help about specific command.`, client.user.displayAvatarURL());
                    embed.setTitle(moduleName + " module help")
                    embed.setDescription(modulesDescription[i] + "\n\n" + modulesInfo[i]);

                    message.channel.send(embed);

                    break;
                }
            }
        } else { // Command info
            for (i = 0; i < commands.length; ++i) {
                if(commands[i].toLowerCase().includes(args[0].toLowerCase())) {
                    const commandName = commands[i];

                    const embed = new Discord.MessageEmbed();

                    embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
                    embed.setTimestamp();
                    embed.setTitle(commandName + " command help");
                    embed.setColor(config.defaultColor);
                    embed.setDescription(commandsInfo[i]);
                    embed.setFooter(`${config.prefix}help`, client.user.displayAvatarURL());

                    message.channel.send(embed);

                    break;
                }
            }
        }
    }
}

module.exports.config = {
    name: "help",
    aliases: ["h"]
}