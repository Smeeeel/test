'use strict';
/**
 * filter function to search the database through a regular expression;
 * @param username {string} - The input string that is filtered is escaped to service characters
 * @returns {string}
 */
module.exports = function(username) {
	const replacer = /[\"\'\,\%\^\$\+\*\?\{\}\#\|\[\]\\\)\(\+\-\=\~\|\`\*\<\>\/\.]/gi;

	return username.replace(replacer, (match) =>{
		return `\\${match}`;
	});
};