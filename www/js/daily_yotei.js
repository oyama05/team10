// This is a JavaScript file

var DailyYotei = function(model, options, date){
    // Default Values
    this.Options = {
      Color: '',
      LinkColor: '',
      NavShow: true,
      NavVertical: false,
      NavLocation: '',
      DateTimeShow: true,
      DateTimeFormat: 'mmm, yyyy',
      DatetimeLocation: '',
      EventClick: '',
      EventTargetWholeDay: false,
      DisabledDays: [],
      ModelChange: model
    };
   
    // Overwriting default values
    for(var key in options){
      this.Options[key] = typeof options[key]=='string'?options[key].toLowerCase():options[key];
    }
   
    model?this.Model=model:this.Model={};
    this.Today = new Date();
   
    this.Selected = this.Today
    this.Today.Month = this.Today.getMonth();
    this.Today.Year = this.Today.getFullYear();
    if(date){this.Selected = date}
    this.Selected.Month = this.Selected.getMonth();
    this.Selected.Year = this.Selected.getFullYear();
   
    this.Selected.Days = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDate();
    this.Selected.FirstDay = new Date(this.Selected.Year, (this.Selected.Month), 1).getDay();
    this.Selected.LastDay = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDay();
   
    this.Prev = new Date(this.Selected.Year, (this.Selected.Month - 1), 1);
    if(this.Selected.Month==0){this.Prev = new Date(this.Selected.Year-1, 11, 1);}
    this.Prev.Days = new Date(this.Prev.getFullYear(), (this.Prev.getMonth() + 1), 0).getDate();
}
   
function createDailyYotei(calendar, element, adjuster){
    if(typeof adjuster !== 'undefined'){
      var newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1);
      calendar = new Calendar(calendar.Model, calendar.Options, newDate);
      element.innerHTML = '';
    }else{
      for(var key in calendar.Options){
        typeof calendar.Options[key] != 'function' && typeof calendar.Options[key] != 'object' && calendar.Options[key]?element.className += " " + key + "-" + calendar.Options[key]:0;
      }
    }
    var months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
   
    var mainSection = document.createElement('table');
    mainSection.className += "daily_main";
   
    function AddDays(){
      // Create Number Element
      function DayNumber(n){
        var number = document.createElement('td');
        number.className += "daily_number";
        number.innerHTML += n + "日";
        return number;
      }
      var days = document.createElement('tbody');
      days.className += "daily_days";
   
      // Current Month's Days
      for(var i = 0; i < calendar.Selected.Days; i++){
        var day = document.createElement('tr');
        day.className += "daily_cld";
        //Disabled Days
        var d = (i + calendar.Selected.FirstDay)%7;
        //console.log(i);
        for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
          if(d==calendar.Options.DisabledDays[q]){
            //day.className += " disableDay";
          }
        }
        var number = DayNumber(i+1);
        
        // 日曜日か確認
        var weekMod = ((i+1) + calendar.Selected.FirstDay) % 7;
        if (weekMod == 1) {
          number.className += " sunday";
        }
        // 土曜日か確認
        else if (weekMod == 0) {
          number.className += " saturday";
        }

        var caption = document.createElement("td");
        // Check Date against Event Dates
        for(var n = 0; n < calendar.Model.length; n++){
          var evDate = calendar.Model[n].Date;
          var toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i+1));
          if(evDate.getTime() == toDate.getTime()){
            caption.className += "daily_caption";
            if (caption.innerHTML.length != 0) {
              caption.innerHTML += '<br>';
            }
            caption.innerHTML += "<a href='http://www.yahoo.co.jp'>" + calendar.Model[n].Title + "　@" + calendar.Model[n].Location + "　" + calendar.Model[n].Time + "</a>";
          }
        }
        day.appendChild(number);
        day.appendChild(caption);
   
        // If Today..
        if((i+1) == calendar.Today.getDate() && calendar.Selected.Month == calendar.Today.Month && calendar.Selected.Year == calendar.Today.Year){
          day.className += " today";
        }
        days.appendChild(day);
      }
      mainSection.appendChild(days);
    }
   
    AddDays();
    element.appendChild(mainSection);
};
   
function daily_yotei(el, data, settings){
    var obj = new DailyYotei(data, settings);
    createDailyYotei(obj, el);
}