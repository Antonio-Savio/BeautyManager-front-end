export function getTime(dateTime: Date){
    const date = new Date(dateTime)

    const time = date.toLocaleTimeString().slice(0, 5);

    return time;
}

export function getDate(dateTime: Date){
    const date = new Date(dateTime)

    const calendar = date.toLocaleDateString();

    const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'short' })

    return `${dayOfWeek} ${calendar}`;
}