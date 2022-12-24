local function playerIsBanned(banId, source)

    if(Config.KickBannedPlayers == false) then
        print("This player is banned from a FirewallGG database, but the server is set up to not kick banned players.")
    else

        local id = banId
        local banPrefix = "[FirewallGG]"
        local banSuffix = "You can find more information about your ban at https://firewall.hyperz.net/search/" .. id
        local kickMessage = Config.KickReason

        Citizen.Wait(15000)

        if(Config.UseCustomKick == false) then
            DropPlayer(source, banPrefix .. " You are banned from a FirewallGG ban database. To protect this server, you are unable to join the server. " .. banSuffix)
        else
            DropPlayer(source, banPrefix .. " " .. kickMessage .. " " .. banSuffix)
        end
    end
end

local function isPlayerOnWhitelist(discord)
    if(Config.Whitelist.Enabled == true) then
        local roles = exports.Badger_Discord_API:GetDiscordRoles(discord)
        
        for i = i, #roles do
            local isRolesEqual = CheckEqual(roles[i], Config.Whitelist.Role);

            if(isRolesEqual == true) then
                print("This player is banned from a FirewallGG ban database, but will not be kicked as they are on the server whitelist.")
            else
                print("This player is banned from a FirewallGG ban database, and will be kicked because they are not on the whitelist.")
            end
        end
    else
        print("This server does not have the whitelist enabled. The player will now be kicked.")
        playerIsBanned(discord)
    end
end

local function checkBanned(discord, idig)

    local api = "https://firewall.hyperz.net/api/checkusersimple/"
    local target = discord

    PerformHttpRequest(api .. target, function(errorCode, resultData, resultHeaders)

        local parsed = json.decode(resultData)
        print(parsed)

        if(parsed['active']) then
            -- isPlayerOnWhitelist(target)
            -- i dont feel like setting that up rn, ty tho
            playerIsBanned(target, idig)
        else
            print("This player isn't banned. Have fun!")
        end

    end, "GET", "", {
        ["Accept"] = "application/json, text/plain, */*",
        ["User-Agent"] = "*"
    });

end

local function OnPlayerConnecting(name, setKickReason, deferrals)
    local player = source
    local identifier
    local identifiers = GetPlayerIdentifiers(player)
    deferrals.defer()

    -- mandatory wait!
    Wait(0)

    deferrals.update(string.format("Hello %s, please wait while FirewallGG checks your Discord ID.", name))

    for _, v in pairs(identifiers) do
        if string.find(v, "discord") then
            identifier = v
            checkBanned(identifier, player)
        end
    end

    -- mandatory wait!
    Wait(0)

    if not identifier then
        deferrals.done("You are not connected to Discord.")
    else
        deferrals.done()
    end
end

AddEventHandler("playerConnecting", OnPlayerConnecting)
