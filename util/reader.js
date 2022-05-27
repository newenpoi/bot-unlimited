/*
	Author: Newen
	Contributors :
	
	This file is used to handle ultra customized responses through html files,
	Will serve for multi-languages features.
*/

const utf8 = require('utf8');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

String.prototype.format = function() {
	var args = arguments;

	// Using replace to iterate over the string.
	// Select the match and check if the related argument is present, and replaces the match with the argument.
	return this.replace(/{([0-9]+)}/g, function (match, index) {
		// Check if the argument is present.
		return typeof args[index] == 'undefined' ? match : args[index];
	});
},

module.exports = {
	name: 'reader',
	/**
	 *
	 * @param {string} file - The file in which we'll search for the attribute.
	 * @param {string} identifier - The id attribute from this file to get the response.
	 * @param {string=} args - The rest of the arguments included in the response.
	 */
	async read(file, identifier, ...args) {
        // Parses the file (dom) in order to access custom data through an id.
		const dom = await JSDOM.fromFile(`strings/${file}.html`);
		const content = dom.window.document.querySelector(`#${identifier}`).innerHTML;

		// Sends back the formatted string with the rest.
		return utf8.decode(content.format(args));
	},
};
