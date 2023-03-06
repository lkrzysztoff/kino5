export type phoneNumber = number | '';
export class User {

    constructor(
        public name:string,
        public surname:string,
        public phone:phoneNumber,
        public email:string,
        public emailConfirm:string,
        public discount:string,
        public agreement: boolean,
        public payment: boolean

    ){}
}