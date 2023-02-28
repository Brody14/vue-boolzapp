//console.log("TFK");

const contacts = [
	{
		name: "MaddaLENZA",
		avatar: "./img/02.png",
		visible: true,
		messages: [
			{
				date: "10/01/2020 15:30:55",
				message: "Ho fame...",
				status: "received",
			},
			{
				date: "10/01/2020 15:50:00",
				message: "E' presto!!",
				status: "sent",
			},
			{
				date: "10/01/2020 16:15:22",
				message: "Inutile umana...",
				status: "received",
			},
		],
	},
	{
		name: "Wawa",
		avatar: "./img/03.png",
		visible: true,
		messages: [
			{
				date: "20/03/2020 16:30:00",
				message: "Cos'era quel rumore?!?!",
				status: "sent",
			},
			{
				date: "20/03/2020 16:30:55",
				message: "Ho fatto un casino...",
				status: "received",
			},
			{
				date: "20/03/2020 16:35:00",
				message: "Ma pensa...!",
				status: "sent",
			},
		],
	},
	{
		name: "Vlado",
		avatar: "./img/04.png",
		visible: true,
		messages: [
			{
				date: "28/03/2020 10:10:40",
				message: "Il 3 c'è la Micov Night al Forum...",
				status: "received",
			},
			{
				date: "28/03/2020 10:20:10",
				message:
					"Se..e dovrei dare soldi all'Olimpia per vedere che ti danno una teca con la tua maglia?",
				status: "sent",
			},
			{
				date: "28/03/2020 16:15:22",
				message: "Dai...!",
				status: "received",
			},
		],
	},
	{
		name: "Fame on Fire",
		avatar: "./img/05.png",
		visible: true,
		messages: [
			{
				date: "10/01/2020 15:30:55",
				message: "Non riesco a smettere di ascolta l'album nuovo...è normale?!",
				status: "sent",
			},
			{
				date: "10/01/2020 15:50:00",
				message: "Si!!",
				status: "received",
			},
		],
	},
	{
		name: "Mokino",
		avatar: "./img/06.png",
		visible: true,
		messages: [
			{
				date: "10/01/2020 15:30:55",
				message: "Io wawa non lo tollero più...",
				status: "sent",
			},
			{
				date: "10/01/2020 15:50:00",
				message: "Lo so, stasera lo elimino!",
				status: "received",
			},
		],
	},
	{
		name: "Gianca",
		avatar: "./img/07.png",
		visible: true,
		messages: [
			{
				date: "10/01/2020 15:30:55",
				message: "WOW",
				status: "sent",
			},
			{
				date: "10/01/2020 15:50:00",
				message: "Lo so, abbiamo fatto schifo...",
				status: "received",
			},
			{
				date: "10/01/2020 15:51:00",
				message: "Nu, tu sei stato stupendo!!!",
				status: "sent",
			},
		],
	},
	{
		name: "Pozz",
		avatar: "./img/08.png",
		visible: true,
		messages: [
			{
				date: "10/01/2020 15:30:55",
				message: "Era ora convocassi Casarin!",
				status: "sent",
			},
			{
				date: "10/01/2020 15:50:00",
				message: "Eh lo so...",
				status: "received",
			},
		],
	},
	{
		name: "Papa Roach",
		avatar: "./img/09.png",
		visible: true,
		messages: [
			{
				date: "10/01/2020 15:30:50",
				message: "Ragazzi...",
				status: "sent",
			},
			{
				date: "10/01/2020 15:30:55",
				message: "Dicci tutto!",
				status: "received",
			},
			{
				date: "10/01/2020 15:50:00",
				message: "Serve materiale nuovo...!",
				status: "sent",
			},
			{
				date: "10/01/2020 15:51:00",
				message: "Siamo già in studio!",
				status: "received",
			},
		],
	},
];

const { createApp } = Vue;

const { DateTime } = luxon;

createApp({
	data() {
		return {
			contacts: contacts,
			currentChat: 0,
			messageSent: "",
			chat: 0,
			search: "",
		};
	},
	watch: {
		currentChat: function (newChat, oldChat) {
			this.resetMessage();
		},
	},
	computed: {
		lastIndex(){
			this.contacts[currentChat].messages.length-1
		},
	},
	methods: {
		setCurrentChat(index) {
			this.currentChat = index;
			//console.log(index);
		},
		isHidden(contact) {
			const name = contact.name.toLowerCase();
			//const {name} = contact
			const searchValue = this.search.trim().toLowerCase();

			const result = !name.includes(searchValue);
			return result;
		},
		getDate(format = "dd/LL/yyyy HH:mm:ss") {
			const now = DateTime.now();

			return now.toFormat(format);
		},
		randomTime() {
			const maxDate = Date.now();
			const dateRandom = Math.floor(Math.random() * maxDate);
			let hours = new Date(dateRandom).getHours()
			hours = hours > 9 ? hours : '0' + hours;
			let minutes = new Date(dateRandom).getMinutes()
			minutes = minutes > 9 ? minutes : '0' + minutes;
			return hours + ':' + minutes	
		},
		sendMessage(currentChat) {
			this.chat = this.currentChat;
			let message = this.messageSent.trim();
			const date = this.getDate();

			if (message !== "") {
				const newMessage = {
					date: date,
					message: message,
					status: "sent",
				};
				//console.log(newMessage)

				this.contacts[currentChat].messages.push(newMessage);

				this.resetMessage();
				setTimeout(this.answer, 1000);
			}

			this.resetMessage();
		},
		answer() {
			const date = this.getDate();

			const newAnswer = {
				date: date,
				message: "Ok!",
				status: "received",
			};

			this.contacts[this.chat].messages.push(newAnswer);
		},
		resetMessage() {
			this.messageSent = "";
		},
		parseDate(date) {
			const dateToParse = DateTime.fromFormat(date, "dd/LL/yyyy HH:mm:ss");

			return dateToParse.toFormat("HH:mm");
		},
		lastIndexMes(i){
			return this.contacts[i].messages.slice(-1)[0].message.slice(0,30)
		},
		lastMesTime(i){
			let time = this.contacts[i].messages.slice(-1)[0].date
			return this.parseDate(time)
		}
	
	},
	mounted() {
		setInterval(() => {
			this.now = DateTime.now();
		}, 1000);
		console.log(this.contacts[this.currentChat].messages.slice(-1)[0].date)
		
	},
}).mount("#app");