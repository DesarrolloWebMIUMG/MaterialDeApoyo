const moment = require('moment-timezone');
var Log = require('../models/Log.js');
var utils = require('../utils.js');
var log = utils.getLog();
var infoLog;
var TAddress = require('../models/MAddress.js');
var TAddresses = require ('../models/AMAddresses.js');



exports.getAddressList = function (req, res, next) {
   
    var startTime = moment(new Date());
    
    infoLog = new Log({
        uri: req.url,
        clientIP: utils.getClientIP(req)
    })

//    log.info(infoLog, "Inicio de función Address: " + moment(new Date()));
    infoLog.responseTime = utils.getResponseTime(startTime);
    
    var token = true;
    if ((req.headers.authorization) && (req.headers.authorization.split(' ')) && (req.headers.authorization.split(' ').length > 1)) {
        token = req.headers.authorization.split(' ')[1];
        infoLog.apiKey = token;
        infoLog.responseTime = utils.getResponseTime(startTime);
    }

    if ((token) && (utils.isAuthorized(token))) {
        //Token válido. Se construye query para consultar municipios
        const departmentName = req.query.department;
        const provinceName = req.query.province;
        const zone = req.query.zone;
        const addressText = req.query.address;

        if (!(departmentName)||!(provinceName)||!(addressText))
        {
            infoLog.responseCode = 400;
            infoLog.responseTime = utils.getResponseTime(startTime);
            log.error(infoLog, utils.getError(utils.error(400)))
            next(utils.error(400));
        }
        else
        {
            const pattern =  /[\^*@!"#$%&/()=?¡!¿'\\]/gi;

            let sql = " select NVL(direccion,'') as direccion, NVL(hub,'') AS hub, NVL(nodo,'') AS nodo, NVL(poste,'') as poste, NVL(lat, 0.00) as lat, NVL(lon, 0.00) as lon, IDDirAS400 as idAS400, tecnologia, vendor from direcciones " +
            " where departamento = '" + departmentName.toUpperCase() + "'" +
            " and municipio = '" + provinceName.toUpperCase() + "'" ;

            if (zone){
                sql = sql + " and  zona = " + zone ;
            }

            sql = sql + " and IDDirAS400 is not null and IDDirAS400 > 0 ";
            
            sql = sql + " and direccion like '%" + addressText.toUpperCase().replace(pattern, '') + "%' AND ROWNUM <= 100";
                                  
            utils.getData(sql, [], function(err, dataDb){
           
                if (err) {
                    infoLog.responseCode = 503;
                    infoLog.responseTime = utils.getResponseTime(startTime);
                    log.error(infoLog, "Error en la conexion a la DB. Detalle: " + err);
                    log.error(infoLog, utils.getError(utils.error(503)));
                    next(utils.error(503, "Error de conexion a DB."));
                }
                else {

                    if (dataDb.rows.length !== 0)
                    {                              
                        var vAddress = new TAddress();
                        var vAddresses = new TAddresses();
                        for (var i = 0; i< dataDb.rows.length; i++){
                            vAddress.address = dataDb.rows[i].DIRECCION;
                            vAddress.hubId =dataDb.rows[i].HUB;
                            vAddress.nodeId =dataDb.rows[i].NODO;
                            vAddress.poleId = dataDb.rows[i].POSTE;
                            vAddress.latitude = dataDb.rows[i].LAT;
                            vAddress.longitude = dataDb.rows[i].LON;
                            vAddress.referenceIdLegacy = dataDb.rows[i].IDAS400;
                            vAddress.technology = dataDb.rows[i].TECNOLOGIA;
                            vAddress.vendor = dataDb.rows[i].VENDOR;
                            vAddresses.addresses.push(vAddress);                               
                        }
                        vAddresses.coincidences = dataDb.rows.length;
                        infoLog.responseTime = utils.getResponseTime(startTime);
                        infoLog.responseCode = 200;
                        log.info(infoLog, 'Consulta de dirección exitosa.');
                        res.status(200).json(vAddresses);   
                    }
                    else{                        
                        infoLog.responseCode = 204;
                        infoLog.responseTime = utils.getResponseTime(startTime);
                        log.error(infoLog, utils.getError(utils.error(204)));
                        next(utils.error(204, "La consulta de departamentos no devolvió información."));
                    }
                }                
        });
        }          
    }
    else {
        //Error en la autenticación. Token no válido o no autorizado. 
        infoLog.responseCode = 401;
        infoLog.responseTime = utils.getResponseTime(startTime);
        log.error(infoLog, utils.getError(utils.error(401)));
        log.error(infoLog, "Error de autenticación de cliente");
        next(utils.error(401));
    }
}
