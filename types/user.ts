export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    cpf: string;
    createdAt: Date;
    messages: Message[];
}

export interface Message {
    message: string
}