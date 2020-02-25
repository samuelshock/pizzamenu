export class User {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        // fields to register
        public password1?: string,
        public password2?: string,
        public admin?: boolean,
        public _id?: string,
    ) {}
}
