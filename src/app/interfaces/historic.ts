export interface today {
  
   date: string,
   user: string,
   name: string,
   board: string,
   period: string;
   value: number
} 

export interface service {
    name: string,
    vacancy: number,
    period: string
}

export const todayHistory: today[] = [
    
    {
        date: 'Sun Oct 10 2021 12:18' ,
        user: 'leandro',
        name: 'Leandro Tecioni Drumond',
        board: 'D781FD8',
        period: '5 horas',
        value: 15.98

    },
    {
        date: 'Sun Oct 10 2021 12:18' ,
        user: 'Floki',
        name: 'Floki',
        board: 'D781FD8',
        period: '2 horas',
        value: 20.98

    },
    {
        date: 'Sun Oct 10 2021 12:18' ,
        user: 'leandro',
        name: 'Leandro Tecioni Drumond',
        board: 'D781FD8',
        period: '5 horas',
        value: 15.98

    }
]

export const service: service[] = [
{
    name: 'Lavagem',
    vacancy: 10,
    period: '5 horas'
}, 
{
    name: 'cera',
    vacancy: 10,
    period: '3 horas'
}, 

]