export interface Parking {

    fantasy_name?: string;
    vacancies_number: number;
    company_email: string;
    hour_price?: number;
    company_address: string;
    daily_price: number;
    cnpj: string;
    monthly_vacancies: number;
    social_reason: string;
    monthly_price?: number;
    apresentation_image: Blob;
    password: string;
}

export interface dailyInformations {
    vacancy_utilized: number;
    disponible_vacancies: number;
    busy_vacancies: number;
}

