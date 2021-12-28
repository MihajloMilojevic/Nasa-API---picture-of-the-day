export default class Modal {
	constructor() {
		/******* MODAL CONTAINER *********/
		this.modal = document.createElement("div");
		this.modal.classList.add("modal")
		this.id = Date.now().toString();
		this.modal.id = this.id;
		
		/******* MODAL CONTAINER *********/

//--------------------------------------------------------------------------------
		
		/******* MODAL BODY *********/
		const body = document.createElement("div");
		body.classList.add("modal-body");

		/******* MODAL BODY CHILDREN *********/
		const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		const today = new Date();
		const day = Input("day", 1, 31, today.getDate());
		const month = Input("month", 1, 12, today.getMonth() + 1);
		const year = Input("year", 1995, today.getFullYear(), today.getFullYear());
		body.appendChild(day);
		body.appendChild(month);
		body.appendChild(year);
		const todayButton = document.createElement("button");
		todayButton.id="today";
		todayButton.innerText = "TODAY";
		body.appendChild(todayButton);
		const ChangeButton = document.createElement("button");
		ChangeButton.id="change";
		ChangeButton.innerText = "CHANGE";
		ChangeButton.onclick = () => {
			this.Hide();
		};
		body.appendChild(ChangeButton);
		
		this.modal.appendChild(body);
		/******* MODAL BODY *********/
	}
	Add() {
		document.body.appendChild(this.modal);
	}
	Show() {
		document.getElementById(this.id).classList.add("modal-show");
	}
	Hide() {
		document.getElementById(this.id).classList.remove("modal-show");
	}
	
}

function Input(name, start, end, def)
{
	const inputDiv = document.createElement("div");
	inputDiv.style.textAlign = "center";
	inputDiv.innerText = name.toUpperCase() + ": ";
	const select = document.createElement("select");
	select.id = name;
	for(let i = start; i <= end; i++)
	{
		const option = document.createElement("option");
		option.value = i;
		option.id = `${name}${i}`;
		option.text = i;
		select.appendChild(option);
	}
	select.value = def;
	inputDiv.appendChild(select);
	return inputDiv;
}