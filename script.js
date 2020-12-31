const timer = document.querySelector('.countdown');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const message = document.querySelector('.message');

const minPlus = document.querySelector('.mplus');
const minMinus = document.querySelector('.mminus');
const secPlus = document.querySelector('.splus');
const secMinus = document.querySelector('.sminus');
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');

const TIME_DELAY = 200; // интервал приращения времени при нажатой кнопке

let countSec = 0;
let countMin = 0;
let mousePushed = false; 		// кнопка изменения времени таймера нажата
let countdownOff = true;		// таймер выключен

const updateText = () =>{	
	minutes.innerHTML = (0 + String(countMin)).slice(-2);
	seconds.innerHTML = (0 + String(countSec)).slice(-2);
}
updateText();

const countDown = () => {	
	let total = countSec + countMin * 60;
	const timeinterval = setTimeout(countDown, 1000);
	if (countdownOff) clearInterval(timeinterval);
	if (total <= 0) {
		clearInterval(timeinterval);
		timer.style.display = 'none';
		message.innerHTML = '<p>I am done...</p>'
	}
	if(countSec > 0) countSec--;
	else{
		countSec = 59;
		countMin--;
	} 
	updateText();
}

// Функция обеспечения паузы при изменении времени таймера
let timeDelay = () => new Promise(resolve => setTimeout(resolve, TIME_DELAY));

// Функция увеличения секунд таймера
let upSeconds = function() {
	if(countSec < 59) ++countSec;
	else{		
		if (countMin < 59) {
			countSec = 0;
			++countMin;
		}
		else
			mousePushed = false;
	}
	updateText();
}

// Функция уменьшения секунд таймера
let downSeconds = function() {
	if(countMin <= 0 && countSec===0){
		countSec = 0;
		countMin = 0;
		mousePushed = false;
		return;
	}
	if(countSec > 0) --countSec;
	else{
		if (countMin > 0) {
			countSec = 59;
		--countMin;
		}
		else
			mousePushed = false;
	}
	updateText();
}

// Функция увеличения минут таймера
let upMinutes = function() {
	if(countMin < 59) ++countMin;
	else mousePushed = false;
	updateText();
}

// Функция уменьшения минут таймера
let downMinutes = function() {
	if(countMin > 0) --countMin;
	else mousePushed = false;
	updateText();	
}

// Четыре функции фиксации окончания ускоренного изменения времени таймера
secPlus.onclick = () => {
	mousePushed = false;
};

secMinus.onclick = () => {
	mousePushed = false;
};

minPlus.onclick = () => {
	mousePushed = false;
};

minMinus.onclick = () => {
	mousePushed = false;
};

// Увеличение секунд таймера
secPlus.onmousedown = async function() {
	mousePushed = true;			// - кнопка нажата
	while (mousePushed) {		// - пока кнопка нажата, увеличивать время таймера
		await timeDelay();		// - задержка изменения времени
		upSeconds();					// - увеличить время на одну секунду
	}	
}

// Уменьшение секунд таймера
secMinus.onmousedown = async function() {
	mousePushed = true;			
	while (mousePushed) {		
		await timeDelay();		
		downSeconds();
	}	
}

// Увеличение минут таймера
minPlus.onmousedown = async function() {
	mousePushed = true;	
	while (mousePushed) {
		await timeDelay();
		upMinutes();
	}	
}

// Уменьшение минут таймера
minMinus.onmousedown = async function() {
	mousePushed = true;			
	while (mousePushed) {		
		await timeDelay();		
		downMinutes();
	}	
}

start.onclick = () => {
	countdownOff = false;
	countDown();  
}

stop.onclick = () => {
	countdownOff = true;
}