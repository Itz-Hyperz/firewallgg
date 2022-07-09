package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	var user string
	fmt.Print("Enter a Discord User Id: ")
	fmt.Scanln(&user)
	PerformGetRequest(user)
}

func PerformGetRequest(userid string) {
	var myurl = "https://firewall.hyperz.net/api/checkuser" + userid
	response, err := http.Get(myurl)
	if err != nil {
		panic(err)
	}
	defer response.Body.Close()
	content, _ := ioutil.ReadAll(response.Body)
	fmt.Println(string(content))
}