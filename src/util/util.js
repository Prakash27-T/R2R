function formatDate(dateStr) {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  // Check for default date 1900-01-01
  if (
    date.getFullYear() === 1900 &&
    date.getMonth() === 0 &&
    date.getDate() === 1
  ) {
    return "-";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export { formatDate };