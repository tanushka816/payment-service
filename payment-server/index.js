var options = { root: 'D:\\Tanya\\_KN\\WEB_DHTML\\payment-server\\' };
var express = require('express');
var app = express();
var firebase = require('firebase');
var fs = require("fs");
var jwt = require("jsonwebtoken");


var firebaseConfig = require('./firebase.config.json');
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var secretKey = 'S0Me_SeCr3t_kEY';

app.listen(4201, () => console.log('localhost 4201!'));

app.all('*', function(request, response, next) {
    if (!response.headersSent) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS, POST, PATCH");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Set-Authorization, X-Authorization, Accept, Content-Type, Access-Control-Request-Methods, Access-Control-Request-Headers, Access-Control-Allow-Headers");
        response.setHeader("Access-Control-Expose-Headers", "Origin, X-Set-Authorization, X-Authorization")
    }
    if ('OPTIONS' == request.method && response.headersSent) {
        response.status(200);
        response.end();
    }
    next();
});

app.post('/auth', function(request, response) {
    const email = request.body.email;
    const password = request.body.password;
    console.log(email);
    console.log(password);

    if (email === 'admin@admin.ru' && password === 'admin1234') {
        if (!response.headersSent) {
            let token = {email, password};
            let resultToken = `${jwt.sign(token, secretKey)}`;
            response.setHeader('X-Set-Authorization', resultToken);
            console.log('Отправление токена');
            response.send({ isCorrect: true }).end();
        }
    }
    else if (!response.headersSent) {
        return response.send({ isCorrect: false }).end();
    }
})


app.post('/download', function(request, response) {
    const value = request.body;
    try {
        const result = `
        ИНН: ${value.inn}
        БИК: ${value.bik}
        НОМЕР КАРТЫ: ${value.card_number}
        НДС: ${value.nds}
        СУММА: ${value.summ}`
        fs.writeFileSync("./temp.txt", result);
        response.sendFile('temp.txt', options, err => err 
            ? throws(response, err)
            : send(response, 'Скачивание файла'));
        
    } catch(err) {
        if (!response.headersSent)
            return response.status(401).end();
    }
});

app.post('/:path', function(request, response) {
    const value = request.body;
    db.collection(request.path)
        .add(value)
        .then(() => send(response, 'Данные сохранены'))
        .catch(error => throws(response, error))
});

app.get('/:path', function(request, response) {
    const field = request.query.field || 'email';
    const filter = request.query.filter;
    const sort = request.query.sort;
    console.log("field: ", field);
    console.log("filter: ", filter);
    console.log("sort: ", sort);

    let ref = db.collection(request.path);
    if (filter) {
        ref = ref.where(field, "==", filter);
    }
    if (sort) {
        ref = ref.orderBy(field, sort);
    }
    ref.onSnapshot(function(snapshot) {
        const res = snapshot.docs.map(doc => {
            const data = doc.data();
            data['id'] = doc.id;
            return data;
        });
        send(response, res, 'Данные отправлены');
    });
})

app.patch('/change-secure', function(request, response) {
    const updates = request.body;
    db.collection('card-payment').doc(updates.id)
        .update({'secure': updates.secure})
        .then(() => send(response, 'Статус платежа изменен'))
        .catch(error => throws(response, error));
})

function throws(response, error) {
    console.error(error.message + " " + !response.headersSent)
    if (!response.headersSent)
        return response.status(error.code).end();
};

function send(response, body) {
    console.log(body + " " + !response.headersSent);
    if (!response.headersSent)
        return response.status(200).send(body).end();
};
