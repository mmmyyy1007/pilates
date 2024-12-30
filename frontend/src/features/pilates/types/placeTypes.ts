export interface PlaceData {
    id: string;
    name: string;
    displayFlag: boolean;
    orderNo: number;
}

export type ActivePlaceData = Pick<PlaceData, "id" | "name">;

export interface ActivePlaceApiResponse {
    place: ActivePlaceData[];
}

export interface placeApiResponse {
    place: PlaceData[];
}
