let detail = new URLSearchParams(window.location.search);
let id = detail.get('id');
let container= document.getElementById('container');

fetch('https://countries-api-hsak.onrender.com/api/countries/'+ id)
    .then(response=> response.json())
    .then(pays=>{
        let name = document.createElement('h2');
        name.innerText = pays.name;
        let capital = document.createElement('p');
        capital.innerText = pays.capital;
        let langue = document.createElement('p');
        langue.innerText = pays.language;
        let flag = document.createElement('img');
        flag.src = pays.flag;
        let continent = document.createElement('p');
        continent.innerText = pays.continent;
        container.appendChild(name);
        container.appendChild(capital);
        container.appendChild(langue);
        container.appendChild(flag);
    })