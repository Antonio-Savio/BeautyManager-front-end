export function compareDate(dateString: Date): string {
    const inputDate = new Date(dateString);
    const today = new Date();
    
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    
    const diffTime = inputDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    if (diffDays === 0){
        return "hoje"
    } else if (diffDays === 1){
        return "amanhã";
    } if (diffDays < 0){
        return "datas passadas";
    } else {
        return "datas futuras"
    }
}