# FirewallGG - Website
This is the web portion of FirewallGG. You can view this website [here](https://firewall.hyperz.net).

# API Calls
Making an API call to our REST API is actually quite simple with nothing but a simple GET request to our url `https://firewall.hyperz.net/api/checkuser/:userId`.

Below are a few different language examples for this request.

**JavaScript:**
```js
    const axios = require('axios');
    run("USER_ID_TO_PASS")
    async function run(userId) {
        let check = await axios({
            method: 'get',
            url: `https://firewall.hyperz.net/api/checkuser/${userId}`
        });
        if(check?.data) {
            console.log(check.data);
            console.log(`This user has ${check.data.length} active bans.`)
        };
        return check?.data;
    };
```

**LUA:**
```lua
    local userId = "USER_ID_TO_PASS"
    PerformHttpRequest("https://firewall.hyperz.net/api/checkuser/" .. userId, function(data)
        print("Return data: " .. data)
    end, "GET", "", {
        ["Accept"] = "application/json, text/plain, */*",
        ["User-Agent"] = "*"
    });
```

**PHP:**
```php
    <?php
        $url = "https://firewall.hyperz.net/api/checkuser/USER_ID_TO_PASS";
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_GET, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $headers = array(
        "Accept: application/json",
        "Content-Type: application/json"
        );
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        $resp = curl_exec($curl);
        curl_close($curl);
        $data = json_decode($resp);
        echo $data;
    ?>
```

*LUA & PHP examples have not been officially tested.*
