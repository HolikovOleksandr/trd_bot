import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { User } from 'src/modules/user/entities/user.entity';

export const mockUser: User = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '+1234567890',
};

export const mockUserDto: CreateUserDto = {
  firstName: 'Robert',
  lastName: 'Polson',
  phoneNumber: '+1234567890',
};

export const mockFewUsers: User[] = [
  {
    id: '1',
    firstName: 'Freddie',
    lastName: 'Mercury',
    phoneNumber: '+1111111111',
  },
  {
    id: '2',
    firstName: 'John',
    lastName: 'Lennon',
    phoneNumber: '+2222222222',
  },
  {
    id: '3',
    firstName: 'Paul',
    lastName: 'McCartney',
    phoneNumber: '+3333333333',
  },
  {
    id: '4',
    firstName: 'Jimi',
    lastName: 'Hendrix',
    phoneNumber: '+4444444444',
  },
  {
    id: '5',
    firstName: 'Elvis',
    lastName: 'Presley',
    phoneNumber: '+5555555555',
  },
  {
    id: '6',
    firstName: 'Michael',
    lastName: 'Jackson',
    phoneNumber: '+6666666666',
  },
  {
    id: '7',
    firstName: 'David',
    lastName: 'Bowie',
    phoneNumber: '+7777777777',
  },
  {
    id: '8',
    firstName: 'Bob',
    lastName: 'Dylan',
    phoneNumber: '+8888888888',
  },
  {
    id: '9',
    firstName: 'Kurt',
    lastName: 'Cobain',
    phoneNumber: '+1111111110',
  },
  {
    id: '10',
    firstName: 'Janis',
    lastName: 'Joplin',
    phoneNumber: '+1212121212',
  },
];
