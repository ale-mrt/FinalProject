$(document).ready(function()
{
    var counter = 0;
    var scoreboard = [];

    function caricaScoreboard()
    {
        $.get("http://localhost:8080/scoreboard/json", function(data)
        {
            scoreboard = JSON.parse(data);
            stampaScoreboard();
        });
    }
    caricaScoreboard();

    function stampaScoreboard()
    {
        var ris = "";
        
        ris += "<table style='width:100%'; position:relative;><thead>";
        ris += "<img src='../img/scoreboard/sfondo.png' style='position:relative; width:100%; height:10%; margin-bottom:2%'>";

//        ris += "<tr style='color:white; width:100%'; position:relative;>";
//        ris += "<th style='width:4%; position:relative'></th>"
//        ris += "<th style='width:32%; position:relative'> <h1 style='text-shadow: 10px 10px 18px black; font-size: 25px; text-align:center; position:relative'> GIOCATORE </h1></th>";
//        ris += "<th style='width:32%; position:relative'> <h1 style='text-shadow: 10px 10px 18px black; font-size: 25px; text-align:center; position:relative'> SCORE </h1></th>";
//        ris += "<th style='width:32%; position:relative'> <h1 style='text-shadow: 10px 10px 18px black; font-size: 25px; text-align:center; position:relative'> DATA </h1></th>";
//        ris += "</tr>";
        ris += "</thead>"
        	
        ris += "</table>";
        ris += "<div id='background-select-rpgui-list' class=' rpgui-list-imp' style=' width:99%; height: 85%;'>";
        ris += "<table style='width:100%'><thead>";
        ris += "<tr style='width:100%'> <th style='width:4%'></th> <th style='width:32%'> </th> <th style='width:32%; height: 88%'> </th> <th style='width:32%'> </th> </tr> </thead>"
        ris += "<tbody >";
        
        for(var s in scoreboard)
        {
        	ris += "<tr style='color:white;'>";
          s
            ris += "<td display='width:4%; padding-top:2%'><input class='rpgui-checkbox golden' type='checkbox' checked='' data-rpguitype='checkbox'><label></td>";
            ris += "<td style='width:32%; padding-top:2%; text-align:center; font-size: 120%; text-shadow: -1px 1px 0 #000, 1px 1px 0 #000,1px -1px 0 #000, -1px -1px 0 #000;'>"  +   scoreboard[s].giocatore     +   "</td>";
            ris += "<td style='width:32%; padding-top:2%; text-align:center; font-size: 120%; text-shadow: -1px 1px 0 #000, 1px 1px 0 #000,1px -1px 0 #000, -1px -1px 0 #000;'>"   +   scoreboard[s].score         +   "</td>";
            ris += "<td style='width:32%; padding-top:2%; text-align:center; font-size: 120%; text-shadow: -1px 1px 0 #000, 1px 1px 0 #000,1px -1px 0 #000, -1px -1px 0 #000;'>"   +   scoreboard[s].data          +   "</td>";
            ris += "</label></tr>";
            ris += "<tr  style='color:yellow'>";
         	ris += "<td style='width:4%; padding-top:2%; text-align:center'>" + "</td>"
             ris += "<td style='width:32%; padding-top:2%; text-align:center'> "  +   "-"     +   "</td>";
             ris += "<td style='width:32%; padding-top:2%; text-align:center'>"   +   "-"     +   "</td>";
             ris += "<td style='width:32%; padding-top:2%; text-align:center'>"   +   "-"     +   "</td>";
             ris += "</tr>";
        }
       
        ris += "</tbody>";
        ris += "</div>";
        ris += "</table>";
       
       
        $("#scoreboard").html(ris);
    }
});