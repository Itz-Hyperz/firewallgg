-- Notice: most script functionality isn't here because i didn't give enough of a fuck to add it
-- Notice: if you know how, feel free to contribute to the github project
-- Notice: ill be back in a few months if i wanna finish this shit up
-- Notice: ty all, bye

Config = {}
Config.Whitelist = {}

-- Kicking

Config.KickBannedPlayers = true -- Change this to false to do nothing if a banned player joins. It is enabled (set to true) by default.

-- Custom Kick Reasons

Config.UseCustomKick = false -- Set this to true to enable the custom kick reason.
Config.KickReason = "You cannot join this server because you are banned on FirewallGG." -- You can set a custom kick reason if Config.UseCustomKick is set to true.

-- Whitelisting

Config.Whitelist.Enabled = false -- Disabled by false, allows you to make exemptions for certain players using Discord roles.
Config.Whitelist.Role = 0 -- Change this to the ID of your Discord role. This only works when Config.Whitelist.Enabled is set to true.