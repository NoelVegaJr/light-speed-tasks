export function sum(num1: number, num2: number) {
 return num1 + num2;
}

export default function dateFormatter(epoch1: number, epoch2: number = new Date().getTime() ) {

  const secondsAgo = Math.floor((epoch2 - epoch1) / 1000);

  if(secondsAgo < 11 ) {
    return 'Just now'
  }

  if(secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  }

  const minutesAgo = Math.floor(secondsAgo / 60);
  if(minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  }

  const hoursAgo = Math.floor(minutesAgo / 60);
  if(hoursAgo < 24) {
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  }
  
  const daysAgo = Math.floor(hoursAgo / 24);
  return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
}
