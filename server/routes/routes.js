var empresa = require('./empresas/empresa');
var usuario = require('./usuarios/usuario');
var login = require('./login/login');
var grupoDeModulo = require('./grupos-de-modulo/grupo-de-modulo');
var jwt = require('jsonwebtoken');


//Seed options
var seed =  require('.././seeders/seed');

module.exports = function (app, passport) {
    
    app.use('/empresa', isLoggedIn, empresa);
    app.use('/grupos-de-modulos', isLoggedIn, grupoDeModulo);
    app.use('/usuario', usuario);
    app.use('/auth', login);
    app.use('/app', seed);
};

function isLoggedIn(req, res, next) {
    if (req.session) {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {

            jwt.verify(token, req.app.get('secret'), function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Falha de autenticação do token.' });
                } else {

                    //procura o usuario por empresa.


                    next();
                }
            });
        }
    } else {
        res.json({ success: false, message: 'Falha de autenticação do token.' });
    }
}