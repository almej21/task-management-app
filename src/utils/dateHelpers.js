export const formatDateToDDMMYYYY = (date) => {
  const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if single-digit
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero if single-digit
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
