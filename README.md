
![](https://cdn.discordapp.com/avatars/707252972521783327/3568593a2b72d19f490611a47f94e678.png?size=512)
# Unknown Bot
## About bot and documentation
**WARNING**: Expect bugs as I am still developing this bot.

This is a multipurpose Discord bot. This bot is structured in different modules, which have different commands.

The bot status is usually like this: Stable v1.0.0a | $help. Stable here means that it is stable to use and it is on my hosting, if its Indev, I do not recommend using it as it is currently in development and probably something is being fixed. v1.0.0a means the version, I usually put letters there indicating that the update is just a bug fix.

This documentation will explain each module. It'll also explain each and every command, moreover they will have an explanation and an example to them, so everyone can understand how to use them. If you see \<arg\>, that means you **must** type it in order for command to work, if its **[arg]**, then, its optional, you don't have to type it.
## Do you want an invite?
Here it is: [Invite](https://discord.com/oauth2/authorize?client_id=707252972521783327&scope=bot&permissions=8)

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
## Coins
This is a coins module, which has a system of coins, store, inventory, buying differen store items, etc.
#### $buyitem \<item_name\>
Buys an item in a store with specified name.
```
$buyitem Epic item
```
#### $coins [guild_member]
Tells how many coins do you have, or guild member, if specified.
```
$coins
$coins @Somebody
```
#### $createitem \<cost\> \<item_name\>
Creates an item in the store with specified cost and name. Only administrators of the guild can use this command.
```
$createitem 1000 This item is not so expensive
```
#### $createstore
Creates a store in the guild, two items get automatically created. Only administrators of the guild can use this command.
```
$createstore
```
#### $deleteitem \<item_name\>
Deletes an item from the guild's store. Only administrators of the guild can use this command.
```
$deleteitem Item name
```
#### $deletestore
Deletes a store in the guild. Only administrators of the guild can use this command.
```
$deletestore
```
#### $inventory
Gives you every single item in your inventory.
```
$inventory
```
#### $store
Gives you every single item in a store in a guild.
```
$store
```
#### $transfercoins \<amount\> \<guild_member\>
Transfers coins from one guild member to another.
```
$transfercoins 100 @Name
```
#### $getitemdescription/\$getiteminfo \<item_name\>
Gets description of the item.
```
$getiteminfo Cool item
```
#### $setitemdescription/\$setiteminfo \<item_name\> | \<item_description\>
Sets item's description.
```
$setitemdescription Cool item name | This is a cool description
```
## Fun
This module has commands that you can have fun with.
#### $embedmessage/\$embedmsg \<message\>
Sends an embed message to the channel, you can get this command by buying it in the store of your guild, if it  exists.
```
$embedmessage Hello, this is a message! :)
$embedmsg Short message.
```
#### $embedmessagecolor/\$embedmsgclr \<message\>
Sends an embed message to the channel, you can get this command by buying the **$embedmessage** command, and an upgrade to it in the stoe of your guild, if it exists.
```
$embedmessagecolor 9140cf Epic purple message.
$embedmsgclr ff0000 This is a red message.
```
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
#### \$random/\$rand \<min\> \<max\>
Gives a random number in between range from min to max.
```
$rand 10 100
$random 0 999
```
#### \$randomitem/\$randitem \<message\>
Gives a random item in your message.
```
$randitem Apple Banana Orange Mango
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
## Help
This module is for help purposes.
#### \$help/\$h [module_name/\$command_name]
Gives help about all modules/specified module/command.
```
$h
$help fun
$help $rbx
```
#### \$changelog
Gives link to bot's changelog github page.
```
$changelog
```
#### \$github
Gives link to bot's github page.
```
$github
```
#### \$documentation
Gives link to bot's documentation github page.
```
$documentation
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
