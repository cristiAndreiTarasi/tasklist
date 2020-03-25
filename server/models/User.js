const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true, max: 32 },
    email: { type: String, trim: true, required: true, unique: true, lowercase: true },
    hashed_password: { type: String, required: true, unique: true },
    // image: { type: String, required: true },
    salt: String,
    role: { type: String, default: 'subscriber' },
    resetPasswordLink: { data: String, default: '' },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

/* UserSchema password virtual with set & get */
UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

/* UserSchema methods*/
UserSchema.methods = {
    authenticate (password) {
        return this.encryptPassword(password) === this.hashed_password;
    },
    
    encryptPassword (password) {
        if (!password) return '';

        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (error) {
            return '';
        }
    },

    makeSalt () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

module.exports = mongoose.model('User', UserSchema);
