export interface PlaceData {
    id: string;
    name: string;
    displayFlag: boolean;
    orderNo: number;
}
export interface placeApiResponse {
    place: PlaceData[];
}
