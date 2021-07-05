let countriesList = [];
let selectedlatLng = '';
let countryName='';
fetch('https://restcountries.eu/rest/v2/all')
.then(response => response.json())
.then(data=>{
    countriesList = data;
    setCountries();
})

const select = document.getElementById('countries');
const search = document.getElementById('search');

function setCountries() {
countriesList.forEach((country,i)=>{
    const option = document.createElement('option');
    // option.id = country.alpha2Code;
    option.value = country.alpha2Code;
    option.textContent = country.name;
    select.appendChild(option);
})
}

function getDetails(){
    const lat = selectedlatLng[0];
    const lng = selectedlatLng[1];
    fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`)
.then(response => response.json())
.then(data=>{
    let countryId = document.getElementById('country-name');
    countryId.innerHTML = countryName;
    let card1 = document.getElementById('card1');
    let card2 = document.getElementById('card2');
    card1.classList.remove('d-none');
    card2.classList.remove('d-none');
    let sunrise = document.getElementById('sunrise-id');
    let sunset = document.getElementById('sunset-id');
    sunrise.innerHTML = data.results.sunrise;
    sunset.innerHTML = data.results.sunset;
})
}

select.addEventListener('change',function(event){
    const filteredCountry = countriesList.filter(country=> country.alpha2Code === event.target.value);
    countryName = filteredCountry.map(c=>c.name)[0];
    selectedlatLng = filteredCountry.map(c=>c.latlng)[0];
});

search.addEventListener('click',function(event){
    getDetails();
})