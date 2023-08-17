require('@instana/collector')();
const express = require('express');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const config = require('config');

var getDeparments = require('./services/getDeparments.js');
var getProvinces = require('./services/getProvincesbyDepId.js');
var getAddresses = require('./services/getAddresses.js');
var postAddress = require('./services/postAddresses.js');
var deleteAddress = require('./services/deleteAddresses');
var utils = require('./utils.js');

const app = express()
app.use(timeout(config.get('localServer.timeout')))

app.use(bodyParser.json())
const router = express.Router()

router.get(config.get('localServer.servicePathGetDeparments'), getDeparments.getDepartments);
router.get(config.get('localServer.servicePathGetProvinces'), getProvinces.getProvinces);
router.get(config.get('localServer.servicePathGetAddress'), getAddresses.getAddressList);
router.post(config.get('localServer.servicePathPostAddress'), postAddress.postAddress);
router.delete(config.get('localServer.servicePathDeleteAddress'), deleteAddress.deleteAddress);

app.use('/', router);
app.get('*', utils.error404)
app.use(utils.errorHandler);


app.listen(config.get('localServer.port'),config.get('localServer.host'))
