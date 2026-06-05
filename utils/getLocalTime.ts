export function getLocalTime(
    timezone:string
){
    const date = new Date();

    return new Intl.DateTimeFormat(
        "en-US",
        {
            hour:"2-digit",
            minute:"2-digit",
            hour12:false,
            timeZone:timezone,
        }
    ).format(date);
}