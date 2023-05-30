export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    img: string;
    cpf: string;
    status: boolean;
    createdAt: Date;
    messages: Message[];
}

export interface Message {
    sender: string;
    recipient: string;
    message: string;
    createdAt: Date
}