import moment from 'moment-timezone'

export function createDateTime(date: string, time: string): string {
    const dateTimeString = `${date} ${time}`;

    const dateTime = moment.tz(dateTimeString, 'America/Sao_Paulo');

    return dateTime.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
}