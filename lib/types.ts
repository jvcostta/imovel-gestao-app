// Tipos para comunicação com a API do backend

export interface Property {
  id: number;
  address: string;
  property_type: string;
  area?: number;
  rooms?: number;
  bathrooms?: number;
  description?: string;
  monthly_rent: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyCreate {
  address: string;
  property_type: string;
  area?: number;
  rooms?: number;
  bathrooms?: number;
  description?: string;
  monthly_rent: number;
  status?: string;
}

export interface Tenant {
  id: number;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  birth_date?: string;
  occupation?: string;
  monthly_income?: number;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  created_at: string;
  updated_at: string;
}

export interface TenantCreate {
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  birth_date?: string;
  occupation?: string;
  monthly_income?: number;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}

export interface Contract {
  id: number;
  property_id: number;
  tenant_id: number;
  start_date: string;
  end_date: string;
  monthly_rent: number;
  deposit_amount?: number;
  status: string;
  terms?: string;
  created_at: string;
  updated_at: string;
}

export interface ContractCreate {
  property_id: number;
  tenant_id: number;
  start_date: string;
  end_date: string;
  monthly_rent: number;
  deposit_amount?: number;
  status?: string;
  terms?: string;
}

export interface Payment {
  id: number;
  contract_id: number;
  amount: number;
  due_date: string;
  payment_date?: string;
  payment_method?: string;
  status: string;
  reference_month?: string;
  late_fee?: number;
  discount?: number;
  observations?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentCreate {
  contract_id: number;
  amount: number;
  due_date: string;
  payment_date?: string;
  payment_method?: string;
  status?: string;
  reference_month?: string;
  late_fee?: number;
  discount?: number;
  observations?: string;
}

export interface Maintenance {
  id: number;
  property_id: number;
  title: string;
  description?: string;
  category?: string;
  priority: string;
  status: string;
  cost?: number;
  contractor_name?: string;
  contractor_contact?: string;
  scheduled_date?: string;
  completion_date?: string;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceCreate {
  property_id: number;
  title: string;
  description?: string;
  category?: string;
  priority?: string;
  status?: string;
  cost?: number;
  contractor_name?: string;
  contractor_contact?: string;
  scheduled_date?: string;
  completion_date?: string;
}

export interface ApiError {
  detail: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}