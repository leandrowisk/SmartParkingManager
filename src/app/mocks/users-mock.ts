import { User } from "../interfaces/User";

export const users: User[] = [
    { 
      'id': 17,
      'name': 'Leandro Tecioni',
      'email': 'leandrotdrumond@gmail.com',
      'cpf': '506.785.188-07',
      'phone': '(11)968822810',
      'address': 'Rua são jorge 34',
      'sex': 'masculino',
      'birthday': '13/05/1999',
      'car': {
          'brand': 'ford',
          'model': 'mustang',
          'color': 'azul',
          'renavam': 13455543,
          'chassi': 'dkdjfjdkafja',
          'plaque': '45678fed8'
      }
    },

    { 
        'id': 15,
        'name':  'Lucas Fabiano',
        'email': 'lucas_fabiano@gmail.com',
        'cpf': '500.155.158-07',
        'phone': '(11)6875-4421',
        'address': 'Jardins',
        'sex': 'masculino',
        'birthday': '20/06/1998',
        'car': {
            'brand': 'renault',
            'model': 'sandero',
            'color': 'vermelho',
            'renavam': 7777777777777,
            'chassi': '666666665488787',
            'plaque': '44654f8asfafa'
        }
      },

      { 
        'id': 13,
        'name': 'Tiago Torres',
        'email': 'tiago_torres@gmail.com',
        'cpf': '452.785.999-07',
        'phone': '(11)6354-7878',
        'address': 'Rua São Paulo 98',
        'sex': 'masculino',
        'birthday': '06/01/1998',
        'car': {
            'brand': 'wolksvagem',
            'model': 'golf',
            'color': 'preto',
            'renavam': 13455543,
            'chassi': '789384747383',
            'plaque': '666ddfsdfa'
        }
      }
]