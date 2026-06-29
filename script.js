let panier = [];

// AJOUTER AU PANIER
function ajouterPanier(nom, prix, idQte) {
  const qte = parseInt(document.getElementById(idQte).value);

  panier.push({ nom, prix, qte });
  afficherPanier();
}

// AFFICHER PANIER
function afficherPanier() {
  const ul = document.getElementById("panier");
  ul.innerHTML = "";

  panier.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nom} x${item.qte} — ${item.prix * item.qte} FCFA`;
    ul.appendChild(li);
  });
}

// TOTAL
function totalPanier() {
  return panier.reduce((sum, item) => sum + item.prix * item.qte, 0);
}

// ENVOI EMAIL
function envoyerEmail() {
  const jour = document.getElementById("jour").value;
  const lieu = document.getElementById("lieu").value;

  const details = panier
    .map((item) => `${item.nom} x${item.qte} = ${item.prix * item.qte} FCFA`)
    .join("\n");

  const total = totalPanier();

  emailjs.send("service_ggt3ksu", "template_5zzn49o", {
    panier: details,
    total: total,
    jour: jour,
    lieu: lieu,
  });
}

// ENVOI GOOGLE SHEETS
function envoyerGoogleSheets() {
  const jour = document.getElementById("jour").value;
  const lieu = document.getElementById("lieu").value;

  const details = panier
    .map((item) => `${item.nom} x${item.qte} = ${item.prix * item.qte} FCFA`)
    .join(", ");

  const total = totalPanier();

  fetch(
    "https://script.google.com/macros/s/AKfycbxiCVBzLAB6XT0gfGJlRZ5D5HUTuuAQTDGLKbcgA485DMDLbSf3Q9nV6A9qTyQ_tEV4/exec",
    {
      method: "POST",
      body: JSON.stringify({
        panier: details,
        total: total,
        jour: jour,
        lieu: lieu,
      }),
    },
  );
}

// VALIDATION FINALE
function validerCommande() {
  envoyerEmail();
  envoyerGoogleSheets();

  document.getElementById("confirmation").innerHTML = `
    <h3>Commande confirmée !</h3>
    <p>Total : ${totalPanier()} FCFA</p>
    <p>Retrait : ${document.getElementById("jour").value}</p>
    <p>Lieu : ${document.getElementById("lieu").value}</p>
  `;
}
