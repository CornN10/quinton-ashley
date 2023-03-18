// example film table
let genre = ['fantasy', 'romance', 'comedy'];

let films;
let members;

async function start() {
	let filePath = QuintOS.dir + '/films.json';
	let data = await fetch(filePath);
	films = await data.json();
	let filePath2 = QuintOS.dir + '/members.json';
	let data2 = await fetch(filePath2);
	members = await data2.json();
	log(members);
	mainMenu();
}

async function mainMenu() {
	erase();
	let cmd = await prompt('0: View member, 1: View film info, 2: Exit', 19, 0, 40);
	if (cmd == 0) {
		let memberId = await prompt('What is the member ID?', 20, 0, 40);
		memberInfo(memberId);
	} else if (cmd == 1) {
		//view film info
		let filmId = await prompt('What is the film ID?', 20, 0, 40);
		await viewFilmInfo(filmId);
		mainMenu();
	} else if (cmd == 2) {
		exit();
	}
}

async function memberInfo(memberId) {
	erase();
	let memberFound = false;
	let member;
	for (member of members) {
		if (member.id == memberId) {
			//finds the matching member
			memberFound = true;
			break;
		}
	}
	if (memberFound == false) {
		await alert('Member not found', 19);
		mainMenu();
		return;
	}
	log(member);
	txt(member.id + ' ' + member.name, 2, 0);
	let table = `
| id | film title                      |
|====|=================================|`;
	//get the name of the films from the id
	for (let filmWatched of member.rented) {
		for (let film of films) {
			//gets the values of the rented array
			if (film.id != filmWatched) continue;
			//checks id with movie list
			if (film.title.length <= 31) {
				table += '| ' + film.id + ' | ' + film.title.padEnd(31, ' ') + ' |\n';
			} else {
				table += '| ' + film.id + ' | ' + film.title.slice(0, 28) + '... |\n';
			}
		}
	}
	txt(table, 4, 0);
	let options = await prompt('0: Go back to main menu, 1: View film info, 2: Rent film, 3: Return film', 19, 0, 40);
	if (options == 0) {
		mainMenu();
	} else if (options == 1) {
		//view film info
		let filmId = await prompt('What is the film ID?', 20, 0, 40);
		await viewFilmInfo(filmId);
		memberInfo(memberId);
	} else if (options == 2) {
		//rent film
		let rentFilmId = await prompt('What is the film ID of the film you want to rent?', 20, 0, 40); //How to make rentFilmId string so that it can be 04 and not just 4
		rentFilmId = rentFilmId.toString();
		if (rentFilmId.length == 1) rentFilmId = '0' + rentFilmId;
		console.log(rentFilmId);
		for (let film of films) {
			if (rentFilmId == film.id) {
				console.log(rentFilmId);
				member.rented.push(rentFilmId);
				console.log(member.rented);
				memberInfo(memberId);
			}
		}
	} else if (options == 3) {
		//return film
		let foundId = false;
		let returnFilmId = await prompt('What is the film ID of the film you want to return?', 20, 0, 40);
		for (let i in member.rented) {
			if (member.rented[i] == returnFilmId) {
				foundId = true;
				//this slices out the element which has the id
				removedFilmArray = member.rented.slice(0, i).concat(member.rented.slice(i + 1));
				console.log(removedFilmArray);
				member.rented = removedFilmArray;
				memberInfo(memberId);
			}
		}
		if (!foundId) {
			await alert('Film with that ID has not been rented yet', 19);
			memberInfo(memberId);
		}
	}
}

async function viewFilmInfo(filmId) {
	erase();
	for (let film of films) {
		if (film.id == filmId) {
			let filmInfo =
				filmId +
				' ' +
				film.title +
				'\n\nGenre: ' +
				genre[film.genre] +
				'\n\nRating: ' +
				film.rating +
				'\n\nDescription: ' +
				film.description;
			await alert(filmInfo, 2, 0, 40);
		}
	}
}
