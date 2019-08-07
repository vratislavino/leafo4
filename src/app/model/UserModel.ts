export class User {
	
    public id: number;
    public email: string;
    public username: string;
    public firstname: string;
    public lastname: string;
    public addressing: string;
    public sign: number;
    public sex: number;

    constructor(/*id: number=0, */email: string=""/*, username: string="", addressing: string="", firstname: string="", lastname: string="", sign: number=0, sex: number=0*/) {

        this.email = email;
    }

    public copy():User {
        var u = User.createUser(this.email);
        u.extractUser(this);
        return u;
    } 

    public static createUser(email:string) : User{
        return new User(email);
    }

    public static createWholeUser(data: any) : User {
        var u = User.createUser(data.email);

        u.extractUser(data);

        return u;
    }

    public extractUser(data: any) {
        this.fillUser(
            data.id,
            data.username,
            data.addressing,
            data.firstname,
            data.surname,
            data.sign,
            data.sex
        );
    }

    public fillUser(id: number, username: string, addressing: string, firstname: string, lastname: string, sign: number, sex: number) {
        this.id = id;
    	this.username = username;
    	this.firstname = firstname;
    	this.lastname = lastname;
        this.addressing = addressing;
        this.sign = sign;
        this.sex = sex;
    }

    public getId(): number {
    	return this.id;
    }

    public setEmail(val: string) {
        this.email = val;
    }

    public getEmail(): string {
        return this.email;
    }

    public setAddressing(val: string) {
        this.addressing = val;
    }

    public getAddressing(): string {
    	return this.addressing;
    }

    public setUsername(val: string) {
        this.username = val;
    }

    public getUsername(): string {
    	return this.username;
    }

    public setFirstName(val: string) {
        this.firstname = val;
    }

    public getFirstName(): string {
    	return this.firstname;
    }

    public setLastName(val: string) {
        this.lastname = val;
    }

    public getLastName(): string {
    	return this.lastname;
    }

    public setSign(val: number) {
        this.sign = val;
    }

    public getSign(): number {
        return this.sign;
    }

    public setSex(val: number) {
        this.sex = val;
    }

    public getSex(): number {
        return this.sex;
    }
}