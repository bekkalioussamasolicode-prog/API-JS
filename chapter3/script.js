let produits = [
  {
    nom: "Pc portable",
    prix: 900,
    image: "assest/pc.jpg",
  },
  { nom: "Clavier mécanique", prix: 45, image: "assest/clavie.webp" },
  { nom: "souris sans fil", prix: 25, image: "assest/souris.png" },
];

let catalogue = document.getElementById("catalogue");

produits.forEach((p) => {
  let cart = document.createElement("div");
  cart.className = "cart";
  cart.innerHTML = `
    <img src="${p.image}" alt="${p.nom}">
    <h3>${p.nom}</h3>
    <p>prix : ${p.prix} €</p>`;
  catalogue.appendChild(cart);
});
