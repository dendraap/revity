export const displayFormatDate = (dateTimeString: any) => {
  const date = new Date(dateTimeString)
  const year = date.getUTCFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  const formatDate = `${year}-${month}-${day} ${hour}:${minute}`
  return formatDate
}

export const displayFormatDateString = (dateTime: any) => {
  const date = new Date(dateTime)
  const year = date.getUTCFullYear();
  const monthName = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
  const day = String(date.getDate()).padStart(2, '0')
  const dayName = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  const currentDate = `${dayName}, ${day} ${monthName} ${year} Pukul ${hour}:${minute}`;
  return currentDate
}


export const displayHari = (dateTime: any) => {
  const date = new Date(dateTime)
  const year = date.getUTCFullYear();
  const monthName = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
  const day = String(date.getDate()).padStart(2, '0')
  const dayName = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);

  const currentDate = `${dayName}, ${day} ${monthName} ${year}`;
  return currentDate
}