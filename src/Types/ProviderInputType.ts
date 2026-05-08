export type ProviderInput = {
  businessName: string;
  description?: string;
  logo: string;
  address: string;
  slug: string;
  city: string;
  deliveryFee: number;
  openingTime: string;
  closingTime: string;
  coverImage?: string;
};

export type ProviderParams = {
    id : string;
}