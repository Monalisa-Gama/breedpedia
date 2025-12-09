interface Hair {
  color: string;
  type: string;
}

interface Address {
  address: string;
  city: string;
  postalCode: string;
  state: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface CompanyAddress {
  address: string;
  city: string;
  postalCode: string;
  state: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
  address: CompanyAddress;
}

interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: 'male' | 'female' | string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: string;
}

type Users = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address
    phone: string;
    website: string;
    company: Company
}

type UsuariosResponse = {
    users: User[];
    page?: number;
    tamanhoPagina?: number;
}