let container = document.getElementById('container');
let world = [];

function element(card){
    
    card.forEach(cart=>{
        let carte = document.createElement('div');
        let name = document.createElement('h2');
        name.innerHTML = cart.name;
        let langue = document.createElement('p');
        langue.innerText = 'Langue' + cart.language;
        let capital = document.createElement('p');
        capital.innerText = 'Capital ' + cart.capital;
        let flag = document.createElement('img');
        flag.src = cart.flag;
        let continent = document.createElement('p');
        continent.innerText = 'Continent' + cart.continent;

        carte.appendChild(name);
        carte.appendChild(langue);
        carte.appendChild(capital);
        carte.appendChild(flag);
        carte.appendChild(continent);

        carte.addEventListener('click', function(){
            window.location.href = 'country-details.html?id=' +cart.id;
        })

        container.appendChild(carte);

    })
}

fetch('https://countries-api-hsak.onrender.com/api/countries')
    .then(response => response.json())
    .then(pays=>{
        world = pays
        element(world)
    }    
    )

let select = document.getElementById('select');
select.addEventListener('change', function(){
    container.innerHTML= '';
    if(select.value === '--'){
        element(world)
    } else{
        let contry = world.filter(c=> c.continent ===select.value)
        element(contry)
    }
})