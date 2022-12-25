----------------------------------------------------------------
-- API Ban Sync - A Simple FiveM Script, Made By Jordan.#2139 --
----------------------------------------------------------------
----------------------------------------------------------------------------------------------
-- !WARNING! !WARNING! !WARNING! !WARNING! !WARNING! --
-- DO NOT TOUCH THIS FILE OR YOU /WILL/ FUCK SHIT UP! EDIT THE CONFIG.LUA --
-- DO NOT BE STUPID AND WHINE TO ME ABOUT THIS BEING BROKEN IF YOU TOUCHED THE LINES BELOW. --
----------------------------------------------------------------------------------------------
card = '{"type":"AdaptiveCard","$schema":"http://adaptivecards.io/schemas/adaptive-card.json","version":"1.2","body":[{"type":"Image","url":"' .. config.AdaptiveCards.Header_IMG
				       .. '","horizontalAlignment":"Center"},{"type":"Container","items":[{"type":"TextBlock","text":"API Ban Sync","wrap":true,"fontType":"Default","size":"ExtraLarge","weight":"Bolder","color":"Light","horizontalAlignment":"Center"},{"type":"TextBlock","text":"'
				       .. config.AdaptiveCards.Heading1 .. '","wrap":true,"size":"Large","weight":"Bolder","color":"Light", "horizontalAlignment":"Center"},{"type":"TextBlock","text":"'
				       .. config.AdaptiveCards.Heading2
				       .. '","wrap":true,"color":"Light","size":"Medium","horizontalAlignment":"Center"},{"type":"ColumnSet","height":"stretch","minHeight":"100px","bleed":true,"horizontalAlignment":"Center","columns":[{"type":"Column","width":"stretch","items":[{"type":"ActionSet","actions":[{"type":"Action.OpenUrl","title":"Discord","url":"'
				       .. config.AdaptiveCards.Discord_Link
				       .. '","style":"positive"}]}],"height":"stretch"},{"type":"Column","width":"stretch","items":[{"type":"ActionSet","actions":[{"type":"Action.OpenUrl","title":"Website","style":"positive","url":"'
				       .. config.AdaptiveCards.Website_Link
				       .. '"}]}]}]},{"type":"ActionSet","actions":[{"type":"Action.OpenUrl","title":"Click to join Jordan\'s Discord","style":"destructive","iconUrl":"https://i.imgur.com/XGREJcb.png","url":"https://jordan2139.me/discord"}]}],"style":"default","bleed":true,"height":"stretch","isVisible":true}]}'

AddEventHandler('playerConnecting', function(name, setKickReason, deferrals)
	deferrals.defer();
	local src = source;
	local toEnd = false;
	local count = 0;
	local discordID = nil
	local ids = ExtractIdentifiers(src);
	local steam = ids.steam:gsub('steam:', '');
	local steamDec = tostring(tonumber(steam, 16));
	steam = 'https://steamcommunity.com/profiles/' .. steamDec;
	if config.AdaptiveCards.enabled then
		while not toEnd do
			deferrals.presentCard(card, function(data, rawData)
			end)
			Wait((1000))
			count = count + 1;
			if count == config.AdaptiveCards.Wait then
				toEnd = true;
			end
		end
		for _, id in ipairs(GetPlayerIdentifiers(src)) do
			if string.match(id, 'discord:') then
				discordID = string.gsub(id, 'discord:', '')
				PerformHttpRequest(string.format(config.apiURL .. '' .. discordID), function(err, res)
					if (err ~= 200) then
						print('[API Ban Sync] disallowing the user ' .. GetPlayerName(src) .. ' to connect as there was an issue checking their ban status')
						deferrals.done(config.ThereWasAnIssue)
						CancelEvent()
						return;
					else
						if (res.active) then
							print('[API Ban Sync] disallowing the user ' .. GetPlayerName(src) .. ' to connect as they are banned')
							if config.Discord.Enabled then
								sendToDisc('[API Ban Sync] Banned Member Attempted Connection!',
								           '' .. GetPlayerName(src) .. ' was declined connection due to them being banned \nSteam: **' .. steam .. '**\nDiscord Tag: ** <@' .. ids.discord:gsub('discord:', '')
												           .. '> **\nDiscord UID: **' .. ids.discord:gsub('discord:', '') .. '**\nIP:** ||' .. ids.ip:gsub('ip:', '') .. '||**');
							end
							deferrals.done('You are banned from ' .. config.APIName .. ' and can\'t join the server.')
							CancelEvent()
						else
							if config.Discord.Enabled then
								sendToDiscGood('[API Ban Sync] Member Connecting...',
								               '' .. GetPlayerName(src) .. ' was allowed connection due to them not being banned\nSteam: **' .. steam .. '**\nDiscord Tag: ** <@' .. ids.discord:gsub('discord:', '')
												               .. '> **\nDiscord UID: **' .. ids.discord:gsub('discord:', '') .. '**\nIP:** ||' .. ids.ip:gsub('ip:', '') .. '||**');
							end
							print('[API Ban Sync] Allowing the user ' .. GetPlayerName(src) .. ' to connect as they are not banned')
							deferrals.done()
						end
					end
				end)
				break
			end
		end
	else
		deferrals.update('Checking Banned Users From The API ' .. config.apiURL .. '...')
		Citizen.Wait(0); -- Necessary Citizen.Wait() before deferrals.done()
		for _, id in ipairs(GetPlayerIdentifiers(src)) do
			if string.match(id, 'discord:') then
				discordID = string.gsub(id, 'discord:', '')
				PerformHttpRequest(string.format(config.apiURL .. '' .. discordID), function(err, res)
					res = json.decode(res)
					if (err ~= 200) then
						print('[API Ban Sync] disallowing the user ' .. GetPlayerName(src) .. ' to connect as there was an issue checking their ban status')
						deferrals.done(config.ThereWasAnIssue)
						CancelEvent()
						return;
					else
						if (res.active) then
							print('[API Ban Sync] disallowing the user ' .. GetPlayerName(src) .. ' to connect as they are banned')
							if config.Discord.Enabled then
								sendToDisc('[API Ban Sync] Banned Member Attempted Connection!',
								           '' .. GetPlayerName(src) .. ' was declined connection due to them being banned \nSteam: **' .. steam .. '**\nDiscord Tag: ** <@' .. ids.discord:gsub('discord:', '')
												           .. '> **\nDiscord UID: **' .. ids.discord:gsub('discord:', '') .. '**\nIP:** ||' .. ids.ip:gsub('ip:', '') .. '||**');
							end
							deferrals.done('You are banned from ' .. config.APIName .. ' and can\'t join the server.')
							CancelEvent()
						else
							if config.Discord.Enabled then
								sendToDiscGood('[API Ban Sync] Member Connecting...',
								               '' .. GetPlayerName(src) .. ' was allowed connection due to them not being banned\nSteam: **' .. steam .. '**\nDiscord Tag: ** <@' .. ids.discord:gsub('discord:', '')
												               .. '> **\nDiscord UID: **' .. ids.discord:gsub('discord:', '') .. '**\nIP:** ||' .. ids.ip:gsub('ip:', '') .. '||**');
							end
							print('[API Ban Sync] Allowing the user ' .. GetPlayerName(src) .. ' to connect as they are not banned')
							deferrals.done()
						end
					end
				end)
				break
			end
		end
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

function sendToDisc(title, message, footer)
	local embed = {}
	embed = {{['color'] = 16711680, -- GREEN = 65280 --- RED = 16711680
	['title'] = '**' .. title .. '**', ['description'] = '' .. message .. '', ['footer'] = {['text'] = '[API Ban Sync] Created By: Jordan.#2139'}}}
	PerformHttpRequest(config.Discord.WebHookURL, function(err, text, headers)
	end, 'POST', json.encode({username = name, embeds = embed}), {['Content-Type'] = 'application/json'})
end

function sendToDiscGood(title, message, footer)
	local embed = {}
	embed = {{['color'] = 65280, -- GREEN = 65280 --- RED = 16711680
	['title'] = '**' .. title .. '**', ['description'] = '' .. message .. '', ['footer'] = {['text'] = '[API Ban Sync] Created By: Jordan.#2139'}}}
	PerformHttpRequest(config.Discord.WebHookURL, function(err, text, headers)
	end, 'POST', json.encode({username = name, embeds = embed}), {['Content-Type'] = 'application/json'})
end

