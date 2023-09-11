export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public senhaCripto?: string,
        public id?: string
     ) {}
}