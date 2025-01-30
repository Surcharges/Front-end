export interface Surcharge {
  id: string;
  image: string;
  placeInformation?: string; // Optional as it's not always set
  rate: number;
  reportedDate: number; // Assuming this is a timestamp in milliseconds
  totalAmount: number;
  surchargeAmount: number;
  surchargeStatus: string;
  displayName: string;
  addressComponents: string;
}