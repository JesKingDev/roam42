// INFO: Provides a quick way to jump between daily notes pages using a calendar
// Datepicker based on: https://flatpickr.js.org/

//Assign shortcut key to this feature to ALT+SHIFT+J
document.addEventListener('keydown', (e)=> {
  if( e.altKey==true  &&  e.keyCode==74 ) {
    e.preventDefault();
    if (event.srcElement.localName == "textarea") {
      KeyboardLib.pressEsc()
      setTimeout( ()=> {
        KeyboardLib.pressEsc()
        jumpToDate()            
      },300 )
    } else {
      jumpToDate()    
    }
  }
})


let flCalendar = []
let jDiv = []
let jInput = []

//Toggles the date picker display
const jumpToDate = () =>	{
  if(jDiv.style.visibility == 'hidden' || jDiv.style.visibility == '') {
    jInput.placeholder = 'Jump to date'
    jDiv.style.visibility = 'visible'
    jInput.style.visibility = 'visible'
    jInput.focus()
    KeyboardLib.pressDownKey()
  } else {
    jDiv.style.visibility = 'hidden'
    jInput.style.visibility = 'hidden'
    flCalendar.close()
  }
}

const jumpToDateFromButton = ()=> {
    KeyboardLib.pressEsc()
    setTimeout( ()=> {
      jumpToDate()            
    },100 )
}

//Initialization for Date picker
const loadJumpToDatePicker = ()=> {
  $(document.body).append(`
  <div id="jumptoDatePicker">
    <input class="jumptoDatePickerInput" id="jumptoDateInput" type="text" placeholder="" style="width:330px;border:0px"></input>
  </div>
  </div>
`.trim() )  
  
  try {
    var jump = document.createElement("div")
      jump.className = 'bp3-button bp3-minimal bp3-small bp3-icon-pivot'
      jump.setAttribute('onClick', 'jumpToDateFromButton()')
      jump.setAttribute('style','position:relative;left:2px')
    var spacer = document.createElement("div")
      spacer.setAttribute('style','flex: 0 0 3px')
    
    document.querySelector('.roam-topbar .flex-h-box').appendChild(spacer)
    document.querySelector('.roam-topbar .flex-h-box').appendChild(jump)
    
  } catch(e) {
    console.log('could not add toolbar buton - see module jump-to-date.js')
    console.log(e)
  }
  
  
  
  flatpickr("#jumptoDateInput", { dateFormat: "Y-m-d", weekNumbers: true })

  flCalendar = document.querySelector("#jumptoDateInput")._flatpickr;
  
  flCalendar.config.onValueUpdate.push( function(selectedDates, dateStr, instance) {
      jDiv.style.visibility = 'hidden'
      jInput.style.visibility = 'hidden'
      let inPut =  document.getElementById('find-or-create-input')
      inPut.focus()
      setEmptyNodeValue(inPut, getRoamDate(dateStr))
      setTimeout(()=>{
        KeyboardLib.pressEnter()
      },250)             
  })
  
  flCalendar.config.onClose.push( function(selectedDates, dateStr, instance) {
    jDiv.style.visibility = 'hidden'
    jInput.style.visibility = 'hidden'
    setTimeout( ()=>{
      flCalendar.clear()
    },500)
  })
  
  jDiv   = document.querySelector('#jumptoDatePicker')
  jInput = document.querySelector('#jumptoDateInput')

}

