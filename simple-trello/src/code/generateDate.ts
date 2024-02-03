
export default function date() {
    const dateObj:Date = new Date();
    const locale:string = dateObj.toLocaleString();
    return locale;
}