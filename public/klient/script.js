

function SearchTerm(search) { //For taking searched term from searchbar 
	var GET = {};
	var queryString = window.location.search.replace(/^\?/, '');
	queryString.split(/\&/).forEach(function (keyValuePair) {
		var paramName = keyValuePair.replace(/=.*$/, ""); 
		var paramValue = keyValuePair.replace(/^[^=]*\=/, ""); 
		paramValue = paramValue.replace(/\+/g, " ");
		GET[paramName] = paramValue;
		
	

	});

	return GET[search]; //returnes only searched term

}

function SearchTerm2(search) {//For taking searched term from searchbar 
	var GET = {};
	var queryString = window.location.search.replace(/^\?/, '');
	queryString.split(/\&/).forEach(function (keyValuePair) {
		var paramName = keyValuePair.replace(/=.*$/, "");
		var paramValue = keyValuePair.replace(/^[^=]*\=/, "");
		paramValue = paramValue.replace(/\+/g, " ");
		GET[paramName] = paramValue;

	});

	return GET; //returns search term and container name
}

async function getBaseData(url) //for getting data through json
{
	const response = await fetch(url);
	var data = await response.json();

	return data;
}

async function getapi1(url, textDet) { //getting and printing data frome one json (url of data, text specifing data type: autor/gatunek/wydawca)

	const response = await fetch(url);
	var data = await response.json();
    appendData(data,textDet);
}

function appendData(data, textDet) { //print data from getapi1 function
	if (textDet == "gatunek") { //print all genres
		var mainContainer = document.getElementById("pickGen");
		for (var i = 0; i < data.length; i++) {
			var div = document.createElement("div");
			div.innerHTML = (i+1) + ". "+ data[i].Nazwa;
			mainContainer.appendChild(div);
		}
	} else if (textDet == "wydawca") { //print all publishers
		var mainContainer = document.getElementById("pickPub");
		for (var i = 0; i < data.length; i++) {
			var div = document.createElement("div");
			div.innerHTML = (i + 1) +". "+data[i].Nazwa;
			mainContainer.appendChild(div);
		}
	} else if (textDet == "autor") { //print all authors
		var mainContainer = document.getElementById("pickAutor");
		for (var i = 0; i < data.length; i++) {
			var div = document.createElement("div");
			div.innerHTML = (i + 1) + ". "+ data[i].Imiona + " " + data[i].Nazwisko;
			mainContainer.appendChild(div);
		}
    }
}

async function Second(url, url2)   //for getting two data packs of two urls
{ 

	const response = await fetch(url);

	var data = await response.json();

	const response2 = await fetch(url2);
	var data2 = await response2.json();
	//console.log(data2);
	appendData3(data, data2);

}

function appendData3(data, data2) { //printing data from two urls
	var mainContainer = document.getElementById("pickSecondHand");
	var temp = 1;
	for (var j = 0; j < data2.length; j++) {
		var div = document.createElement("div");
		for (var i = 0; i < data.length; i++) {
			if (data[i].ID_Ksiazka == data2[j].ID_Ksiazka && data2[j].Stan__ocena_ == "uzywany") //print only used copies of book
			{  
				div.innerHTML = temp +". " + data[i].Tytul + ", data Wydania: " + data2[j].Data_wydania.slice(0, data2[j].Data_wydania.length - 14)+", ";
				temp++;
				details(data[i].ID_Ksiazka, div, "autor");
			}
		}
		mainContainer.appendChild(div);
	}
}



function ksiazka(tytul){ //used in bookpick.html file, search for book in Data base

	getBaseData("http://localhost:8080/ksiazka").then(data => {
		data; // fetched books
		var choice = -1;
		for (var i = 0; i < data.length; i++) {
			if (tytul == data[i].Tytul) {

				choice = data[i].ID_Ksiazka; //searching for book ID with the same title as variable tytul

			}

		}
		if (choice == -1) {
			document.getElementById("textNoErrorBookPick").innerHTML = ""; //clearing data on page if no book is found
		} else {
			document.getElementById("NotFoundBookPick").innerHTML = ""; //clearing error messege if book is found
			document.getElementById("headTitleBookPick").innerHTML = "\"" + tytul + "\"";
			document.getElementById("headTitle2BookPick").innerHTML = "\"" + tytul + "\""; //printing title
		}
		egzemplarz(choice);  //searching for a copy of book by the found ID
		
		details(choice, document.getElementById("genreBookPick"), "gatunek"); //searching for books genre
		details(choice, document.getElementById("autBookPick"), "autor"); //searching for books author
		details(choice, document.getElementById("pubBookPick"), "wydawnictwo"); //searching for book publisher
		detailsPicture(choice); //picking coresponding picture

	});
}

function egzemplarz(choice) //Search for a copy of book by Id = choice
{

	getBaseData("http://localhost:8080/egzemplarz").then(data => {
		data;
		var temp = 0;
		for (var i = 0; i < data.length; i++) {
			if (data[i].ID_Ksiazka == choice) {

				if (data[i].Stan__ocena_ == "nowy") //every new copy
				{
					temp++; //counting available books
					document.getElementById("costBookPick").innerHTML = data[i].Cena_sugerowana; //printing cost value in "costBookPick" space
				} else
				{
					document.getElementById("costBookPick").innerHTML = data[i].Cena_sugerowana + " (Za egzemplarz dostepny w antykwariacie)";  // if no 
					//new book is found printing cost value from first used copy
				}

				
				document.getElementById("dateBookPick").innerHTML = data[i].Data_wydania.slice(0, data[i].Data_wydania.length - 14); 


			}
		}
		if (temp == 0) //if no book is found printing 0 availability
		{
			document.getElementById("avBookPick").innerHTML = "0 (Sprawdz dostepnosc w antykwariacie!)";
		} else {
			document.getElementById("avBookPick").innerHTML = temp; //if books are found print availability
		}
	});

}

function autPick(nazwa) //for pick.html file (works as ksiazka() function but checks for author)
{

	getBaseData("http://localhost:8080/autor").then(data => {
		data; 
		var choice = -1;
		for (var i = 0; i < data.length; i++) {
			if (nazwa == data[i].Imiona + " " + data[i].Nazwisko) {

				choice = data[i].ID_Autor;

			}

		}
		if (choice == -1) {
			document.getElementById("search2Pick").innerHTML = "";
			document.getElementById("headSearchPick").innerHTML = "";
			document.getElementById("errorPick").innerHTML = " autora";

		} else {
			document.getElementById("NotFoundPick").innerHTML = "";
			document.getElementById("search2Pick").innerHTML = nazwa;
			autorChoice(choice, data.length);
		}
	});
}

function genPick(nazwa) { //for pick.html file (works as ksiazka() function but checks for genre)

	getBaseData("http://localhost:8080/gatunek-literacki").then(data => {
		data;
		var choice = -1;
		var length = data.length;
		for (var i = 0; i < data.length; i++) {
			if (nazwa == data[i].Nazwa) {

				choice = data[i].ID_Gatunek;

			}

		}
		if (choice == -1) {
			document.getElementById("search2Pick").innerHTML = "";
			document.getElementById("headSearchPick").innerHTML = "";
			document.getElementById("errorPick").innerHTML = " gatunku";
			
		} else {
			document.getElementById("NotFoundPick").innerHTML = "";
			document.getElementById("search2Pick").innerHTML = nazwa;
			genreChoice(choice, data.length);
		}
	});



}

function genreChoice(choice, leng) //for checking genre of book (uses book details) (Id of book, number of all books)
{
	for (var i = 1; i <= leng; i++) {
		var num = 1;
		var temp=1;
		getBaseData("http://localhost:8080/details/book/" + i).then(data2 => {
			data2;
			
			for (var j = 0; j < data2.gatunki.length; j++) //checking for one or more genres
			{
				var mainContainer = document.getElementById("pickSearch");
				if (data2.gatunki[j].ID_Gatunek == choice) //checking if IDs mach
				{
					var div = document.createElement("div");
					printTitle(temp, div, data2); //searching for title of book (Id f book coresponding to genre, where to write, data with book details)
					div.innerHTML = num + ". ";
					mainContainer.appendChild(div);
					num += 1;

				}
			}
			temp += 1; // Id of checked book
		});

	}

}

function autorChoice(choice, leng) //same as genreChoice
{

	for (var i = 1; i <= leng; i++) {
		var num = 1;
		var temp = 1;
		getBaseData("http://localhost:8080/details/book/" + i).then(data2 => {
			data2;

			for (var j = 0; j < data2.autorzy.length; j++) //checking for one or more authors
			{
				var mainContainer = document.getElementById("pickSearch");
				if (data2.autorzy[j].ID_Autor == choice) {
					var div = document.createElement("div");
					printTitle(temp, div, data2); //searching for title of book (Id f book coresponding to author, where to write, data with book details)
					div.innerHTML = num + ". ";
					mainContainer.appendChild(div);
					num += 1;

				}
			}
			temp += 1; // Id of checked book
		});

	}
}

function printTitle(id, div, datab) //used to print title and author of book
{
	getBaseData("http://localhost:8080/ksiazka").then(data => {
		data;
		
		for (var i = 0; i < data.length; i++) {
	
			if (data[i].ID_Ksiazka == id) {
				for (var j = 0; j < datab.autorzy.length; j++) //checking for one or more authors
				{
					if (j == 0) {
						div.innerHTML = div.innerHTML + data[i].Tytul + ", " + datab.autorzy[j].Imiona + " " + datab.autorzy[j].Nazwisko;
					} else { div.innerHTML = div.innerHTML + ", "+ datab.autorzy[j].Imiona + " " + datab.autorzy[j].Nazwisko; }
				}
            }
        }
	});

}

function title(n, x) //printing all data base of titles divided into pages of x books
{

	document.getElementById("pickAutor").innerHTML = "";
	getBaseData("http://localhost:8080/ksiazka").then(data => {
		data;

		var temp = data.length / x; //max of pages depending on data length and divison factor (x books per page)
		n = n % Math.ceil(temp); //n - ho much time we clicked the button (left =-1 right=+1) number of pages in integer
		var start = n * x; //start of data on n page
		var end = n * x + x; //end of data on n page
		if (end > data.length) { end = data.length; } //checking if end is not over number of total boocks

		var mainContainer = document.getElementById("pickAutor");
		for (var i = start; i < end; i++) {
		
				
			var div = document.createElement("div");
			div.innerHTML = (i + 1) + ". " + data[i].Tytul + ", " + data[i].Data_premiery.slice(0, data[i].Data_premiery.length - 14) + ", "; //printing all date from book table in DB
			details(data[i].ID_Ksiazka, div, "autor"); //printing additional data (author) of book with Id = data[i].ID_Ksiazka
			mainContainer.appendChild(div);
			

		}

	});
}

function details(ID, div, textDet) //printing all athors/genres/publishers of book with Id=ID
{

	getBaseData("http://localhost:8080/details/book/" + ID).then(data2 => {
		data2;
		if (textDet == "autor") {
			for (var i = 0; i < data2.autorzy.length; i++) {
				if (i == 0) {
					div.innerHTML = div.innerHTML + data2.autorzy[i].Imiona + " " + data2.autorzy[i].Nazwisko;
				} else { div.innerHTML = div.innerHTML + ", " + data2.autorzy[i].Imiona + " " + data2.autorzy[i].Nazwisko; }
			}
		} else if (textDet == "gatunek") {
			for (var i = 0; i < data2.gatunki.length; i++) {
				if (i == 0) {
					div.innerHTML = div.innerHTML + " " + data2.gatunki[i].Nazwa;
				} else { div.innerHTML = div.innerHTML + ", " + data2.gatunki[i].Nazwa; }		
			}
		} else if (textDet == "wydawnictwo") {
			for (var i = 0; i < data2.wydawnictwa.length; i++) {
				if (i == 0) {
					div.innerHTML = div.innerHTML + " " + data2.wydawnictwa[i].Nazwa;
				} else { div.innerHTML = div.innerHTML + ", " + data2.wydawnictwa[i].Nazwa; }
			}
		}
	});

}

function detailsPicture(ID) //updating picture coresponding to genre of book with id=ID
{

	getBaseData("http://localhost:8080/details/book/" + ID).then(data2 => {
		data2;
		document.getElementById("genreBookPick2").innerHTML = data2.gatunki[0].Nazwa; //picture is chosen by the first Genre (no need to search for all)
		var genr = data2.gatunki[0].Nazwa; //picture names correspond to genre names in DB
		genr = genr.replace(" ", "-");
		document.getElementById("genreImgBookPick").src = "/html/png/" + genr + ".png"; //updating source for picture

	});

}

