const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień" ];
const dayNames = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd" ];

$.fn.calendar = function(date) {
    var $calendar = $(this);
    var startDate = date || new Date();
    refreshCalendar($calendar, startDate);
}

function refreshCalendar($calendar, startDate) {
     $.get( "working-sundsays", {
        month: startDate.getMonth() + 1,
        year: startDate.getFullYear()
    } , function( data ) {
        drawCalendar($calendar, startDate, data);
    });
 }

function drawCalendar($calendar, startDate, workingSundays) {

    var today = new Date();
    var month =  startDate.getMonth();
    var year  = startDate.getFullYear();
    var weekDay = startDate.getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var monthStart = new Date(year, month, 1);
    var monthStartDay = monthStart.getDay();

    var html = "<div class='calendar'>";
    html += "<div class='calendar-title row'>"+
    "<button class='arrow arrow-left' ><</button>" +
    "<span>"+ monthNames[month] +" " + year + "</span>" +
    "<button class='arrow arrow-right' >></button>" +
    "</div>";
    html += "<div class ='calendar-days'> "
    for (var i =0;i<7;i++) {
        html += "<span>" + dayNames[i] + "</span>";
    }
    html += "<div></div>";

    var col = 0;

    if (monthStartDay == 0) {
        monthStartDay = 7;
    }
    for (var emptyCols = 0;emptyCols<monthStartDay-1;emptyCols++,col++) {
        html += "<span></span>";
    }

    for (var i =1;i<=daysInMonth;i++,col++) {

        var classes = "";
        var title="";
        var day = new Date(year, month, i);

        if (day.getDay() === 0) {

            if (containsDate(workingSundays, day)) {
                classes += "text-green ";
                title = "Sklepy otwarte!";
            } else {
                classes += "text-red ";
                title = "Sklepy zamknięte!";
            }
        }

        if (i===today.getDate() && startDate.getFullYear()==today.getFullYear() && startDate.getMonth()==today.getMonth() ) {
            classes += "circle ";
        }

        html += "<span class='" + classes + "' data-title='" + title + "'>"+ i +"</span>";
        if (col % 7 == 6) {
            html += "<div></div>";
        }
    }

    if  (col %7 !=0){
        html += "<span></span>";
           for (col; col %7 !=6; col++) {
                html += "<span></span>";
            }
    }

    html +=  "</div>";
    html +=  "</div>";

   $calendar.html(html);

    $('.arrow-left').click( function() {
        refreshCalendar($calendar, new Date(year, startDate.getMonth()-1));
    });

    $('.arrow-right').click( function() {
        refreshCalendar($calendar, new Date(year, startDate.getMonth()+1));
    });
}

function areEqualDates(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate());
}

function containsDate(dates, date) {
    for (var i =0; i< dates.length; i++) {
    var parsedDate = new Date(dates[i]["date"]);
        if (areEqualDates(parsedDate, date)) {
            return true;
        }
    }
    return false;
}

