# NestJSProject
Progetto in NestJS per la semplice gestione di oridini e prodotti ad esso collegati.

## Contenuto
All'interno della repository sono presenti i seguenti file
- src: contiene i file del progetto backend
  - entities: contiene i file relativi alle entità del database, descrivendone gli attributi
  - dto: contiene i file relativi ai dto, in modo da gestire il formato delle richieste e delle resposte delle API
  - orders: contiene i file controller e service per gestire le richieste API
  - app.module: contiene le configurazioni di base dell'app, in particolare la connessione al db
- .env: contiene i parametri relativi all'environment
- db.sql: contiene le query per la creazione del db dell'app
- docker-compose.yml: definisce la descrizione dell'environment di Docker in modo da creare i container relativi all'app e al database e definisce quali comandi eseguire all'avvio dei container
- Dockerfile: definisce i comandi da eseguire all'avvio del container relativo all'app del backend

## Installazione
***
Ecco i passaggi da seguire per l'installazione in locale:
```
$ git clone https://github.com/skarawalker/NestJSProject.git
$ npm install
$ npm run start
```
Per l'installazione su container docker, si possono seguire i seguenti passaggi:
```
$ git clone https://github.com/skarawalker/NestJSProject.git
$ docker-compose up --build
```

## API
| Metodo  | Endpoint         | Descrizione                                      |
|---------|-----------------|--------------------------------------------------|
| `GET`   | `/orders`       | Ottiene tutti gli ordini con paginazione e filtro per status |
| `GET`   | `/orders/:id`   | Ottiene un singolo ordine per ID                 |
| `POST`  | `/orders`       | Crea un nuovo ordine                             |
| `PATCH` | `/orders/:id`   | Aggiorna lo stato di un ordine                   |
| `DELETE`| `/orders/:id`   | Elimina un ordine                                |

---
