const VISA_DEVELOPMENT = true;

// Desarrollo Visa
const VISA_DEV_MERCHANT_ID = '522591303';
const VISA_DEV_USER = 'integraciones.visanet@necomplus.com';
const VISA_DEV_PWD = 'd5e7nk$M';
const VISA_DEV_URL_SECURITY = 'https://apitestenv.vnforapps.com/api.security/v1/security';
const VISA_DEV_URL_SESSION = 'https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/'+VISA_DEV_MERCHANT_ID;
const VISA_DEV_URL_JS = 'https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true';
const VISA_DEV_URL_AUTHORIZATION = 'https://apitestenv.vnforapps.com/api.authorization/v3/authorization/ecommerce/'+VISA_DEV_MERCHANT_ID;

    // Producción Visa
const VISA_PRD_MERCHANT_ID = '527127703';
exports.VISA_PRD_USER = 'integraciones.visanet@necomplus.com';
exports.VISA_PRD_PWD = 'd5e7nk$M';
exports.VISA_PRD_URL_SECURITY = 'https://apiprod.vnforapps.com/api.security/v1/security';
exports.VISA_PRD_URL_SESSION = 'https://apiprod.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/'+VISA_PRD_MERCHANT_ID;
exports.VISA_PRD_URL_JS = 'https://static-content.vnforapps.com/v2/js/checkout.js';
exports.VISA_PRD_URL_AUTHORIZATION = 'https://apiprod.vnforapps.com/api.authorization/v3/authorization/ecommerce/'+VISA_PRD_MERCHANT_ID;

    // Configuración visa
exports.VISA_MERCHANT_ID = VISA_DEVELOPMENT ? VISA_DEV_MERCHANT_ID : VISA_PRD_MERCHANT_ID;
exports.VISA_USER = VISA_DEVELOPMENT ? VISA_DEV_USER : VISA_PRD_USER;
exports.VISA_PWD = VISA_DEVELOPMENT ? VISA_DEV_PWD : VISA_PRD_PWD;
exports.VISA_URL_SECURITY = VISA_DEVELOPMENT ? VISA_DEV_URL_SECURITY : VISA_PRD_URL_SECURITY;
exports.VISA_URL_SESSION = VISA_DEVELOPMENT ? VISA_DEV_URL_SESSION : VISA_PRD_URL_SESSION;
exports.VISA_URL_JS = VISA_DEVELOPMENT ? VISA_DEV_URL_JS : VISA_PRD_URL_JS;
exports.VISA_URL_AUTHORIZATION = VISA_DEVELOPMENT ? VISA_DEV_URL_AUTHORIZATION : VISA_PRD_URL_AUTHORIZATION;