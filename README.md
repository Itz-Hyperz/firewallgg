# FirewallGG
<img align="right" height="60" width="60" alt="" src="https://github.com/Itz-Hyperz/firewallgg/blob/main/website/public/assets/logo.png?raw=true" />

FirewallGG is a *background-checking* tool. What it will allow you to do, is check a user's Discord Id and see if they are banned in any databases that are synced within the Firewall. This allows you to mass check databases with almost no hassle at all. Just a simple setup and you will be all good to go! 

# How it works
FirewallGG is **both** *client sided* and *server sided*. What this means is users on any platform can now use FirewallGG to it's fullest capabilities. From a backend database background check on users, to a website for ease of access anywhere, all the way out to a desktop process that will allow you to run user Ids and get a return on them easily.

## Step One - Pick a method
First, you need to find out just which method will best suit your needs for using FirewallGG. If you're just trying to check a users background history, maybe just the website or the desktop process will be enough for you, but if you're looking for something a little more backend wise, possibly the [Node Module](https://npmjs.com/package/firewallgg) will be more your style. If none of these suit your needs, you can always just use our REST API [here](https://firewall.hyperz.net/api).

So again, your options are:
- The [Website](https://firewall.hyperz.net).
- The [Desktop Process](https://github.com/Itz-Hyperz/firewallgg/releases).
- The [Node Module](https://npmjs.com/package/firewallgg)
- The [Web API](https://firewall.hyperz.net/api).

## Step Two - Use / Integrate
For the basics, using the [Website](https://firewall.hyperz.net) or the [Desktop Process](https://github.com/Itz-Hyperz/firewallgg/releases) is pretty straight forward. Simple open one and enter a Discord User Id.

On the other hand, integrating it into your system may be a little bit more difficult. Most of our target audience uses FaxStore. So, if you're looking to easily integrate, look no-further than our built-in FaxStore extension that can be found [here](#input).

Yet, if you are entirely on your own, feel free to reference our public documentation for our Node Module [here](https://npmjs.com/package/firewallgg) or for our Web API you can look [here](https://firewall.hyperz.net/api).

## API Object Structure
Below is what gets returned from the physical API and you need to build your API endpoint to return a JSON object with these values as the *only returning values*.

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

# Credits
[@Hyperz](https://github.com/itz-hyperz) - *Original creation.*

![web example](https://cdn.hyperz.net/u/main/k6JIUtt.png)
