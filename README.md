# Rabbit MQ Consumer Service (Docker + Node.js + Express.js)

Exemple minimal de micro service basé Node.js et Express.js illustrant la communication asynchrone à l'aide de messages basés sur le protocole AMQP et le Message Broker RabbitMQ

## Test

### RabbitMQ

- Interface web RabbitMQ <http://localhost:15673/> (ou 15672 selon votre config),
- Identifiant : guest, Mot de passe : guest

### Consumer

- Création et remplissage des fichiers `./mq_consumer_service/.env` et `./mq/.env` sur la base des fichiers ".env.example" fournis,
- Création d'une Queue du même nom que celui écouté par le service __mq_consumer_service__ (dans mon exemple __the_queue__), en vous référant à la valeur de la variable d'environnement __MQ_QUEUE__ renseignée dans ``./mq_consumer_service/.env``
- Dans le bloc __Consumers__, le nom du service __mq_consumer_service__ doit apparaître (cela signifie que le service est bien en écoute de la queue __the_queue__),
- Depuis l'onglet __Queue__, sélectionner la queue nommée __the_queue__, puis envoyer un message avec un payload au format JSON comme ```JSON {"message":"Hello, World !"}```
- Observer les logs du service __mq_consumer_service__ pour vérifier que le service réagit bien au message envoyé dans la queue __the_queue__,
- Le service __mq_consumer_service__ est directement installé et démarré par Docker, ne pas effectuer de commande `npm install` ou `npm start`. Un système de Hot Reloading permet de recharger le service Node.js à chaque modification d'un fichier dans le dossier ``./mq_consumer_service``,

### Provider

- Création et remplissage des fichiers `./mq_provider_service/.env` et `./mq/.env` sur la base des fichiers ".env.example" fournis,
- Le service __mq_provider_service__ est directement installé et démarré par Docker, ne pas effectuer de commande `npm install` ou `npm start`. Un système de Hot Reloading permet de recharger le service Node.js à chaque modification d'un fichier dans le dossier ``./mq_provider_service``,

- L'Envoi d'une requête HTTP POST sur <http://localhost:3334/messages> (avec body au format JSON contenant un attribut "message") permet d'envoyer le message contenu dans la requête HTTP à RabbitMQ.

```SHELL
curl --request POST \
  --url http://localhost:3334/messages \
  --data '{"message":"Hello, World!"}'
```

--

!["Logotype Shrp"](https://shrp.dev/images/shrp.png)

__Alexandre Leroux__  
_Enseignant / Formateur_  
_Développeur logiciel web & mobile_

Nancy (Grand Est, France)

<https://shrp.dev>
