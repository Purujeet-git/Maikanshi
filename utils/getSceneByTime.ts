export function getSceneByTime(
    hour:number
) {
    if(hour >= 5 && hour < 12){
        return "/videos/morning.mp4";
    }

    if(hour >=12 && hour < 18){
        return "/videos/afternoon.mp4";
    }

    return "/videos/evening.mp4"
}