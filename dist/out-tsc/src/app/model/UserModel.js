export class User {
    constructor(/*id: number=0, */ email = "" /*, username: string="", addressing: string="", firstname: string="", lastname: string="", sign: number=0, sex: number=0*/) {
        this.email = email;
    }
    copy() {
        var u = User.createUser(this.email);
        u.extractUser(this);
        return u;
    }
    static createUser(email) {
        return new User(email);
    }
    static createWholeUser(data) {
        var u = User.createUser(data.email);
        u.extractUser(data);
        return u;
    }
    extractUser(data) {
        this.fillUser(data.id, data.level, data.username, data.addressing, data.firstname, data.surname, data.sign, data.sex);
    }
    fillUser(id, level, username, addressing, firstname, lastname, sign, sex) {
        this.id = id;
        this.level = level;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.addressing = addressing;
        this.sign = sign;
        this.sex = sex;
    }
    getId() {
        return this.id;
    }
    setEmail(val) {
        this.email = val;
    }
    getEmail() {
        return this.email;
    }
    setLevel(val) {
        this.level = val;
    }
    getLevel() {
        return this.level;
    }
    setAddressing(val) {
        this.addressing = val;
    }
    getAddressing() {
        return this.addressing;
    }
    setUsername(val) {
        this.username = val;
    }
    getUsername() {
        return this.username;
    }
    setFirstName(val) {
        this.firstname = val;
    }
    getFirstName() {
        return this.firstname;
    }
    setLastName(val) {
        this.lastname = val;
    }
    getLastName() {
        return this.lastname;
    }
    setSign(val) {
        this.sign = val;
    }
    getSign() {
        return this.sign;
    }
    setSex(val) {
        this.sex = val;
    }
    getSex() {
        return this.sex;
    }
}
//# sourceMappingURL=UserModel.js.map