![](https://cdn.discordapp.com/avatars/707252972521783327/3568593a2b72d19f490611a47f94e678.png?size=512)
# Unknown Bot
## About bot and documentation
This is a multipurpose Discord bot. This bot is structured in different modules, which have different commands.

This documentation will explain each module. It'll also explain each and every command, moreover they will have an explanation and an example to them, so everyone can understand how to use them. If you see \<arg\>, that means you **must** type it in order for command to work, if its **[arg]**, then, its optional, you don't have to type it.
# Modules
## Administration
Using this module requires you to have administrator permissions.
#### \$addrole/\$ar \<guild_member\> \<role\>
Adds a specified role to the specified guild member. You can either use a role/membermention, or just type their name, the bot will automatically search for it.
```
$addrole @username @rolename
$addrole username rolename
```
#### \$removerole/\$rr \<guild_member\> \<role\>
Removes a specified role from the specified member. You can either use a role/membermention, or just type their name, the bot will automatically search for it.
```
$removerole @username @rolename
$rr username rolename
```
####  \$createrole/\$cr [role_color] \<role_name\>
Creates a role with a name with optional color, a hex color must start with **#**.
```
$createrole #ff0000 Cool red role
$cr Cool no color role
```
#### \$deleterole/\$dr \<role_name\>
Deletes a role with specified name. You can either use a mention or a name, bot will automatically search for it.
```
$deleterole Bad role
$dr @Bad Role
```
#### \$evaluate/\$eval  \<code...\>
Evaluates a Discord.js code, this command can only be used by creator of the bot. 
```
$eval <...>
```
## Moderation
Using this module requires you to be a moderator, 
#### $ban \<guild_member\> [reason]
Bans a specified guild member with an optional reason.
```
$ban @username Broke too many rules.
$ban username
```
#### $unban \<guild_member\>
Unbans a specified guild member.
```
$unban @username
```
#### $kick \<guild_member\> [reason]
Kicks a specified guild member with an optional reason.
```
$kick @username Broke a few rules.
$kick username
```
#### $purge \<amount_of_messages\>
Purges specified amount of messages.
```
$purge 57
```
#### $warn \<guild_member\> [reason]
Warns a specified guild member with an optional reason.
```
$warn @username Stop breaking rules!
$warn username
```
#### $report \<guild_member\> \<message\>
```
$report @username He is cursing on me in DMs! :(
```
Reports a specified guild member with a message, all reports go to **#reports** channel. If the channel does not exist, it creates a new one.
## Fun
This module has commands that you can have fun with.
#### $match <person_one> <person_two>
Matches two people, gives the percentage of their love and a corresponding message. Supports mentions.
```
$match boy girl
```
#### $8ball \<message\>
Gives a message that answers your message.
```
$8ball Is this documentation good?
```
#### \$percentage/\$% \<message\>
Gives a percentage on your message.
```
$percentage How well is this bot made?
```
## Informative
This module gives information about something or someone.

#### \$avatar/\$av [guild_member]
Gives an avatar of the specified guild member, if none specified, it will show your own avatar.
```
$avatar @username
$av 
```
#### \$userinfo/\$ui [guild_member]
Tells the information about the specifed guild member, if none specified, will tell the information about you.
```
$userinfo @username
$ui
```
#### \$botinfo/\$bi
Tells the information about this bot.
```
$botinfo
$bi
```
#### $uptime
Gives the current uptime of the bot, in other words, how much time the bot is working.
```
$uptime
```
#### $ping
Gives the bot's ping and Discord API's ping.
```
$ping
```
#### \$guildinfo/\$gi
Gives information about the current guild.
```
$guildinfo
$gi
```
#### \$roblox/\$rbx [guild_member]
Gives roblox id, username, and link to the profile of the specified guild, if none specified gives your roblox.
```
$roblox @username
$rbx
```
#### \$coronavirus/\$covid [country]
Gives information about coronavirus in the specified country, or if not specified, about the whole world.
```
$coronavirus
$covid germany
```	
## Help
This module is for help purposes.
#### \$help/\$h [module_name/\$command_name]
Gives help about all modules/specified module/command.
```
$h
$help fun
$help $rbx
```
## Profile
Profile system module. Each guild member can have their own profile with their own style.
All data that you can enter in the commands below:
```
name, age, status, mood, love, color, avatar, birthday
``` 
#### $profile [guild_member]
Shows a profile of specified guild member, if none specified, shows your profile.
```
$profile @username
$profile
```
#### \$changeprofile/\$profilechange \<data\> \<new_value\>
Replaces your profile's specified data with a new value. Scroll up to see all the data you can enter.
```
$changeprofile name Bob
$changeprofile color 00ff00
$profilechange avatar 
```
#### $resetprofiledata \<data>
Resets specified data of your profile. Scroll up to see all the data you can enter. You can also enter ALL if you want to reset everything.
```
$resetprofiledata ALL
$resetprofiledata status
```
#### $transferprofile \<data> \<guild_name\>
Transfers specified data to specified guild. Scroll up to see all the data you can enter. You can also enter ALL if you want to transfer everything.
```
$transferprofile ALL guild_name
$transferprofile status guild_name
```
## Level
Level module.
#### $lvl [guild_member]
Gives your level information or specified guild member's.
```
$lvl
$lvl @username
```
#### \$leaderboard/\$levels
Lists Top 10 of all levels in the current guild.
```
$leaderboard
```
## Roleplay
You can roleplay with this module.
#### $breakup
Breaks up with your relationship partner, if you have one.
```
$breakup
```
#### $do \<message\>
Roleplay do command.
```
$do get a torch.
```
#### $me \<message\>
Roleplay me command.
```
$me gets a torch.
```
#### $try \<message\>
Roleplay try command.
```
$try punch zombie.
```
#### $hug \<guild_member\>
Hugs a guild member.
```
$hug @username
```
#### $kiss \<guild_member\>
Kisses a guild member.
```
$kiss @username
```
#### $punch \<guild_member\>
Punches a guild member.
```
$punch @username
```
#### \$relationship/\$rs \<guild_member\>
Proposes a guild member to enter a relationship with you. They have to type **relationship/rs accept**.
```
$relationship @username
```
#### \$relationshipinfo/\$rsinfo/\$rsi \<guild_member\>
Gives information about your or specified guild member's current relationship, if you have one.
```
$relationshipinfo
$rsinfo @username
```
#### \$roleplayinfo/\$rpinfo/\$rpi \<guild_member\>
Gives information about your or specified guild member's roleplay.
```
$roleplayinfo
$rpinfo @username
```
## Events
This is a module which sends log messages to #logs channel in the guild, if the channel does not exist, it creates a new one. All the events which bot logs are listed below.
- #### Message delete (will also log images)
- #### Message bulk delete
- #### Message edit
- #### Emoji delete
- #### Emoji create
- #### Channel create
- #### Channel delete
- #### Member join
- #### Member leave
- #### Role create
- #### Role delete
