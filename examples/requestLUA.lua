local userId = "USER_ID_TO_PASS"
PerformHttpRequest("https://firewall.hyperz.net/api/checkuser/" .. userId, function(data)
    print("Return data: " .. data)
end, "GET", "", {
    ["Accept"] = "application/json, text/plain, */*",
    ["User-Agent"] = "*"
});
