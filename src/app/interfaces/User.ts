export interface User {
        id: number;
        name: string;
        email: string;
        address: string;
        phone: string;
        cpf: string;
        birthday: string;
        sex: string;
        car: Car;
}
    
export interface Car {
    color: string;
    brand: string;
    model: string;
    chassi: string;
    renavam: number;
    plaque: string;
}

export interface userFeedback {
    very_satisfied: number;
    satisfied: number;
    medium: number;
    bad: number;
    very_bad: number;
}
        