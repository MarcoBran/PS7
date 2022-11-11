var nome;
var cognome;
var addBtn;
var elencoHTML;
var errore;
var erroreElenco;
var elenco = [];

window.addEventListener('DOMContentLoaded', init);

function init() {
	nome = document.getElementById('nome');
	cognome = document.getElementById('cognome');
	addBtn = document.getElementById('scrivi');
	elencoHTML = document.getElementById('elenco');
	errore = document.getElementById('errore');
	erroreElenco = document.getElementById('erroreElenco');
	printData();
	eventHandler();
}

function eventHandler() {
	addBtn.addEventListener('click', function () {
		controlla();
	});
}

function printData() {
	fetch('http://localhost:3000/elenco')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			elenco = data;
			if (elenco.length > 0) {
				errore.innerHTML = '';
				elencoHTML.innerHTML = '';
				elenco.map(function (element) {
					elencoHTML.innerHTML += `<li><button type="button" class="btn btn-danger me-1" onClick="elimina(${element.id})">X</button><button type="button" class="btn btn-warning me-1" onClick="modifica(${element.id})"><i class="bi bi-pen"></i></button> ${element.nome} ${element.cognome}</li>`;
				});
			} else {
				erroreElenco.innerHTML = 'Nessun elemento presente in elenco';
			}
		});
}

function controlla() {
	if (nome.value != '' && cognome.value != '') {
		var data = {
			nome: nome.value,
			cognome: cognome.value,
		};
		addData(data);
	} else {
		errore.innerHTML = 'Compilare correttamente i campi!';
		return;
	}
}

async function addData(data) {
	let response = await fetch('http://localhost:3000/elenco', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(data),
	});
	clearForm();
}

function clearForm() {
	nome.value = '';
	cognome.value = '';
}

async function elimina(id) {
    let response = await fetch('http://localhost:3000/elenco/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    });
}

//async function modifica (data) {
//	console.log('modifica')
//	
//	let response = await fetch('http://localhost:3000/elenco/' + data, {
  //      method: 'PUT',
    //    headers: {
      //      'Content-Type': 'application/json;charset=utf-8',
        //},
		//body: JSON.stringify(data),
		
    //});
	//inForm();
//}

function inForm(){
	elenco.map(function (data) {
		nome.value = data.nome;
		cognome.value = data.cognome;
	})

}