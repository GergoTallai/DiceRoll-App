/*
Játék szabályok:

- A játék 2 szereplős és körökre osztott
- Minden egyes körben az adott játékos dob a kockával, ahányszor csak szeretne. A dobások eredménye hozzáadódik a játékos adott körben
  elért pontszámához, ami értelem szerűen minden körben nulláról indul.
- Ha az aktuális játékos 1-et dob, akkor az összes addigi pontja elveszik, és átadja a dobás jogát a következő játékosnak.
- A játékos választhatja a 'Megtartom' gombot is. Ebben az esetben az adott körben elért pontok száma, hozzáadódik a játékos összes
  pontszámához. Majd a dobás joga a másik játékosra száll.
- Az a játékos nyer, aki előbb eléri a 100 pontot.  

*/

var pontszamok, korPontszam, aktivJatekos, kocka;

pontszamok = [0,0];
korPontszam = 0;
aktivJatekos = 0;
kocka = Math.ceil(Math.random()*6);

//DOM Manipuláció
document.querySelector('#current-' + aktivJatekos).textContent = kocka;
//HTML módosítás, formázással
//document.querySelector('#current-' + aktivJatekos).innerHTML =  '<u>' + kocka + '</u>';

//#-el érjük el az ID, .-tal a class-t)
//Betöltésnél ne látszódjon
document.querySelector('.dice').style.display = 'none';

