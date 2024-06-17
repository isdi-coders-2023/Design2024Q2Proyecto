export type User = {
  id?: number;
  email: string;
  name: string;
  surnames: string;
  birthDate: string;
  referal?: number;
  tier: 'premium' | 'regular';
  discount: number | null;
};
