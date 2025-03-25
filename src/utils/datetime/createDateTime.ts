import moment from 'moment-timezone'

export function createDateTime(date: string, time: string): string {
    const dateTimeString = `${date} ${time}`;

    const dateTime = moment.tz(dateTimeString, 'YYYY-MM-DD HH:mm', 'America/Sao_Paulo');

    const isoDate = dateTime.format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    return isoDate;
}