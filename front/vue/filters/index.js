export function formateDate(date) {
    date = new Date(date).toISOString();
    return date.replace(/(\d{4})-(\d{2})-(\d{2}).*/, '$1.$2.$3');
}