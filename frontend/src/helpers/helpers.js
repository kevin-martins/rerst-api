export const capitalize = (string) => {
  return string.substring(0, 1).toUpperCase() + string.substring(1, string.length);
}

export const changeDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }
  const [day, dateTime, month, ...others] = new Date(date).toLocaleDateString('fr-FR', options).split(' ');
  return capitalize(day) + ' ' + dateTime + ' ' + capitalize(month) + ' ' + others.join(' ');
}

export const normaliseData = (data) => {
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string' && !key.includes('password')) {
      data[key] = capitalize(value.trim().toLowerCase());
    }
  }
  return data;
}