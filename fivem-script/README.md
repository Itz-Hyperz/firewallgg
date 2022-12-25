# API-Ban-Sync
## What is it? 
API-Ban-Sync is a highly advanced FiveM script that will let you rest assured knowing that those trolls that you banned from your discord won't go and troll your FiveM server. This script will check against your API of choice (it is designed to work with the [Protect The Developers](https://protectthedevs.com) API so there is a chance it may require some editing to work with yours. This script is highly optimized and works flawlessly. This script also includes ***Adaptive Cards*** as well

## Configuration 
```
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
```

## Acknowledgments
[Badger](https://github.com/jaredscar) - Created Badger Discord API 

## Photos
![](https://cdn.jordan2139.me/ultraleaks10551.png)
