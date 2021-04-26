#!/usr/bin/node

const screenshot = require('screenshot-desktop')
const nodemailer = require('nodemailer')
const fs = require('fs')

const path = process.env.HOME + '/.cache/katagoshi/'

screenshot.listDisplays().then((displays) => {
	console.log(displays)
	displays.forEach(display => {
		screenshot({ screen: display.id, filename: path + Date.now() + ".jpg"})})})

var transporter = nodemailer.createTransport({
	host: "smtp.yourmail.com",
	port: 587,
	secure: false,
	auth: {
		user: "username",
		pass: "password"}})

function extractFilename(path){
   const pathArray = path.split("/")
   const lastIndex = pathArray.length - 1
   return pathArray[lastIndex]}

function getImages (){
	return fs.readdirSync(path).map(function(file){
			return {
				filename: extractFilename(file),
				path: path + file,
				cid: extractFilename(file) + "@katagoshi.xyz"}})}

function produceHtml(){
	return fs.readdirSync(path).map((file) => "<img src='cid:" + extractFilename(file) + "@katagoshi.xyz'/>")}

var message = {
	from: "foo@bar.baz",
	to: "quux@frodo.shire",
	subject: "accountability",
	html: produceHtml().join(""),
	attachments: getImages()}

transporter.sendMail(message)
