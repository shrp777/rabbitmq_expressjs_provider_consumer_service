# Message Queue Consumer Service

Exemple minimal de micro service basé Node.js et Express.js illustrant l'écoute d'un service RabbitMQ via AMQP

## Test

- Interface web RabbitMQ <http://localhost:5673/> (ou 5672 selon votre config),
- Création et remplissage des fichiers `./mq_consumer_service/.env` et `./mq/.env` sur la base des fichier ".env.example" fournis,
- Création d'une Queue du même nom que celui écouté par le service __mq_consumer_service__ (dans mon exemple __the_queue__), en vous référant à la valeur de la variable d'environnement __MQ_QUEUE__ renseignée dans ``./mq_consumer_service/.env``
- Dans le bloc __Consumers__, le nom du service __mq_consumer_service__ doit apparaître (cela signifie que le service est bien en écoute de la queue __the_queue__),
- Depuis l'onglet __Queue__, sélectionner la queue nommée __the_queue__, puis envoyer un message avec un payload au format JSON comme ```JSON {"message":"Hello, World !"}```
- Observer les logs du service __mq_consumer_service__ pour vérifier que le service réagit bien au message envoyé dans la queue __the_queue__,
- Le service __mq_consumer_service__ est directement installé et démarré par Docker, ne pas effectuer de commande `npm install` ou `npm start`. Un système de Hot Reloading permet de recharger le service Node.js à chaque modification d'un fichier dans le dossier ``./mq_consumer_service``,

--

!["Logotype Shrp"](https://shrp.dev/images/shrp.png)

__Alexandre Leroux__  
_Enseignant / Formateur_  
_Développeur logiciel web & mobile_

Nancy (Grand Est, France)

<https://shrp.dev>
