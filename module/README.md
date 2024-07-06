# THIS HAS BEEN DISCONTUNUED!

# FirewallGG - Node Module
This is a simple node module that will allow you to search the FirewallGG database(s) natively.

Code Example:
```js
    const firewallgg = require('firewallgg');
    (async () => {
        let bans = await firewallgg.search("704094587836301392");
        console.log(bans);
    });
```
