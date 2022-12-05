# FirewallGG
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-15-blue.svg)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<img align="right" height="60" width="60" alt="" src="https://github.com/Itz-Hyperz/firewallgg/blob/main/website/public/assets/logo.png?raw=true" />

FirewallGG is a *background-checking* tool. What it will allow you to do, is check a user's Discord Id and see if they are banned in any databases that are synced within the Firewall. This allows you to mass check databases with almost no hassle at all. Just a simple setup and you will be all good to go! 

- Highlight Color: `#5865F2`
- Sections Color: `#172144`
- Background Color: `#060F27`

# How it works
FirewallGG is **both** *client sided* and *server sided*. What this means is users on any platform can now use FirewallGG to it's fullest capabilities. From a backend database background check on users, to a website for ease of access anywhere, all the way out to a desktop process that will allow you to run user Ids and get a return on them easily.

## Step One - Pick a method
First, you need to find out just which method will best suit your needs for using FirewallGG. If you're just trying to check a users background history, maybe just the website will be enough for you, but if you're looking for something a little more backend wise, possibly the [Node Module](https://npmjs.com/package/firewallgg) will be more your style. If none of these suit your needs, you can always just use our REST API [here](https://firewall.hyperz.net/api).

So again, your options are:
- The [Website](https://firewall.hyperz.net).
- The [Node Module](https://npmjs.com/package/firewallgg)
- The [Web API](https://firewall.hyperz.net/api).
- The [Desktop App](https://cdn.hyperz.net/u/xolify/IXlfI5A.exe)

## Step Two - Use / Integrate
For the basics, using the [Website](https://firewall.hyperz.net) or the [Desktop Process](https://github.com/Itz-Hyperz/firewallgg/releases) is pretty straight forward. Simple open one and enter a Discord User Id.

On the other hand, integrating it into your system may be a little bit more difficult. Most of our target audience uses FaxStore. So, if you're looking to easily integrate, look no-further than our built-in FaxStore extension that can be found [here](#input).

Yet, if you are entirely on your own, feel free to reference our public documentation for our Node Module [here](https://npmjs.com/package/firewallgg) or for our Web API you can look [here](https://firewall.hyperz.net/api).

## API Object Structure
Below is what gets returned from the physical API:
```json
[
    {
        "database": "DATABASE_NAME",
        "themeColor": "DATABASE_THEME_COLOR",
        "logoUrl": "DATABASE_LOGO_URL",
        "appealLink": "DATABASE_APPEAL_LINK",
        "active": true,
        "userid": "BANNED_USER_ID",
        "reason": "BANNED_USER_REASON",
        "proof": "BANNED_USER_PROOF",
        "time": "TIME_OF_BAN",
        "otherData": {}
    }
]
```

You need to build your API endpoint to return a JSON object with these values as the *only returning values*.
```json
{
  "active": yourObject.active,
  "userid": yourObject.userid,
  "reason": yourObject.reason,
  "proof": yourObject.proof,
  "time": yourObject.time
}
```

Upon creating a pull request to add to the [`databases.json`](https://github.com/Itz-Hyperz/firewallgg/blob/main/databases.json) file, you will *also* need to provide a screenshot of what *exactly* gets returned from that API endpoint on your end, this way developers can verify that these data types are correct with no excess-hassle.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://hyperz.net"><img src="https://avatars.githubusercontent.com/u/69090660?v=4?s=100" width="100px;" alt="Itz-Hyperz"/><br /><sub><b>Itz-Hyperz</b></sub></a><br /><a href="https://github.com/Itz-Hyperz/firewallgg/issues?q=author%3AItz-Hyperz" title="Bug reports">🐛</a> <a href="#business-Itz-Hyperz" title="Business development">💼</a> <a href="https://github.com/Itz-Hyperz/firewallgg/commits?author=Itz-Hyperz" title="Code">💻</a> <a href="https://github.com/Itz-Hyperz/firewallgg/commits?author=Itz-Hyperz" title="Documentation">📖</a> <a href="#security-Itz-Hyperz" title="Security">🛡️</a> <a href="https://github.com/Itz-Hyperz/firewallgg/pulls?q=is%3Apr+reviewed-by%3AItz-Hyperz" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://xolify.store/"><img src="https://avatars.githubusercontent.com/u/103285682?v=4?s=100" width="100px;" alt="XolifyDev"/><br /><sub><b>XolifyDev</b></sub></a><br /><a href="#ideas-XolifyDev" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-XolifyDev" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/sandwichthedev"><img src="https://avatars.githubusercontent.com/u/69737561?v=4?s=100" width="100px;" alt="sandwichthedev"/><br /><sub><b>sandwichthedev</b></sub></a><br /><a href="#ideas-sandwichthedev" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-sandwichthedev" title="Tools">🔧</a> <a href="https://github.com/Itz-Hyperz/firewallgg/issues?q=author%3Asandwichthedev" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://zedofficial.xyz/"><img src="https://avatars.githubusercontent.com/u/61573331?v=4?s=100" width="100px;" alt="ZED Official"/><br /><sub><b>ZED Official</b></sub></a><br /><a href="#ideas-zedofficial" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-zedofficial" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/LouDawg2"><img src="https://avatars.githubusercontent.com/u/66086177?v=4?s=100" width="100px;" alt="LouDawg"/><br /><sub><b>LouDawg</b></sub></a><br /><a href="#tool-LouDawg2" title="Tools">🔧</a> <a href="#ideas-LouDawg2" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://store.shawnengmann.com/"><img src="https://avatars.githubusercontent.com/u/86177860?v=4?s=100" width="100px;" alt="Shawn E."/><br /><sub><b>Shawn E.</b></sub></a><br /><a href="#design-Shawn-E" title="Design">🎨</a> <a href="#ideas-Shawn-E" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://jordan2139.me"><img src="https://avatars.githubusercontent.com/u/65438497?v=4?s=100" width="100px;" alt="Jordan.#2139"/><br /><sub><b>Jordan.#2139</b></sub></a><br /><a href="#ideas-Jordan2139" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-Jordan2139" title="Tools">🔧</a> <a href="#infra-Jordan2139" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://novacustoms.com"><img src="https://avatars.githubusercontent.com/u/97416193?v=4?s=100" width="100px;" alt="Nova Customs Inc "/><br /><sub><b>Nova Customs Inc </b></sub></a><br /><a href="#tool-NovaCustoms" title="Tools">🔧</a> <a href="#ideas-NovaCustoms" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://fusions.world"><img src="https://avatars.githubusercontent.com/u/89275160?v=4?s=100" width="100px;" alt="FusionsWorld"/><br /><sub><b>FusionsWorld</b></sub></a><br /><a href="#ideas-FusionsWorld" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-FusionsWorld" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/PattysDevelopment"><img src="https://avatars.githubusercontent.com/u/88861117?v=4?s=100" width="100px;" alt="Patrick Calcote"/><br /><sub><b>Patrick Calcote</b></sub></a><br /><a href="#ideas-PattysDevelopment" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-PattysDevelopment" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/Chris-Newton2000"><img src="https://avatars.githubusercontent.com/u/95302476?v=4?s=100" width="100px;" alt="GregoryDev"/><br /><sub><b>GregoryDev</b></sub></a><br /><a href="#ideas-Chris-Newton2000" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-Chris-Newton2000" title="Tools">🔧</a></td>
      <td align="center"><a href="https://pluxmods.tebex.io/"><img src="https://avatars.githubusercontent.com/u/48103197?v=4?s=100" width="100px;" alt="Plactrix"/><br /><sub><b>Plactrix</b></sub></a><br /><a href="#ideas-Plactrix" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-Plactrix" title="Tools">🔧</a></td>
      <td align="center"><a href="https://www.weirdbandkid.games"><img src="https://avatars.githubusercontent.com/u/63882306?v=4?s=100" width="100px;" alt="Hunter Fleming"/><br /><sub><b>Hunter Fleming</b></sub></a><br /><a href="#ideas-weirdbandkid" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-weirdbandkid" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/IamAdren"><img src="https://avatars.githubusercontent.com/u/35825183?v=4?s=100" width="100px;" alt="Adren"/><br /><sub><b>Adren</b></sub></a><br /><a href="#ideas-IamAdren" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-IamAdren" title="Tools">🔧</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/codenationgroup"><img src="https://avatars.githubusercontent.com/u/66074938?v=4?s=100" width="100px;" alt="codenationgroup"/><br /><sub><b>codenationgroup</b></sub></a><br /><a href="#ideas-codenationgroup" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-codenationgroup" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
