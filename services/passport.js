const passport = require('passport');
const User = require('./../Models/user');
const config = require('./../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


// //Create Local Strategy
// const LocalOptions = { usernameField:'email'};
// const LocalLogin = new LocalStrategy(LocalOptions, function(email, password, done){
//
//     User.findOne({ email: email }, function(err, user){
//         if(err)     { return done(err);         }
//         if(!user)   { return done(null, false); }
//
//         user.comparePassword(password, function(err, isMatch){
//             if(err)     {   return done(err);           }
//             if(!isMatch){   return done(null, false);   }
//
//             return done(null, user);
//         });
//     });
// });
//
//
// //Options for Jwt Strategy
// const jwtOptions = {
//     jwtFromRequest : ExtractJwt.fromHeader('authorization'),
//     secretOrKey: config.secret
// };
//
//
// //Create Jwt Strategy
// const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
//
//     User.findById(payload.sub, function(err, user){
//         if(err){  return done(err, false);  }
//
//         if(user){ return done(null, user);  }
//         else    { return done(null, false);  }
//     });
// });



var SamlStrategy = require('passport-saml').Strategy;

passport.use(new SamlStrategy(
    {
        path: '/saml/acs',
        entryPoint: 'https://ssodev.paypalcorp.com/idp/startSSO.ping?PartnerSpId=oncampus\n',
        issuer: 'oncampus',
        protocol: 'https://',
        cert: 'MIIF0TCCBLmgAwIBAgIQDDUobwuA7t/Q5zwbfFRxDzANBgkqhkiG9w0BAQsFADCBmTELMAkGA1UE\n' +
        'BhMCVVMxDzANBgNVBAoTBlBheVBhbDEeMBwGA1UECxMVQ3J5cHRvIEtleSBNYW5hZ2VtZW50MSYw\n' +
        'JAYDVQQLEx1Gb3IgUGF5UGFsIEludGVybmFsIFNpdGUgT25seTExMC8GA1UEAxMoUGF5UGFsIFNl\n' +
        'cnZlciBHZW5lcmFsIEVuZFBvaW50IElzc3VlciBHMTAeFw0xNzAzMzAwMDAwMDBaFw0yMDA0MDIx\n' +
        'MjAwMDBaMIGWMQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTERMA8GA1UEBxMIU2Fu\n' +
        'IEpvc2UxDzANBgNVBAoTBlBheVBhbDEmMCQGA1UECxMdRm9yIFBheVBhbCBJbnRlcm5hbCBTaXRl\n' +
        'IE9ubHkxJjAkBgNVBAMTHXNzb3NpZ25pbmcyMDE3LnBheXBhbGNvcnAuY29tMIIBIjANBgkqhkiG\n' +
        '9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqCCzCXxn2jLzvJjZpQEYIVyelUkPlNntQ/kxh9q/ur9iseH4\n' +
        '4iDaDGD3PjExWt+nFCHgKDfiT5zcVCOljHXy6IybobWSsUecwRKYz0U7rHJnFuQh+CUQ/2aDNyhY\n' +
        'jr6rq8A3y2//dcPtvx8RU0Lkwoib0Lx4uHyUX78gHf+KfDumcEUHoJqc4+XfOshWaREKcCbG984c\n' +
        'KpK0/nlPvi64ZDHi21bKF0qUd6ukyCWfP4Rkn5sjkCe6UO74VrpGNfQ6HTK+ymK18jZ5/bY6FTPe\n' +
        'yaeu+vuN0VAsjEyYVUGGbWzhw87RYoMsz8HYXeA/jPZJ8Qmh7LEhpiLIQxBMN99dKwIDAQABo4IC\n' +
        'FDCCAhAwHwYDVR0jBBgwFoAUou/BTEu0bIWkhLTjXKNTIRZGZVgwHQYDVR0OBBYEFF3Ihb5MNzac\n' +
        '+sXfwfDS5yyu8YvZMCgGA1UdEQQhMB+CHXNzb3NpZ25pbmcyMDE3LnBheXBhbGNvcnAuY29tMA4G\n' +
        'A1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwgZsGA1UdHwSBkzCB\n' +
        'kDBGoESgQoZAaHR0cDovL2NybDMuZGlnaWNlcnQuY29tL1BheVBhbFNlcnZlckdlbmVyYWxFbmRQ\n' +
        'b2ludElzc3VlckcxLmNybDBGoESgQoZAaHR0cDovL2NybDQuZGlnaWNlcnQuY29tL1BheVBhbFNl\n' +
        'cnZlckdlbmVyYWxFbmRQb2ludElzc3VlckcxLmNybDBBBgNVHSAEOjA4MDYGCGCGSAGG/WxCMCow\n' +
        'KAYIKwYBBQUHAgEWHGh0dHBzOi8vd3d3LmRpZ2ljZXJ0LmNvbS9DUFMwgYUGCCsGAQUFBwEBBHkw\n' +
        'dzAkBggrBgEFBQcwAYYYaHR0cDovL29jc3AuZGlnaWNlcnQuY29tME8GCCsGAQUFBzAChkNodHRw\n' +
        'Oi8vY2FjZXJ0cy5kaWdpY2VydC5jb20vUGF5UGFsU2VydmVyR2VuZXJhbEVuZFBvaW50SXNzdWVy\n' +
        'RzEuY3J0MAwGA1UdEwEB/wQCMAAwDQYJKoZIhvcNAQELBQADggEBAMTvQO6tUVJcemzIp3oye5TL\n' +
        'BJzdlteRolr0YkujP/dHan4W6NWEigdYsLTnnppgauTjFCtyt3qguxgOBIoG0lABb9BCLTwF8Xsn\n' +
        'fNS19epwiHmArJ0uUUnAB/hgPbgBfJllAJuxWBwQjHlXR1mZu5ZOwvkR8v+Lzw29oc0YP4zYiK6r\n' +
        'HcRREm0tyCEXQBRFHRg+ES7X0HwOHLkrmWzkmulCjoOyL4P8sLLcAAgxZZlOeq+H6iu4kEXWuEdM\n' +
        '5i+cPwlyvhQtdcz+4Zd0NR8i8ZY8hc6mupM1378VFBklJYXsUfcwb9T+wAvbPbN7ma4Dq7jj6toh\n' +
        'B4K363d/FtUA3pE=',
        encryptedSAML: true

    },
    function(profile, done) {
        console.log(profile);
        return done(null, profile);
    })
);

// //Tell Passport to use this strategy
// passport.use(jwtLogin);
// passport.use(LocalLogin);