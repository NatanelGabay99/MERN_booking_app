export type HotelType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adults: number;
    children: number;
    facilities: string[];
    pricePerNight: number;
    rating: number;
    imageUrls: string[];
    lastUpdated: Date;
};