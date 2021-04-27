# Katagoshi
Katagoshi is a simple monitoring tool that makes screenshots of your screen from time to time and saves them in a specified folder.

## Installing Katagoshi
Run

````
$ npm install
````

to update the dependencies, then run

````
$ node index.js
````

to start katagoshi.

It doesn't yet run in the background by itself, but we're working on that. You
can run katagoshi in the background using `forever`:

````
$ forever start index.js
````

## Providing credentials

Katagoshi expects a file named `config.json` at `/home/your_username/.config/katagoshi`.
This file should look like this:

````
{
	"host": "smtp.your_email_provider.com",
	"port": 587,
	"user": "your_email@provider.com",
	"pass": "your_password",
	"partner": "your_partners_mail@provider.com"
}
````
