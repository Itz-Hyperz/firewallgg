----------------------------------------------------------------
-- API Ban Sync - A Simple FiveM Script, Made By Jordan.#2139 --
----------------------------------------------------------------

config = {
    APIName = "https://firewall.hyperz.net", -- The name of your api
    apiURL = 'https://firewall.hyperz.net/api/checkusersimple/', -- The URL of the API that you would like to use
    ThereWasAnIssue = 'Sorry, there was an issue checking against the API... Please restart FiveM and if the issue persists contact the server owner.', -- The message the user recieves if there was an issue with the API
    Discord = {
        Enabled = true, -- Would you like to enable Discord loggging?
        WebHookURL = 'WEBHOOK_URL' -- Your webhook URL (MUST HAVE IF Enabled = true)
    },
    AdaptiveCards = {
        enabled = true, -- Would you like to enable adaptive cards?
        Website_Link = 'https://jordan2139.me', -- Your website link
        Discord_Link = 'https://jordan2139.me/discord', -- Your discord link
        Wait = 10,  -- How many seconds should splash page be shown for? (Max is 12)
        Header_IMG = 'https://forum.cfx.re/uploads/default/original/3X/a/6/a6ad03c9fb60fa7888424e7c9389402846107c7e.png',
        Heading1 = "Welcome to [ServerName]",
        Heading2 = "Make sure to join our Discord and check out our website!",
    }
}