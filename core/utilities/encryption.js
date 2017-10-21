const bcrypt = require('bcrypt');
const { Promise } = require('es6-promise').Promise;

// hash.make('password123')
// .then(hsh => console.log(hsh))
// .catch(err => console.error(err));

// hash.compare('password123', hsh)
// .then(() => console.log('Match!'))
// .catch(err => console.log('Does not match!'));

class Encrypt {
    constructor(numberOfRounds) {
        this.numberOfRounds = numberOfRounds;
    }

    encryptPromise(str) {
        return new Promise((resolve, reject) =>
            // Generate hash's random salt
            bcrypt.genSalt(this.numberOfRounds, (err, salt) => {
                if (err) { return reject(err); }

                // Now, with the given salt, generate the hash
                return bcrypt.hash(str, salt, (err1, hash) => {
                    if (err1) { return reject(err1); }

                    // Hash generated successfully!
                    console.log('get hash as ', hash);
                    return resolve(hash);
                });

                // return bcrypt.hashSync(password, numberOfRounds);
            }));
    }

    static comparePromise(str, hash) {
        // console.log('encrypt from ', password, '\tto ', encryptedPassword);
        return new Promise((resolve, reject) =>
            bcrypt.compare(str, hash, (err, result) => {
                if (err) { return reject(err); }
                return result ? resolve() : reject();
            }));
    }
}

const encrypt = new Encrypt(10);

module.exports = encrypt;
