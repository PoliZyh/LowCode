
// * 获取当前年月日时分
export const getCurDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    let month: number | string = date.getMonth() + 1;
    let day: number | string = date.getDate();
    let hour: number | string = date.getHours();
    let minute: number | string = date.getMinutes();

    month < 10 ? month = `0${month}` : month;
    day < 10 ? day = `0${day}` : day;
    hour < 10 ? hour = `0${hour}` : hour;
    minute < 10 ? minute = `0${minute}` : minute;

    return `${year}年${month}月${day}日 ${hour}:${minute}`
}