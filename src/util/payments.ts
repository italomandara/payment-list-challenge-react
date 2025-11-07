export function formatDate(dateISOString: string) {
  /**
   * It return a formatted date in the following format: dd/mm/yyyy, HH:MM:SS
   */
  const date = new Date(dateISOString);
  return date.toLocaleString("en-GB"); //This could vary from browser to browser if the format needs to be strictly consistend then it's better manually formatting unsing a library
}

export function formatAmount(number: number) {
  /**
   * It returns a formatted number with 2 fixed decimals (e.g: 200 -> 200.00 or 150.1 -> 150.10 or 151.1234 -> 151.12)
   * Assuming from what i see from the table that we want to just truncate the numbers and the numbers from the api will always have no more than 2 decimals
   */
  return number.toFixed(2);
}

export function objToQueryString(obj: Record<string, any>) {
  return new URLSearchParams(obj).toString();
}
