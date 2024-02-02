
export default function date() {
    const dateObj:Date = new Date();
    const stringFormat:string = dateObj.toDateString();
    const hours:number = dateObj.getHours();
    const minutes:number = dateObj.getMinutes();
    const seconds:number = dateObj.getSeconds();
    return `${stringFormat} ${hours}:${minutes}:${seconds}`;
}