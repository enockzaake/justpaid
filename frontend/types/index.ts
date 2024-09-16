export interface SearchProps {
  params?: Record<string, string>;
}

export interface DisplayCardProps {
  provider: ProviderType;
}

export interface ProviderType {
  id: number;
  auth0_id: string;
  company_name: string;
  type: string;
  description: string;
  location: string;
  category: string;
  phone_numbers: string;
  rating: string;
  service_fee: number;
  non_fixed_fee: boolean;
  licence_verified: boolean;
  website: string;
  cover_image: string;
  speciality: string;
  owner: number;
}

export interface PageParams {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export interface BotMessage {
  id: string | number;
  user_type: "user" | "bot";
  content: string;
}
