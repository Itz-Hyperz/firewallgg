function sendMessageFirewallGG(message)

end

function playerIsBanned(banId)

    if(Config.KickBannedPlayers == false) then
        sendMessageFirewallGG("This player is banned from a FirewallGG database, but the server is set up to not kick banned players.")
    else

        local id = banId
        local banPrefix = "[FirewallGG]"
        local banSuffix = "You can find more information about your ban at https://firewall.hyperz.net/search/" .. id
        local kickMessage = Config.KickReason

        if(Config.UseCustomKick == false) then
            DropPlayer(-1, banPrefix .. " You are banned from a FirewallGG ban database. To protect this server, you are unable to join the server. " .. banSuffix)
        else
            DropPlayer(-1, banPrefix .. " " .. kickMessage .. " " .. banSuffix)
        end
    end
end

function isPlayerOnWhitelist(discord)
    if(Config.Whitelist.Enabled == true) then
        local roles = exports.Badger_Discord_API:GetDiscordRoles(discord)
        
        for i = i, #roles do
            local isRolesEqual = CheckEqual(roles[i], Config.Whitelist.Role);

            if(isRolesEqual == true) then
                sendMessageFirewallGG("This player is banned from a FirewallGG ban database, but will not be kicked as they are on the server whitelist.")
            else
                sendMessageFirewallGG("This player is banned from a FirewallGG ban database, and will be kicked because they are not on the whitelist.")
            end
        end
    else
        sendMessageFirewallGG("This server does not have the whitelist enabled. The player will now be kicked.")
        playerIsBanned(discord)
    end
end

function checkBanned(discord)

    local api = "https://firewall.hyperz.net/api/checkuser/"
    local target = discord

    PerformHttpRequest(api .. target, function(errorCode, resultData, resultHeaders)
        local data = json.decode(resultData)
        sendMessageFirewallGG(data)

    end, "GET", "", {
        ["Accept"] = "application/json, text/plain, */*",
        ["User-Agent"] = "*"
    });

end