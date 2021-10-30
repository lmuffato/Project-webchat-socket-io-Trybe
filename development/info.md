

```
database: webchat

colection: messages

// Exemplo de itens da coleção:
messages = 
[
  {
    _id: ObjectId("617ad292155aa71e84b672bf"),
    nickname: 'Lucas',
    message: 'Olá',
    timestamp: '2021-04-01 12:00:00'
  },
  {
    _id: ObjectId("617ad292155aa71e84b672c0"),
    nickname: 'Tiago',
    message: 'Tudo bem?',
    timestamp: '2021-04-01 12:01:00'
  },
  {
    _id: ObjectId("617ad292155aa71e84b672c1"),
    nickname: 'Lucas',
    message: 'Sim e você?',
    timestamp: '2021-04-01 12:02:00'
  }
]
;
```

Criar a coleção inserindo um objeto
```
use webchat;

db.messages.insertMany([
  { nickname: 'Lucas', message: 'Olá', timestamp: '2021-04-01 12:00:00' },
  { nickname: 'Tiago', message: 'Tudo bem?', timestamp: '2021-04-01 12:01:00' },
  { nickname: 'Lucas', message: 'Sim e você?', timestamp: '2021-04-01 12:02:00' }
]);

db.messages.deleteMany({});

```