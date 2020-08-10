/*Burger*/
const toggle = document.getElementsByClassName('toggle')[0];
const navLinks = document.getElementsByClassName('nav_links')[0];

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active')
});

/*Scroll*/
function Scroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if(startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration) requestAnimationFrame(animation);
    }
    function ease(t, b, c, d) {
        t /= d / 2;
        if(t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
}

var section1 = document.querySelector('.button1');
section1.addEventListener('click', function(){
    Scroll('.section2', 1000);
});

var backImg = document.querySelector('.backImg');
backImg.addEventListener('click', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

var down = document.querySelector('.down');
down.addEventListener('click', function() {
    Scroll('.section2', 1000);
});



/*API call*/
const key = 'abb4908e0044fe423996239852970f58';
const map = 'citiesMap';
const mapOfCities = loadMap();
const currentResult = document.getElementById('boxResult');

renderFromMap();

function searchCity() {
    const inputCity = document.getElementById('inputID');
    let foundedCity = inputCity.value;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${foundedCity}&units=metric&appid=${key}&lang=cz`).then(response => {
       if (!response.ok) {
           throw Error(`${response.status} ${response.statusText}`);
       }
       return response.json()
    })
    .then ( json => {
        console.log(json);

        let weather = json.weather[0];
        let main = json.main;

        let element = `
        <header>
            <span>${foundedCity}</span>
            <img src="${weatherIcon(weather.icon)}">
        </header>    
         <section>
            <span>${weather.description}</span>
            <span>${main.temp}°C</span>
         </section>
         `
        mapOfCities.set(foundedCity, element);
        localStorage.setItem(map, JSON.stringify(Array.from(mapOfCities.entries())));

        renderFromMap();
    });
}

function renderFromMap() {
    currentResult.innerHTML = '';
    mapOfCities.forEach( (value, key, map) => {
        let element = document.createElement('div');
        element.innerHTML = value;
        currentResult.appendChild(element);
    });
}

function weatherIcon(weatherId) {
    return `http://openweathermap.org/img/wn/${weatherId}@2x.png`;
}

function loadMap() {
    return localStorage.getItem(map) ? new Map(JSON.parse(localStorage.getItem(map))) : new Map();
}

function deleteStorage() {
    localStorage.clear();
    location.reload();
}

/*Animations*/
const box1 = document.querySelector(".box1");
const button1 = document.querySelector(".button1");
const navbar = document.querySelector(".navbar");

const tl = new TimelineMax();
tl.fromTo(navbar, 0.8, {x:"-100%"}, {x: "0%", ease: Power2.easeInOut})
    .fromTo(box1, 1, {opacity: "0"}, {opacity: "1"})
         .fromTo(button1, 0.5, {y:"210%"}, {y: "0%", ease: Power2.easeInOut});