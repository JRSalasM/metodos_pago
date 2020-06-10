const Request = require("request");
const Payment = require('../models/payment.model');
const niubiz = require('../config/niubiz.config');
const uuidv4 =  require('uuid').v4;

exports.payment = (req, res) => {
    console.log('----------------------------------------------------------------------------------------');
    console.log(req.body);
    let {username, card_number, cvv, expiration_month, expiration_year, email, amount } = req.body;
    Request.post({
        "headers": { 
            "content-type": "application/json", 
            "Authorization": "Bearer pk_test_drKwjGYg4zn3oNyP" 
        },
        "url": "https://secure.culqi.com/v2/tokens",
        "body": JSON.stringify({
            "card_number": card_number,
            "cvv": cvv,
            "expiration_month": expiration_month,
            "expiration_year": expiration_year,
            "email": email
        })
    }, (error, response, data) => {
        if(error) {
            console.log('Error al obtener token');
            res.status(400).json(JSON.parse(error));
        }
        data = JSON.parse(data);
        console.log('Datos token => ', data);
        if(data.object == 'error'){
            res.status(200).json(data);
        }else{
            amount = amount.toString();
            let hasDecimal = amount.toString().split('.').length > 1
            if(hasDecimal){
                if(amount.toString().split('.')[1].length == 1){
                    amount = `${amount.replace('.', '')}0`;
                }else{
                    amount = amount.replace('.', '');
                }
            }else{
                amount =  `${amount}00`
            }
            Request.post({
                "headers": { "content-type": "application/json", "Authorization": "Bearer sk_test_EktyzmmVZYEoNNKr" },
                "url": "https://api.culqi.com/v2/charges",
                "body": JSON.stringify({
                    "amount": amount,
                    "currency_code": "PEN",
                    "email": email,
                    "source_id": data.id
                })
            }, (error, response, data) => {
                if(error) {
                    console.log('Error al proceder pago');
                    res.status(400).json(JSON.parse(error));
                }
                data = JSON.parse(data);
                console.log('datos pago => ', data);
                if(data.object == 'error'){
                    res.status(200).json(data);
                }else{
                    new Payment({ id: uuidv4(), username, email, amount, data_payment: JSON.stringify(data) })
                    .save()
                    .then((response) => {
                        console.log('Payment => ', response);
                        res.status(201).json(data);
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(200).json({
                            object: 'error',
                            user_message: 'El pago fue realizado exitosamente, pero ocurrio un error contactate con el la empresa'
                        });
                    })
                }
            });
        }
    });
}

exports.getSessionNiubiz = (req, res) => {
    let {email, amount } = req.body;
    Request.post({
        "headers": {
            "Authorization": `Basic ${Buffer.from(niubiz.VISA_USER + ':' + niubiz.VISA_PWD).toString('base64')}`
        },
        "url": niubiz.VISA_URL_SECURITY
    }, (error, response, data) => {
        if(error) {
            console.log('Error Seguridad');
            res.status(400).json(JSON.parse(error));
        }
        //Session
        Request.post({
            "headers": {
                "content-type": "application/json",
                "Authorization": data
            },
            "url": niubiz.VISA_URL_SESSION,
            "body": JSON.stringify({
                "amount": amount,
                "antifraud":{
                    "clientIp":"192.168.1.196", 
                    "merchantDefineData":{
                        "MDD4": email,
                        "MDD33":"DNI",
                        "MDD34":"45678901",
                    }
                },
                "channel":"web"
            })
        }, (error, response, data) => {
            if(error) {
                console.log('Error Session');
                console.log(error);
                res.status(400).json(JSON.parse(error));
            }
            res.status(201).json(Object.assign(JSON.parse(data), {
                script: niubiz.VISA_URL_JS,
                merchantid: niubiz.VISA_MERCHANT_ID,
            }));
        });
    });
}

exports.paymentNiubiz = (req, res) => {
    let { transactionToken, customerEmail} = req.body
    let { amount, purchaseNumber} = req.query;
    Request.post({
        "headers": {
            "Authorization": `Basic ${Buffer.from(niubiz.VISA_USER + ':' + niubiz.VISA_PWD).toString('base64')}`
        },
        "url": niubiz.VISA_URL_SECURITY
    }, (error, response, data) => {
        if(error) {
            console.log('Error Seguridad');
            res.status(400).json(JSON.parse(error));
        }
        Request.post({
            "headers": {
                "content-type": "application/json",
                "Authorization": data
            },
            "url": niubiz.VISA_URL_AUTHORIZATION,
            "body": JSON.stringify({
                'antifraud': null,
                'captureType': 'manual',
                'channel': 'web',
                'countable': true,
                'order': {
                    'amount': amount,
                    'currency': 'PEN',
                    'purchaseNumber': purchaseNumber,
                    'tokenId': transactionToken
                },
                'recurrence': null,
                'sponsored': null
            })
        }, (error, response, data) => {
            if(error) {
                console.log('Error Session');
                console.log(error);
                res.status(400).json(JSON.parse(error));
            }
            let id = uuidv4();
            new Payment({ id, customerEmail, customerEmail, amount, data_payment: JSON.stringify(data) })
            .save()
            .then((response) => {
                console.log('Payment => ', response);
                res.redirect('http://localhost:3000/payment/'+id)
            })
            .catch((err) => {
                console.log(err)
                res.status(200).json({
                    object: 'error',
                    user_message: 'El pago fue realizado exitosamente, pero ocurrio un error contactate con el la empresa'
                });
            })
        });
    });
}

exports.getPaymentNiubiz = (req, res) => {
    Payment.findOne({ id: req.params.id })
    .then((response) => {
        res.status(200).json(response);
    })
}