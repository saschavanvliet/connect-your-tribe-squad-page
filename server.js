// Ik heb een express package geimporteerd. Deze wordt opgehaald uit json packages. Express is een framework binnen Node.JS en 
// JavaScript zit hier standaard in.
import express from 'express'

// Hierna importeer ik de Liquid package uit de json packages. Liquid zal gebruikt worden om dynamisch te werken in html. 
// Deze wordt dus ook als dependency via npm geïnstalleerd.
import { Liquid } from 'liquidjs';

// Vervolgens zijn er drie verschillende sites die ik kan gebruiken om dingen in mijn site dynamisch op te halen. /person zal het meest
// gebruikt worden in deze site om informatie per persoon op te halen.

// - https://fdnd.directus.app/items/tribe
// - https://fdnd.directus.app/items/squad
// - https://fdnd.directus.app/items/person

// Tijdens het gebruiken van deze websites kan je de url zelf aanpassen. Zo kan je specifiekere dingen ophalen uit een object bijvoorbeeld. 
// Je kan bijvoorbeeld gebruik maken van quary parameters als filter, sort en search. Deze staan hier uitgelegd: https://directus.io/docs/guides/connect/query-parameters.
// Met sort: kan je sorteren op volgordes, dus verjaardag lag-hoog. Met filter kan je verschillende dingen eruit filteren. Dus alleen mensen uit 2002 bijvoorbeeld. 
// Ik heb geoefend met de oefeningen uit https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/squad-page-ontwerpen.md om dit beter te snappen. Zie https://github.com/saschavanvliet/connect-your-tribe-profile-card/blob/main/views/oefenen.liquid.
// Zie ook de documentatie van Express voor meer info over routes en Express: https://expressjs.com/en/guide/routing.html#route-parameters

// Nu maak ik een variabele aan waarmee ik alle eerstejaars squads uit de WHOIS API op van dit jaar (2024–2025) aanroep:
const squadResponse = await fetch('https://fdnd.directus.app/items/squad?filter={"_and":[{"cohort":"2425"},{"tribe":{"name":"FDND Jaar 1"}}]}')

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const squadResponseJSON = await squadResponse.json()

// ^^ Deze variabelen heb ik nog niet gebruikt in mijn site, maar deze komen waarschijnlijk in de komende week wel van pas.

// Nu maak ik een nieuwe Express applicatie aan, waarin ik de server kan configureren. De server.js is belangrijk om routes bijvoorbeeld aan te kunnen maken.
const app = express()

// Ik maak een 'public' aan waar statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts) ingezet kunnen worden.
// Bestanden in deze map kunnen dus door de browser gebruikt worden.
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))


// Om Views weer te geven, zijn er Routes nodig. Hiermee kan je dus data ophalen die in principe lokaal zijn opgeslagen. Dit is dus
// wat omslachtiger dan wanneer je een website puur statisch zou bouwen.
// Maak een GET route voor de index
app.get('/', async function (request, response) {
  response.render('index.liquid',)
})

// ^^ Ik heb nog geen data opgehaald op de indexpagina, daarom staan er geen variabelen bij. Ik heb de squads in twee GET-routes verdeeld.

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van POST, redirect naar GET op /
  response.redirect(303, '/')
})

// ^^ Deze post-route heb ik nog niet gebruikt, omdat we deze stof nog niet hebben gehad. 

// Ik maak een API-variabele aan om makkelijker aan de slag te kunnen gaan.
const API =  'https://fdnd.directus.app/items/person/'

// Ik heb een GET route gemaakt voor de detailpagina voor squad 1H. Ik heb een request gemaakt voor de juiste route parameter. 
app.get('/squad1H/', async function (request, response) {
  // Nu maak ik een variabele aan waar ik de directus website aan koppel. Deze site is dus al gefilterd op de squadnaam en iedereen die daarin zit.
  const personResponse = await fetch(API + '?fields=*,squads.squad_id.name&filter={"squads":{"squad_id":{"name":"1H"}}}&sort=name')
  // En daarvan haal ik de JSON op
  const personResponseJSON = await personResponse.json()

  // Vervolgens render ik squad1H.liquid uit de views map en geef de opgehaalde data mee als variable, genaamd person
  response.render('squad1H.liquid', {persons: personResponseJSON.data})
})

// Vervolgens wil ik een id meegeven aan de route parameter. Dit houdt in dat als je op een willekeurig persoon klikt binnen een squad, er een aparte pagina van die persoon met alle door jou meegegeven gegevens aan wordt gemaakt.
app.get('/squad1H/:id', async function (request, response) { 
  const personResponse =   await fetch(API + request.params.id) // + Request params id houdt in dat je de id wil toevoegen aan de routeparameter die er staat.
  const personResponseJSON = await personResponse.json()

  // Nu render ik de detailpagina van de persoon. Deze route heb ik person.liquid genoemd. Deze pagina wordt dus geladen wanneer ik binnen de squad1H-route de link inklik om naar de personroute te navigeren.
  response.render('person.liquid', {person: personResponseJSON.data})
});

// ZIE ROUTE 1H VOOR UITLEG!! Ik heb een GET route gemaakt voor de detailpagina voor squad 1G. Ik heb een request gemaakt voor de juiste route parameter. 
app.get('/squad1G/', async function (request, response) {
  const personResponse = await fetch(API + '?fields=*,squads.squad_id.name&filter={%22squads%22:{%22squad_id%22:{%22name%22:%221G%22}}}&sort=name')
  const personResponseJSON = await personResponse.json()

  response.render('squad1G.liquid', {persons: personResponseJSON.data})
})

// ZIE ROUTE 1H VOOR UITLEG OVER ID OPVRAGEN!!
app.get('/squad1G/:id', async function (request, response) {
  const personResponse =   await fetch(API + request.params.id)
  const personResponseJSON = await personResponse.json()

  // Render de detailpagina van de persoon
  response.render('person.liquid', {person: personResponseJSON.data})
});

// Ik heb het poortnummer ingesteld waar express op moet gaan luisteren. Ik heb de port het nummer 8080 gegeven zodat deze niet hetzelfde is als mijn visitekaartje.
app.set('port', process.env.PORT || 8080)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

// Sites onder elkaar gezet voor duidelijkheid.
// Site van klas 1H: 'https://fdnd.directus.app/items/person/?fields=*,squads.squad_id.name&filter={"squads":{"squad_id":{"name":"1H"}}}&sort=name'
// Site van klas 1G: 'https://fdnd.directus.app/items/person/?fields=*,squads.squad_id.name&filter={%22squads%22:{%22squad_id%22:{%22name%22:%221G%22}}}&sort=name'
// Alle persons:'https://fdnd.directus.app/items/person/?sort=name&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}}]}'