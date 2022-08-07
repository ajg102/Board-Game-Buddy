export const sortByTime = (order, data, timeKey) => {
  if (order === "asc") {
    return data.sort((a, b) => {
      if (a[timeKey] > b[timeKey]) return 1;
      else if (a[timeKey] < b[timeKey]) return -1;
      else return 0;
    });
  } else if (order === "desc") {
    return data.sort((a, b) => {
      if (a[timeKey] > b[timeKey]) return -1;
      else if (a[timeKey] < b[timeKey]) return 1;
      else return 0;
    });
  }
};
