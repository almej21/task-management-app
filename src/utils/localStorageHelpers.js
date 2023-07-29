// Function to write data to local storage
export const writeToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error writing to local storage:", error);
  }
};

// Function to get data from local storage by key
export const readFromLocalStorage = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error reading from local storage:", error);
    return null;
  }
};
