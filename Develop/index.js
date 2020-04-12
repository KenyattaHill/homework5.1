//TODO

// colorCode logic
// save button click handler
// save to localStorage
// load from localStorage

const currentDayElement = $('#currentDay');
const currentDay = moment().format('dddd, MMM Do');
currentDayElement.text(currentDay);
const container = $('.container');


function checkLocalStorage(key) {
  return localStorage.getItem(key) ? true : false;
}

if (!localStorage.getItem(currentDay)) {
  localStorage.setItem(currentDay, JSON.stringify({}));
}

function buildTemplate(data) {
  return `
  <div class="time-block row ${data.colorCode}">
    <span class="hour">${data.time}</span>
    <textarea id="timeBlock-${data.id}" class="description">${data.event}</textarea>
    <button onclick="saveEvent('${data.id}')" class="saveBtn"><i class="fas fa-lock"></i></button>
  </div>

`;
}

function saveEvent(id) {

  const eventsForDay = JSON.parse(localStorage.getItem(currentDay))
  console.log('Events: ', eventsForDay)
  
  const eventText = $(`#timeBlock-${id}`).val();
  eventsForDay[id] = eventText;

  localStorage.setItem(currentDay, JSON.stringify(eventsForDay))
}

const eightAM = moment().hour(8).minutes(0).seconds(0);
const eventData = JSON.parse(localStorage.getItem(currentDay));
const dataArray = [];
for (let i = 0; i <= 8; i++){

  let colorCode;
  const now = moment()
  const timeBlock = eightAM.add(1, 'hour')
  const duration = moment.duration(now.diff(timeBlock));

  const difference = Math.floor(duration.as('hours'))

  if (difference > 0) {
    colorCode = 'past'
  }
  else if(difference < 0) {
    colorCode = 'future'
  } else {
    colorCode = 'present'
  }
  console.log(difference)
// currentTime
// timeBlockTime
// compare the two
  const obj = {
    time: timeBlock.format('hA'),
    event: eventData[i] || '',
    id: i,
    colorCode,
  };
  dataArray.push(obj);
}
const htmlArray = [];
for (let i = 0; i < dataArray.length; i++){
  const item = dataArray[i];
  
  const template = buildTemplate(item);
  
  htmlArray.push(template);
}

container.html(htmlArray.join(''))
//console.log(dataArray);