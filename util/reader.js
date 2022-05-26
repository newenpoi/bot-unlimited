const utf8 = require('utf8');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = {
	name: 'reader',
	/**
	 *
	 * @param {Le fichier dont on va chercher la réponse.} file
	 * @param {La balise identifiée dont on récupère le contenu.} identifier
	 */
	async read(file, identifier) {
        // Parses the file to retrieve element and returns it's innerHTML (we need the decoding).
		const dom = await JSDOM.fromFile(`strings/${file}.html`);
		return utf8.decode(dom.window.document.querySelector(`#${identifier}`).innerHTML);
	},
};
