export function getRockets() {
  return fetch('https://api.spacexdata.com/v4/rockets')
    .then(res => res.json())
    .then(res => res);
}

export function getMissions() {
  return fetch('https://api.spacexdata.com/v3/missions')
    .then(res => res.json())
    .then(res => res);
}

export function getHistories() {
  return fetch('https://api.spacexdata.com/v4/history')
    .then(res => res.json())
    .then(res => res);
}




// const getData = url => () => fetch(url)
//     .then(res => res.json())
//     .then(res => res);
//
// const getHistories = getData('https://api.spacexdata.com/v4/history')
// const getMissions = getData('https://api.spacexdata.com/v3/missions')
// const getRockets = getData('https://api.spacexdata.com/v4/rockets')
