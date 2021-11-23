export interface Service {
    descrição: string;
    usuário: string;
    carro: string;
    placa: string;
    imagem:string;
}

export interface newService {
    service_name: string;
    days_active: number;
    price: number;
    active: boolean;
}