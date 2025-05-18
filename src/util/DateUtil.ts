

function calculateTimePercentage(issuedStr: string, deadlineStr: string) {
  const parseDate = (dateStr: string) => {
    const [datePart, timePart] = dateStr.split(", ");
    const [day, month, year] = datePart.split(".").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute, second);
  };

  const issuedDate = parseDate(issuedStr);
  const deadlineDate = parseDate(deadlineStr);
  const currentDate = new Date();

  const totalDuration = deadlineDate.getTime() - issuedDate.getTime();
  const elapsedTime = currentDate.getTime() - issuedDate.getTime();

  if (totalDuration <= 0) {
    return currentDate >= deadlineDate ? 100 : 0;
  }

  if (elapsedTime <= 0) {
    return 0;
  }

  if (elapsedTime >= totalDuration) {
    return 100;
  }

  const percentage = (elapsedTime / totalDuration) * 100;
  return Math.min(100, Math.max(0, percentage)); // Clamp between 0-100
}


function parseDate(dateString: string) {
    dateString = dateString.replace(/\s+/g, "");
    if (dateString.includes(",")) {
      let [date, time] = dateString.split(",");
      let [day, month, year] = date.split(".");
      return `${year}-${month}-${day}T${parseTime(time)}`;
    } else {
      let [day, month, year] = dateString.split(".");
      return `${year}-${month}-${day}T00:00:00.000Z`;
    }
}

function parseTime(timePart: string) {
    let [hours, minutes, seconds] = timePart.split(":");
    return `${hours ? hours : "00"}:${minutes ? minutes : "00"}:${
        seconds ? seconds : "00"
    }.000Z`;
}

function prepareDate(dateString: string) {
    let resultString = "";
    if (dateString) {
        let [date, time] = dateString.split("T");
        let [year, month, day] = date.split("-");
        let [hour, minute, second] = time.split(":");
        second = second.split(".")[0];
        resultString = `${day}.${month}.${year}, ${hour}:${minute}:${second}`;
    }
    return resultString;
}

export {calculateTimePercentage, parseDate, prepareDate}