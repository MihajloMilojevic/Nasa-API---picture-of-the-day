export default class Modal {
	constructor() {
		this.modal = document.createElement("div");
		this.modal.classList.add("modal");
		this.id = Date.now().toString();
		this.modal.id = this.id;
		this.modal.style = {
			position: fixed,
			display: flex,
			alignContent: center,
			justifyContent: center,
			backgroundColor: rgba(0, 0, 0 , .2),
		}
	}
	Show() {
		document.body.appendChild(this.modal);
	}
	Hide() {
		document.removeChild(document.getElementById(this.id));
	}
}