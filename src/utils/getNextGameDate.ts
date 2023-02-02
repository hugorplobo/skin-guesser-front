export default function getNextGameDate() {
    const date = new Date();
    date.setMinutes(0);
    date.setSeconds(0);
    date.setHours(24);

    return date;
}