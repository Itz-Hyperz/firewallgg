package main

import (
   "io/ioutil"
   "net/http"
   "bufio"
   "os"
   "fmt"
   "strings"
   "time"
)

func main() {
	// Ask a question
	reader := bufio.NewReader(os.Stdin)
	fmt.Println("Please enter a userId to search...")
  	fmt.Println("---------------------")
    fmt.Print("User ID -> ")
	// Collect and format the question
    provUserId, _ := reader.ReadString('\n')
	provUserId = strings.Replace(provUserId, "\n", "", -1)
	provUserId = strings.Replace(provUserId, "\r", "", -1)
	fmt.Println("----- SEARCHING -----")
	// Make the HTTP Get Request
   	resp, err := http.Get("https://firewall.bosssoftware.net/api/checkuser/" + provUserId)
   	if err != nil {
    	fmt.Println(err)
   	}
	// We Read the response body on the line below.
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
    	fmt.Println(err)
	}
	// Convert the body to type string
   	sb := string(body)
   	fmt.Printf(sb)
	fmt.Println("---------------------")
	fmt.Println("This session will expire in 60 seconds...")
	fmt.Println("---------------------")
	time.Sleep(60*time.Second)
}
