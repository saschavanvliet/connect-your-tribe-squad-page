# Squad page

Ontwerp en maak met een team een website met NodeJS en JSON.

De instructie vind je in: [INSTRUCTIONS](https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/INSTRUCTIONS.md)

## Inhoudsopgave Squad page

  * [Beschrijving](#beschrijving)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## De site
<!-- In de Beschrijving staat hoe je project er uit ziet, hoe het werkt en wat je er mee kan. -->
<!-- Voeg een mooie poster visual toe 📸 -->
Dit is het uiteindelijke ontwerp van de individuele site die ik heb gemaakt: 

<img width="1000" alt="image" src="https://github.com/user-attachments/assets/a70ef69e-4597-4c7b-b6bf-a42dca652cad" />
<img width="1000" alt="image" src="https://github.com/user-attachments/assets/faa12212-108f-4691-bd55-68b5f01883a9" />
<img width="1000" alt="image" src="https://github.com/user-attachments/assets/200d1284-2297-4f9b-9f79-c2a0452a0d7b" />
<img width="1000" alt="image" src="https://github.com/user-attachments/assets/4c2192f7-6399-4452-bb87-71cd0a3f6d54" />

Dit zijn de high-resolution schetsen die ik heb gemaakt vantevoren om de website gemakkelijk na te kunnen bouwen. Tijdens het bouwen heb ik zoals je kan zien een paar dingetjes aangepast voor esthetische doeleinden.
<img width="869" alt="image" src="https://github.com/user-attachments/assets/3014d2b7-237f-407d-8697-b662ef965731" />

Github pages live link:
https://connect-your-tribe-squad-page-dk0o.onrender.com

## Kenmerken
Ik heb een skelet in HTML en CSS gemaakt met dynamische data uit een groot JSON bestand verkregen vanuit de fdnd directus website. Daarnaast heb twee routes opgezet voor de squads 1H en 1G door gebruik te maken van specifieke filters in de API-aanroepen. Hierdoor worden alleen de gegevens van de studenten uit die squads opgehaald en weergegeven. Daarnaast heb ik een route geconfigureerd die ervoor zorgt dat ik via de id van de directus-URL de details van een specifieke student weer kan geven.

## Installatie
Ik heb gebruik gemaakt van Express en Liquid in Node.js als het gaat om dynamische data. Voor statische data heb ik gebruik gemaakt van html, css en javascript.

## Bronnen
https://expressjs.com/

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
