const calendar = document.getElementById("calendar");

const calendarInner = document.createElement("article");
calendarInner.id = "calendar-inner";
calendar.append(calendarInner);

const calendarTop = document.createElement("section");
calendarTop.id = "calendar-top";
calendarInner.append(calendarTop);

const calendarArrowPrev = document.createElement("div");
calendarArrowPrev.id = "calendar-prev";
calendarArrowPrev.textContent = "<";
calendarTop.append(calendarArrowPrev);

const newDate = new Date();
const year = newDate.getFullYear();
const month = newDate.getMonth() + 1;
const date = newDate.getDate();

const firstDateWeek = new Date(year, month - 1, 1).getDay();
const oneMonthDate = new Date(year, month, 0).getDate();

const calendarYear = document.createElement("div");
calendarYear.id = "calendar-year";
calendarYear.innerHTML = "<span id='year'>"+ year + "</span> 年";
calendarTop.append(calendarYear);

const calendarMonth = document.createElement("div");
calendarMonth.id = "calendar-month";
calendarMonth.innerHTML = "<span id='month'>"+ month + "</span> 月";
calendarTop.append(calendarMonth);

const calendarArrowNext = document.createElement("div");
calendarArrowNext.id = "calendar-next";
calendarArrowNext.textContent = ">";
calendarTop.append(calendarArrowNext);

const week = ["日", "月", "火", "水", "木", "金", "土"];

const calendarTable = document.createElement("section");
calendarTable.id = "calendar-table";
calendarInner.append(calendarTable);

const calendarWeekRow = document.createElement("div");
calendarWeekRow.classList = "calendar-week-row";
calendarTable.append(calendarWeekRow);

for (i = 0; i < 7; i++) {
  const calendarWeek = document.createElement("div");
  calendarWeek.classList = "calendar-week";
  calendarWeek.textContent = week[i];
  calendarWeekRow.append(calendarWeek);
}

let isStartDate = false;
let day = 1;

for (i = 0; i < 6; i++) {
  const calendarDateRow = document.createElement("div");
  calendarDateRow.classList = "calendar-date-row";
  calendarTable.append(calendarDateRow);
  for (j = 0; j < 7; j++) {
    const calendarDate = document.createElement("div");
    calendarDate.textContent = "";
    calendarDate.classList = "calendar-date";
    if (i == 0 && j == firstDateWeek) {
      calendarDate.textContent = day;
      isStartDate = true;
    }
    if (isStartDate && day == date) {
        calendarDate.id = "now";
    }
    if ( isStartDate && day <= oneMonthDate && (i !== 0 || j !== firstDateWeek) ) {
      calendarDate.textContent = day;
    }
    if (isStartDate) {
        day++;
    }
    calendarDateRow.append(calendarDate);
  }
}

const calendarArrowPrevContents = document.getElementById("calendar-prev");
const calendarArrowNextContents = document.getElementById("calendar-next");
const calendarDateContents = document.getElementsByClassName("calendar-date");

calendarArrowPrevContents.addEventListener("click", () => {
    const currentYear = document.getElementById("year");
    const currentMonth = document.getElementById("month");
    let prevYear = Number(currentYear.textContent);
    let prevMonth = Number(currentMonth.textContent) - 1;
    if(prevYear < 1) {
        prevYear = newDate.getFullYear();
    }
    if(prevMonth < 0 || prevMonth > 12) {
        prevMonth = newDate.getMonth() + 1;
    }
    if (prevMonth == 0) {
        prevYear = prevYear - 1;
        prevMonth = 12;
    }

    currentYear.innerText = prevYear;
    currentMonth.innerText = prevMonth;

    const prevFirstDateWeek = new Date(prevYear, prevMonth - 1, 1).getDay();
    const prevOneMonthDate = new Date(prevYear, prevMonth, 0).getDate();
    let isPrevStartDate = false;
    let day = 1;
    for (i = 0; i < 42; i++) {
        calendarDateContents[i].innerText = "";
        calendarDateContents[i].id = "";
      if(prevYear == year && prevMonth == month && i - prevFirstDateWeek + 1 == date) {
        calendarDateContents[i].id = "now";
      }
      if (i == prevFirstDateWeek) {
        calendarDateContents[i].innerText = day;
        isPrevStartDate = true;
      }
      if ( isPrevStartDate && day <= prevOneMonthDate && (i !== prevFirstDateWeek) ) {
        calendarDateContents[i].innerText = day;
      }
      if(isPrevStartDate) {
        day++;
      }
    }
});

calendarArrowNextContents.addEventListener("click", () => {
    const currentYear = document.getElementById("year");
    const currentMonth = document.getElementById("month");
    let nextYear = Number(currentYear.textContent);
    let nextMonth = Number(currentMonth.textContent) + 1;
    if(nextYear < 1) {
        nextYear = newDate.getFullYear();
    }
    if(nextMonth < 1 || nextMonth > 13) {
        nextMonth = newDate.getMonth() + 1;
    }
    if (nextMonth == 13) {
        nextYear = nextYear + 1;
        nextMonth = 1;
    }

    currentYear.innerText = nextYear;
    currentMonth.innerText = nextMonth;

    const nextFirstDateWeek = new Date(nextYear, nextMonth - 1, 1).getDay();
    const nextOneMonthDate = new Date(nextYear, nextMonth, 0).getDate();
    let isNextStartDate = false;
    let day = 1;
    for (i = 0; i < 42; i++) {
        calendarDateContents[i].innerText = "";
        calendarDateContents[i].id = "";
      if(nextYear == year && nextMonth == month && i - nextFirstDateWeek + 1 == date) {
        calendarDateContents[i].id = "now";
      }
      if (i == nextFirstDateWeek) {
        calendarDateContents[i].innerText = day;
        isNextStartDate = true;
      }
      if ( isNextStartDate && day <= nextOneMonthDate && (i !== nextFirstDateWeek) ) {
        calendarDateContents[i].innerText = day;
      }
      if(isNextStartDate) {
        day++;
      }
    }
});
