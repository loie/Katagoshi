const screenshot = require('screenshot-desktop')

screenshot.listDisplays().then((displays) => {
	console.log(displays)
	displays.forEach(display => {
		screenshot({ screen: display.id, filename: "/demo.jpg" + display.id})
	})
})