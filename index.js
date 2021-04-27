const screenshot = require('screenshot-desktop')
const nodemailer = require('nodemailer')
const fs = require('fs')

// System paths
const pathCache = process.env.HOME + '/.cache/katagoshi/'
const pathConfig = process.env.HOME + '/.config/katagoshi/'

// read the config file on startup
const config = JSON.parse(fs.readFileSync(pathConfig + 'config.json'))

function takeScreenshot() {
	screenshot.listDisplays().then((displays) => {
		console.log(displays)
		displays.forEach(display => {
			screenshot({ screen: display.id, filename: pathCache + Date.now() + ".jpg"})})})}

// create a transporter to send mail from
var transporter = nodemailer.createTransport({
	host: config.host,
	port: config.port,
	secure: false,
	auth: {
		user: config.user,
		pass: config.pass}})

// get an array of attachments containing the screenshots
function getImages (){
	return fs.readdirSync(pathCache).map(function(file){
			return {
				filename: file,
				path: pathCache + file,
				cid: file + "@katagoshi.xyz"}})}

// create an html string embedding the screenshots
function produceHtml(){
	return fs.readdirSync(pathCache).map((file) => "<img src='cid:" + file + "@katagoshi.xyz'/>").join("")}

// create the mail message
function makeMessage(){
 	return {from: config.user,
					to: config.partner,
					subject: "accountability",
					html: produceHtml(),
					attachments: getImages()}}

var counter = 0;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function deleteImages() {
	fs.readdirSync(pathCache).forEach((file) => {
		fs.unlinkSync(pathCache + file);
	});
}

// the main loop
async function main() {
	while (true) {
		takeScreenshot()
		await sleep(300000)
		if ((counter % 120) == 0) {
			await transporter.sendMail(makeMessage())
			deleteImages()
		}
		++counter}}

main()
