export function getTime(dateTime: Date | string){
    const date = new Date(dateTime)

    const time = date.toLocaleTimeString("pt-BR", {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit'
    })

    return time;
}

export function getDate(dateTime: Date | string){
    const date = new Date(dateTime)

    const dayAndDate = date.toLocaleDateString('pt-BR', { 
        weekday: 'short',
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    })

    return dayAndDate;
}