export default function arrivingDatesFormatter() {
  const workingDays = [1, 2, 3, 4, 5];

  function addWorkingDays(startDate, numDaysToAdd) {
    let currentDate = new Date(startDate);
    while (numDaysToAdd > 0) {
      currentDate.setDate(currentDate.getDate() + 1);
      if (workingDays.includes(currentDate.getDay())) {
        numDaysToAdd--;
      }
    }
    return currentDate;
  }

  const date = new Date();
  const firstDate = addWorkingDays(date, 2);
  const secondDate = addWorkingDays(date, 11);

  const options = { weekday: "short", month: "short", day: "numeric" };
  const formattedFirstDate = firstDate.toLocaleString("en-US", options);
  const formattedSecondDate = secondDate.toLocaleString("en-US", options);

  return `Arrives ${formattedFirstDate} - ${formattedSecondDate}`;
}
