//console.log("TFK");

const contacts = [
	{
		name: "Michele",
		avatar: "./img/user.jpg",
		visible: true,
		messages: [
			{
				date: "10/01/2020 15:30:55",
				message: "Hai portato a spasso il cane?",
				status: "sent",
			},
			{
				date: "10/01/2020 15:50:00",
				message: "Ricordati di stendere i panni",
				status: "sent",
			},
			{
				date: "10/01/2020 16:15:22",
				message: "Tutto fatto!",
				status: "received",
			},
		],
	},
	{
		name: "Fabio",
		avatar: "./img/user.jpg",
		visible: true,
		messages: [
			{
				date: "20/03/2020 16:30:00",
				message: "Ciao come stai?",
				status: "sent",
			},
			{
				date: "20/03/2020 16:30:55",
				message: "Bene grazie! Stasera ci vediamo?",
				status: "received",
			},
			{
				date: "20/03/2020 16:35:00",
				message: "Mi piacerebbe ma devo andare a fare la spesa.",
				status: "sent",
			},
		],
	},
	{
		name: "Samuele",
		avatar: "./img/user.jpg",
		visible: true,
		messages: [
			{
				date: "28/03/2020 10:10:40",
				message: "La Marianna va in campagna",
				status: "received",
			},
			{
				date: "28/03/2020 10:20:10",
				message: "Sicuro di non aver sbagliato chat?",
				status: "sent",
			},
			{
				date: "28/03/2020 16:15:22",
				message: "Ah scusa!",
				status: "received",
			},
		],
	},
	{
		name: "Alessandro B.",
		avatar: "./img/user.jpg",
		visible: true,
		messages: [
			{
				date: "10/01/2020 15:30:55",
				message: "Lo sai che ha aperto una nuova pizzeria?",
				status: "sent",
			},
			{
				date: "10/01/2020 15:50:00",
				message: "Si, ma preferirei andare al cinema",
				status: "received",
			},
		],
	},
	{
		name: "Alessandro L.",
		avatar: "./img/user.jpg",
		visible: true,
		messages: [
			{
				date: "10/01/2020 15:30:55",
				message: "Ricordati di chiamare la nonna",
				status: "sent",
			},
			{
				date: "10/01/2020 15:50:00",
				message: "Va bene, stasera la sento",
				status: "received",
			},
		],
	},
	{
		name: "Claudia",
		avatar: "./img/user.jpg",
		visible: true,
		messages: [
			{
				date: "10/01/2020 15:30:55",
				message: "Ciao Claudia, hai novità?",
				status: "sent",
			},
			{
				date: "10/01/2020 15:50:00",
				message: "Non ancora",
				status: "received",
			},
			{
				date: "10/01/2020 15:51:00",
				message: "Nessuna nuova, buona nuova",
				status: "sent",
			},
		],
	},
	{
		name: "Federico",
		avatar: "./img/user.jpg",
		visible: true,
		messages: [
			{
				date: "10/01/2020 15:30:55",
				message: "Fai gli auguri a Martina che è il suo compleanno!",
				status: "sent",
			},
			{
				date: "10/01/2020 15:50:00",
				message: "Grazie per avermelo ricordato, le scrivo subito!",
				status: "received",
			},
		],
	},
	{
		name: "Davide",
		avatar: "./img/user.jpg",
		visible: true,
		messages: [
			{
				date: "10/01/2020 15:30:55",
				message: "Ciao, andiamo a mangiare la pizza stasera?",
				status: "received",
			},
			{
				date: "10/01/2020 15:50:00",
				message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
				status: "sent",
			},
			{
				date: "10/01/2020 15:51:00",
				message: "OK!!",
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
			now: DateTime.now(),
		};
	},
	computed: {
		contactList() {
			const searchValue = this.search.trim().toLowerCase();

			return this.contacts.filter((contact) =>
				contact.name.toLowerCase().includes(searchValue)
			);

		},
	},
	methods: {
		setCurrentChat(index) {
			this.currentChat = index;
			console.log(index);
		},
		sendMessage(currentChat) {
			this.chat = this.currentChat;
			let message = this.messageSent.trim();

			if (message !== "") {
				const newMessage = {
					date: this.now.toFormat("dd/LL/yyyy HH:mm:ss"),
					message: message,
					status: "sent",
				};
				//console.log(newMessage)

				this.contactList[currentChat].messages.push(newMessage);

				this.messageSent = "";
				setTimeout(this.answer, 1000);
			}

			this.messageSent = "";
		},
		answer() {
			const newAnswer = {
				date: this.now.toFormat("dd/LL/yyyy HH:mm:ss"),
				message: "Ok!",
				status: "received",
			};

			this.contactList[this.chat].messages.push(newAnswer);
		},
		parseDate(date) {
			const dateToParse = DateTime.fromFormat(date, "dd/LL/yyyy HH:mm:ss");

			return dateToParse.toFormat("HH:mm");
		},
	},
	mounted() {
		setInterval(() => {
			this.now = DateTime.now();
		}, 1000);
	},
}).mount("#app");
