export interface Company {
  id: string;
  name: string;
  business_type: string;
  phone?: string;
  email?: string;
  address?: string;
  ai_persona?: string;
  settings: Record<string, any>;
  whatsapp_connected: boolean;
  is_active: boolean;
  plan: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  company_id: string;
  name: string;
  category?: string;
  description?: string;
  price?: number;
  cost?: number;
  attributes: Record<string, any>;
  is_available: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  company_id: string;
  phone: string;
  name?: string;
  email?: string;
  preferences: Record<string, any>;
  tags: string[];
  status: string;
  total_orders: number;
  total_spent: number;
  last_contact?: string;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  customer_id: string;
  company_id: string;
  message: string;
  sender: "ai" | "human" | "customer";
  intent?: string;
  sentiment?: string;
  confidence?: number;
  channel: string;
  metadata: Record<string, any>;
  needs_human: boolean;
  handled_by?: string;
  created_at: string;
}

export interface CompanySettings {
  language: string;
  tone: string;
  auto_reply: boolean;
  human_handoff: boolean;
  working_hours_start: string;
  working_hours_end: string;
}
