export interface Scene {
  id: number;
  city: string;
  timezone: string;
  startHour: number;
  endHour: number;
  video: string;
  hotspots: HotspotData[];
  products:ProductData[];
}

export interface HotspotData {
    id:number;
    x:string;
    y:string;
}

export interface ProductData {
    id:number;
    image:string;
    x:string;
    y:string;
}