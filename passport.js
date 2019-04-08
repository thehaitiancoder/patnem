const passport          = require('passport');
const LocalStrategy     = require('passport-local').Strategy;
const UserModel         = require('mongoose').model('User');

const passportJWT       = require('passport-jwt');
const JWTStrategy       = passportJWT.Strategy;
const ExtractJWT        = passportJWT.ExtractJWT;

passport.use(new LocalStrategy ({
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, cb) => {
        return UserModel.findOne({email, password})
            .then(user => {
                if (!user) {
                    return cb(null, false, {message: 'Incorrect email or password'});
                }

                return cb(null, user, {message: 'Logged In Successfully'});
            })
            .catch(err => cb(err));
    }
));

let opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'edfregretrhythgserew'

passport.use(new JWTStrategy({
        opts
    },
    (jwtPayload, cb) => {
        return UserModel.findById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {return cb(err)});
    }
))