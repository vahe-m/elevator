const liftCont = document.querySelector('.container');
const lift = document.querySelector('.lift');
const door = document.querySelector('.door');
const select = document.querySelector('.call_lift > select');	
const controlPanel = document.querySelector('.control_panel');
const floorNumber = document.querySelector('.floor_number > ul');
const audio = document.createElement('audio');
audio.src = 'audio/liftAudio.mp3';
let buildingFloor;
const screenNumbers = [
		{
			name: "floor 1",
			number: 1,
			style: "transform: translateY(-135px)",
		},
		{
			name: "floor 2",
			number: 2,
			style: "transform: translateY(-113px)",
		},
		{
			name: "floor 3",
			number: 3,
			style: "transform: translateY(-90px)",
		},
		{
			name: "floor 4",
			number: 4,
			style: "transform: translateY(-67px)",
		},
		{
			name: "floor 5",
			number: 5,
			style: "transform: translateY(-45px)",
		},
		{
			name: "floor 5",
			number: 6,
			style: "transform: translateY(-22px)",
		},
		{
			name: "floor 7",
			number: 7,
			style: "transform: translateY(0px)",
		},
	]
const building = [
		{
			name: "floor 1",
			number: 1,
			style: 'translateY(2px) translateX(-20px)',
			style2: 'rotateY(38deg) rotateX(-7deg) rotateZ(-6deg)',
		},
		{
			name: "floor 2",
			number: 2,
			style: "translateY(-77px) translateX(-20px)",
			style2: "rotateY(35deg) rotateX(-5deg) rotateZ(-4deg)",
		},
		{
			name: "floor 3",
			number: 3,
			style: "translateY(-150px) translateX(-20px)",
			style2: "rotateY(35deg) rotateX(-2deg) rotateZ(-2deg)",
		},
		{
			name: "floor 4",
			number: 4,
			style: "translateY(-227px) translateX(-20px)",
			style2: "rotateY(35deg) rotateX(3deg) rotateZ(2deg)",
		},
		{
			name: "floor 5",
			number: 5,
			style: "translateY(-302px) translateX(-20px)",
			style2: "rotateY(35deg) rotateX(7deg) rotateZ(4deg)",
		},
		{
			name: "floor 6",
			number: 6,
			style:  "translateY(-375px) translateX(-22px)",
			style2: "rotateY(35deg) rotateX(8deg) rotateZ(6deg)",
		},
		{
			name: "floor 7",
			number: 7,
			style: "translateY(-442px) translateX(-22px)",
			style2: "rotateY(35deg) rotateX(12deg) rotateZ(9deg)",
		},
	];

const numbers = [...document.querySelectorAll('.numbers > div > ul > li')];
numbers.forEach(elm => {
	elm.addEventListener('click', control);
});

const callBtn = document.querySelector('.call_btn');
callBtn.addEventListener('click', callLift);

function callLift() {
	const selectI = select.selectedIndex + 1;
	select.setAttribute('number', selectI);
	callBtn.style.color = "rgb(18 124 4 / 75%)";
	callBtn.style.boxShadow = "0px 0px 6px 1px rgb(18 124 4 / 75%) inset";
	door.classList.remove('active');

	setTimeout(() => {
		if(door.getAttribute('class') != 'door active') {
			for(let i = 0; i < building.length; i++) {
				if(selectI === building[i].number) {
					liftCont.style.transform = building[i].style;
					lift.style.transform = building[i].style2;
					controlScreen();
				}
			}
		}
	}, 1000);
	if(select.getAttribute("number") === lift.getAttribute("number")) {
		door.classList.add('active');	
		controlPanel.style.height = '320px';
	} else {	
		fncDoor();
	}
};

function control() {
	numbers.forEach(elm => {
		if(elm.getAttribute("clickAttribute") === "clicked") {
			elm.style.color = "#000";
			elm.style.boxShadow = "none";
			elm.setAttribute("clickAttribute", "");
		}
	});

	this.style.color = "rgb(18 124 4 / 75%)";
	this.style.boxShadow = "0px 0px 6px 1px rgb(18 124 4 / 75%) inset";
	this.setAttribute("clickAttribute", "clicked");
	door.classList.remove('active');
	setTimeout(() => {
		if(door.getAttribute('class') != 'door active') {
			building.forEach(elm => {
				if(this.getAttribute('name') === elm.name) {
					liftCont.style.transform = elm.style;
					lift.style.transform = elm.style2;
					screenNumbers.forEach(elm => {
						if(this.getAttribute('name') === elm.name) {
							floorNumber.style = elm.style;
						}
					})
				}
			})
		}
	}, 1000);
	fncDoor();
}

function  fncDoor() {
		setTimeout(() => {
			audio.play();
		}, 3000)
		setTimeout(() => {
			building.forEach(elm => {
				if(lift.style.transform === elm.style2) {
					lift.setAttribute("number", elm.number);
					buildingFloor = elm.number;
				};
			});
			numbers.forEach(elm => {
				elm.style.color = "#000";
				elm.style.boxShadow = "none";
				elm.setAttribute("clickAttribute", "");
			});
			door.classList.add('active');
			controlPanel.style.height = '320px';
			callBtn.style.color = "#000";
			callBtn.style.boxShadow = "none";
			closeDoor();
		}, 3200);
}

function closeDoor() {
	let buildingFloorStr = buildingFloor.toString();
	if(buildingFloorStr === lift.getAttribute("number")) {
		setTimeout(() => {
				door.classList.remove('active');
				controlPanel.style.height = '36px';
		}, 5000)
	}
}

function controlScreen() {
	screenNumbers.forEach(elm => {
		if(select.getAttribute('number') == elm.number) {
			floorNumber.style = elm.style;
		}
	})
}