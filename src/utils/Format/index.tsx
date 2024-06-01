const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 2,
});

export const formatNumber =(number: number)=>{
    return formatter.format(number)
}