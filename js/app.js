/*
Játék szabályok:

- A játék 2 szereplős és körökre osztott
- Minden egyes körben az adott játékos dob a kockával, ahányszor csak szeretne. A dobások eredménye hozzáadódik a játékos adott körben
  elért pontszámához, ami értelem szerűen minden körben nulláról indul.
- Ha az aktuális játékos 1-et dob, akkor az összes addigi pontja elveszik, és átadja a dobás jogát a következő játékosnak.
- A játékos választhatja a 'Megtartom' gombot is. Ebben az esetben az adott körben elért pontok száma, hozzáadódik a játékos összes
  pontszámához. Majd a dobás joga a másik játékosra száll.
- Az a játékos nyer, aki előbb eléri a 100 pontot.  
- 2*6 esetén és átkerül a másikhoz
- 2db kocka legyen
- Állítható legyen a cél
*/

var pontszamok, korPontszam, aktivJatekos, jatekFolyamatban, elozoDobas;

init();

//DOM Manipuláció
//document.querySelector('#current-' + aktivJatekos).textContent = kocka;
//HTML módosítás, formázással
//document.querySelector('#current-' + aktivJatekos).innerHTML =  '<u>' + kocka + '</u>';


//Dobás gomb
//Függvény hívásnál ha () lerakom akkor rögtön meghívódik
document.querySelector('.btn-roll').addEventListener('click', function(){
  if (jatekFolyamatban){
    // Véletlen szám generálása
    var kocka1 = Math.ceil(Math.random()*6);
    var kocka2 = Math.ceil(Math.random()*6);
    //Eredmény megjelenítése
    
    document.getElementById('dice-1').src = 'img/dice-' + kocka1 + '.png';
    document.getElementById('dice-2').src = 'img/dice-' + kocka2 + '.png';

    kockaKiBe('be');

    if (kocka1 !== 1 && kocka2 !== 1) {
      //Körben elért pontszám ha nme egyet dobunk
      korPontszam += kocka1 + kocka2;
      document.querySelector('#current-' + aktivJatekos).textContent = korPontszam;

    } else {
      kovetkezoJatekos();
      //document.querySelector('.dice').style.display= 'none';

    }
    /*
    if (kocka === 6 && elozoDobas === 6){
      //Elveszíti az összes pontot
      pontszamok[aktivJatekos] = 0;
      document.querySelector('#score-' + aktivJatekos).textContent = 0;
      kovetkezoJatekos();

    } else if (kocka !== 1) {
      //Körben elért pontszám ha nme egyet dobunk
      korPontszam += kocka;
      document.querySelector('#current-' + aktivJatekos).textContent = korPontszam;

    } else {
      kovetkezoJatekos();
      //document.querySelector('.dice').style.display= 'none';

    }
    elozoDobas = kocka;
    */
  };
});

//Megtartom gomb
document.querySelector('.btn-hold').addEventListener('click', function(){
  if (jatekFolyamatban){
    //Hozzáadni a pontot az aktuális játékosnak
    pontszamok[aktivJatekos] += korPontszam;

    document.querySelector('#score-' + aktivJatekos).textContent = pontszamok[aktivJatekos];

    var elerendoPontszam = document.querySelector('.celPontszam').value;
    //isNaN megvizsgálja hogy szám
    if (!elerendoPontszam || isNaN(elerendoPontszam)) {
      elerendoPontszam = 30;
    }

    //100 pont elérése esetén Alert: nyert
    if(pontszamok[aktivJatekos] >= elerendoPontszam) {
      jatekFolyamatban = false;
      document.querySelector('#name-' + aktivJatekos).textContent = 'GYŐZTES!';
      document.querySelector('.player-' + aktivJatekos + '-panel').classList.add('winner');
      document.querySelector('.player-' + aktivJatekos + '-panel').classList.remove('active');
    } else {
      //Következő játékos
      kovetkezoJatekos();
    }
  }
});

//Következő játékos
function kovetkezoJatekos(){
  aktivJatekos === 0 ? aktivJatekos = 1 :aktivJatekos = 0;
  korPontszam = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
};

//Új játékos gomb
document.querySelector('.btn-new').addEventListener('click', init)

//Új játék
function init(){
  pontszamok = [0,0];
  aktivJatekos = 0;
  korPontszam = 0;
  elozoDobas = 0;
  jatekFolyamatban = true;

  //#-el érjük el az ID, .-tal a class-t)
  //Betöltésnél ne látszódjon
  kockaKiBe('ki');

  document.getElementById('score-0').textContent ='0';
  document.getElementById('current-0').textContent ='0';
  document.getElementById('score-1').textContent ='0';
  document.getElementById('current-1').textContent ='0';

  document.getElementById('name-0').textContent = 'Bal!';
  document.getElementById('name-1').textContent = 'Jobb!';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
};

function kockaKiBe(funkcio) {
  //funkcio = ki vag be
  if(funkcio === 'ki'){
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
  } else if (funkcio === 'be') {
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
  }
}