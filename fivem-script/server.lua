local bottoken = 'Bot ' .. Config.Bot_Token

AddEventHandler('playerConnecting', function(name, setKickReason, deferrals)
	deferrals.defer();
	local src = source
	local ids = ExtractIdentifiers(src);
	local steam = ids.steam:gsub('steam:', '');
	local steamDec = tostring(tonumber(steam, 16));
	if steam ~= nil then
		steam = 'https://steamcommunity.com/profiles/' .. steamDec;
	else
		steam = nil
	end
	local ip = ids.ip:gsub('ip:', '')
	local discord = ids.discord:gsub('discord:', '')
	Citizen.Wait(0); -- Necessary Citizen.Wait() before deferrals.done()
	local banstatus = checkBans(src)
	if not steam then
		deferrals.done(Config.steamNotOpen);
		CancelEvent();
	end
	if Config.blacklist.enabled then
		if banstatus == 'blacklisted role' then
			print('[Discord Ban Sync] disallowing the user ' .. GetPlayerName(src) .. ' to connect as they have a blacklisted role.')
			sendToDisc('[Discord Ban Sync] Blacklisted Member Attempted Connection!',
			           '' .. GetPlayerName(src) .. ' was declined connection due to them having a blacklisted role in ' .. GetGuildName() .. '\nSteam: **' .. steam .. '**\nDiscord Tag: ** <@' .. discord
							           .. '> **\nDiscord UID: **' .. discord .. '**\nIP:** ||' .. ip .. '||**');
			deferrals.done('Sorry, it seems that you have a blacklisted role in ' .. GetGuildName() .. '...')
			CancelEvent()
			return;
		end
	end
	if not banstatus then
		print('[Discord Ban Sync] Allowing the user ' .. GetPlayerName(src) .. ' to connect as they are not banned in Discord')
		deferrals.done()
	elseif banstatus == 'there was an issue' then
		print('[Discord Ban Sync] disallowing the user ' .. GetPlayerName(src) .. ' to connect as there was an issue checking their ban status')
		deferrals.done(Config.ThereWasAnIssue)
		CancelEvent()
	elseif banstatus then
		sendToDisc('[Discord Ban Sync] Banned Member Attempted Connection!',
		           '' .. GetPlayerName(src) .. ' was declined connection due to them being banned from ' .. GetGuildName() .. '\nSteam: **' .. steam .. '**\nDiscord Tag: ** <@' .. discord
						           .. '> **\nDiscord UID: **' .. discord .. '**\nIP:** ||' .. ip .. '||**');
		print('[Discord Ban Sync] disallowing the user ' .. GetPlayerName(src) .. ' to connect as they are banned in the discord')
		deferrals.done('Sorry, it seems that you are banned from ' .. GetGuildName() .. '...')
		CancelEvent()
	end
end)

-- FUNCTIONS --

function ExtractIdentifiers(src)
	local identifiers = {steam = '', ip = '', discord = '', license = '', xbl = '', live = ''}
	for i = 0, GetNumPlayerIdentifiers(src) - 1 do
		local id = GetPlayerIdentifier(src, i)
		if string.find(id, 'steam') then
			identifiers.steam = id
		elseif string.find(id, 'ip') then
			identifiers.ip = id
		elseif string.find(id, 'discord') then
			identifiers.discord = id
		elseif string.find(id, 'license') then
			identifiers.license = id
		elseif string.find(id, 'xbl') then
			identifiers.xbl = id
		elseif string.find(id, 'live') then
			identifiers.live = id
		end
	end
	return identifiers
end

function DiscordRequest(method, endpoint, jsondata)
	local data = nil
	PerformHttpRequest('https://discordapp.com/api/' .. endpoint, function(errorCode, resultData, resultHeaders)
		data = {data = resultData, code = errorCode, headers = resultHeaders}
	end, method, #jsondata > 0 and json.encode(jsondata) or '', {['Content-Type'] = 'application/json', ['Authorization'] = bottoken})

	while data == nil do
		Citizen.Wait(0)
	end
	return data
end

function checkBans(user)
	local discordID = nil
	for _, id in ipairs(GetPlayerIdentifiers(user)) do
		if string.match(id, 'discord:') then
			discordID = string.gsub(id, 'discord:', '')
			break
		end
	end
	if discordID then
		if Config.blacklist.enabled then
			local roleData = DiscordRequest('GET', 'guilds/' .. Config.Guild_ID .. '/members/' .. discordID, {})
			if roleData.code == 200 then
				local data = json.decode(roleData.data)
				local roles = data.roles;
				for _, i in ipairs(roles) do
					for _, j in ipairs(Config.blacklist.blacklistedRoles) do
						if i == j then
							return 'blacklisted role'
						end
					end
				end
			end
		end
		local bandata = DiscordRequest('GET', 'guilds/' .. Config.Guild_ID .. '/bans/' .. discordID, {})
		if bandata.code == 200 then
			return true -- member was banned
		elseif bandata.code == 404 then -- member was not banned
			return false
		else
			print(json.encode(bandata))
			return 'there was an issue'
		end
	end
end

function GetGuildName()
	local guild = DiscordRequest('GET', 'guilds/' .. Config.Guild_ID, {})
	if guild.code == 200 then
		local data = json.decode(guild.data)
		return data.name;
	end
	return nil;
end

function sendToDisc(title, message, footer)
	local embed = {}
	embed = {{['color'] = 16711680, -- GREEN = 65280 --- RED = 16711680
	['title'] = '**' .. title .. '**', ['description'] = '' .. message .. '', ['footer'] = {['text'] = '[Discord Ban Sync] Created By: Jordan.#2139'}}}
	PerformHttpRequest(Config.webhookURL, function(err, text, headers)
	end, 'POST', json.encode({username = name, embeds = embed}), {['Content-Type'] = 'application/json'})
end
