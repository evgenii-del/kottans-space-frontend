const getData = url => () =>
  fetch(url)
    .then(res => res.json())
    .then(res => res);

export const getHistories = getData('https://api.spacexdata.com/v4/history');
export const getMissions = getData('https://api.spacexdata.com/v3/missions');
export const getRockets = getData('https://api.spacexdata.com/v4/rockets');
