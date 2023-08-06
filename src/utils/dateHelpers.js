export const formatDateToDDMMYYYY = (date) => {
  const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if single-digit
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero if single-digit
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const convertTimestamp = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000); // Convert UNIX timestamp to milliseconds
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}.${month}.${year}`;
  const formattedHour = `${hour}:${minutes}`;

  return {
    formattedDate,
    formattedHour,
  };
};

export const getNextDaysArray = (numOfDays) => {
  const today = new Date();
  const nextDays = [];

  for (let i = 0; i < numOfDays; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    nextDays.push(formattedDate);
  }

  return nextDays;
};

export const getFormattedDate = () => {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = today.getFullYear();

  return `${day}.${month}.${year}`;
};
