let Component, Target;

const selectRocket = rocket => {
  window.dataStore.selectedRocket = rocket;
  renderApp();
};

const selectMission = mission => {
  window.dataStore.selectedMission = mission;
  renderApp();
};

export default function renderApp(componentFunction, targetElementId) {
  if (componentFunction) Component = componentFunction;
  if (targetElementId) Target = targetElementId;

  document.getElementById(Target).innerHTML = `${Component()}`;

  const rocketRadios = document.querySelectorAll('.rocket-radio');
  const missionRadios = document.querySelectorAll('.mission-radio');

  rocketRadios.forEach(radio =>
    radio.addEventListener('change', ({ target }) => selectRocket(target.value)),
  );
  missionRadios.forEach(radio =>
    radio.addEventListener('change', ({ target }) => selectMission(target.value)),
  );
}
