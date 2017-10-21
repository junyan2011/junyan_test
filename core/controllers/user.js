const User = require('../models/user'); // get our mongoose model
const Encrypt = require('../utilities/encryption');
const { Promise } = require('es6-promise').Promise;

class UserController {
    static create(req, res) {
        // create a user based on

        console.log(req.body);
        if (!req.body.username || !req.body.password ||
            !req.body.password2 || req.body.password !== req.body.password2) {
            res.render('signup', { title: 'signup', message: 'no valid inputs' });
            return;
        }

        Encrypt.encryptPromise(req.body.password)
            .then((passwordEncrypted) => {
                const user = {
                    username: req.body.username,
                    password: passwordEncrypted,
                    validated: false,
                };
                return new Promise((resolve, reject) => {
                    console.log('to store data in db');
                    console.log(user);
                    User.create(user, (err) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                    });
                    resolve(user);
                });
            })
            .catch((err) => {
                console.log(err);
                res.render('signup', { title: 'signup', message: 'hashing not work' });
                throw new Error();
            })
            .then((user) => {
                console.log('User saved successfully');
                const message = `signup for ${user.username} success`;
                res.render('signup', { title: 'signup', message });
            })
            .catch((err) => {
                console.log(err);
                res.render('signup', { title: 'signup', message: 'Can not store in DB' });
            });
    }
}

// function getResponse(err, obj) {
//     let result;
//     if (err) {
//         console.log(err);
//         result = {
//             success: false,
//             message: 'Error in DB',
//         };
//     } else if (!obj) {
//         result = {
//             success: false,
//             message: 'NO match find in DB',
//         };
//     } else {
//         console.log('User loaded successfully');
//         const sub = {
//             id: obj.id,
//             name: obj.nickname,
//             datebirth: obj.datebirth,
//         };

//         result = {
//             success: true,
//             message: 'success',
//             sub,
//         };
//     }
//     return result;
// }

// function read(req, res) {
//     const { id } = req.params.id;

//     console.log('get param name as ', id);
//     console.log(typeof id);

//     User.findById(id, (err, obj) => {
//         const result = getResponse(err, obj);
//         console.log(result);
//         res.json(result);
//     });
// }

// function update(req, res) {
//     const { id } = req.params.id;
//     console.log('get param name as ', id);
//     console.log(typeof id);

//     const user = getUser(req);

//     if (user === null) {
//         res.json({
//             success: false,
//             message: 'Not valid input',
//         });
//         return;
//     }

//     User.findByIdAndUpdate(id, user, {}, (err, obj) => {
//         const result = getResponse(err, obj);
//         res.json(result);
//     });
// }


module.exports = UserController;
