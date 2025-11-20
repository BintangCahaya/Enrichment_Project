export interface Tenant {
  id: number;
  name: string;
  gender: string;
  phone: string;
  email: string;
  contract_start: string;
  contract_end: string;
  room?: string;
  status: string;
}