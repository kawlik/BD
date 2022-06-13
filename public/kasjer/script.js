async function getBaseData(url)
{
	const response = await fetch(url);
	// Storing data in form of JSON
	var data = await response.json();

	return data;
}

function appendData(data) {
	var mainContainer = document.getElementById("1");
	for (var i = 0; i < data.length; i++) {
		var div = document.createElement("div");
		div.innerHTML =data[i].ID_Egzemplarz+" "+ data[i].Cena_sugerowana+" "+data[i].Stan__ocena_;

		mainContainer.appendChild(div);
	}
}

async function getapi2(url,url2)
{
	const response = await fetch(url);
	// Storing data in form of JSON
	var data = await response.json();
	const response2 = await fetch(url2);
	// Storing data in form of JSON
	var data2 = await response2.json();
appendData2(data,data2);
//	return data;
}

function appendData2(data,data3){
	var mainContainer = document.getElementById("1");
	var temp=0;
	for(var j=0;j<data3.length;j++){
		var div=document.createElement("div");
		for(var i=0;i<data.length;i++){
			if (data[i].ID_Ksiazka == data3[j].ID_Ksiazka) {
				temp++;
				div.innerHTML=(temp)+". Tytul: "+ data[i].Tytul+", Cena sugerowana: "+data3[j].Cena_sugerowana+" zl, Stan ksiazki: "+data3[j].Stan__ocena_;
			}
		}
		mainContainer.appendChild(div);
	}
}

async function getapi3(url,url2)
{
	const response = await fetch(url);
	// Storing data in form of JSON
	var data = await response.json();
	const response2 = await fetch(url2);
	// Storing data in form of JSON
	var data2 = await response2.json();
appendData3(data,data2);
//	return data;
}

function funkcja(IDKasjera,IDEgzemp,Cena){
	fetch('http://localhost:8080/transakcje/sell', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			cena: +Cena,
			kasjerID: IDKasjera,
			egzemplarzID: IDEgzemp
		}),
	   }).then((res) => console.log(res));
		  
}



function appendData3(data,data3){
	var mainContainer = document.getElementById("1");
	for(var j=0;j<data3.length;j++){
		var div = document.createElement("div"); let btn = document.createElement("button");
		
		
		for(var i=0;i<data.length;i++){

			if(data[i].ID_Ksiazka==data3[j].ID_Ksiazka){
			div.innerHTML="ID egzemplarza: "+data3[j].ID_Egzemplarz+" Tytul: "+ data[i].Tytul+" Cena sugerowana: "+data3[j].Cena_sugerowana;
			btn.innerHTML = "Sprzedaj";
			btn.type = "submit";
			btn.className = "bu";
			btn.id = data3[j].ID_Egzemplarz;
			btn.onclick = function ()
			{
				let x = document.forms["MyForm"]["idKasjera"].value;
				let y = document.forms["MyForm"]["Cena"].value;
				console.log(x);
				if (x == ""|| y=="") {
					alert("Brakuje danych!");
					return false;
				}
				else if(x!=1 && x!=2 && x!=3){
					alert("Bledne ID kasjera!");
					return false;
				}
				else if (y < 0 || y > 10000)
				{
					alert("Bledna Cena");
					return false;
				}
				else{
				    var ID = btn.id;
				funkcja(x,ID,y);
                   return true;
				} 
				
			};
			}
		}
		mainContainer.appendChild(div);
		mainContainer.appendChild(btn); 
	}
}
