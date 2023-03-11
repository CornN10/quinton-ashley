// example film table
let table = `
| id | film title                      |
|====|=================================|`;

let genre = ['fantasy', 'romance', 'comedy'];

async function start() {
	let filePath = QuintOS.dir + '/films.json';
	let data = await fetch(filePath);
	let obj = await data.json();
	let films = obj.films;

	for (let film of films) {
		if (film.title.length <= 31) {
			table += '| ' + film.id + ' | ' + film.title.padEnd(31, ' ') + ' |\n';
		} else {
			table += '| ' + film.id + ' | ' + film.title.slice(0, 28) + '... |\n';
		}
	}

	txt(table, 2, 0);
	let cmd = await prompt('0: Back, 1: View, 2: Return', 20, 0, 40);
}
