$(document).ready(function(){
    var showText = function (target, message, index, interval, hiddenTargets) {
        //questo ciclo for nasconde tutti i tag passati alla funzione
        for(var i = 0; i < hiddenTargets.length; i++){
            $(hiddenTargets[i]).hide();
        }

        //se la variabile index è minore di message.length allora c'è la chiamata ricorsiva
        if(index < message.length) {
            //aggiunge all'html del tag target la lettera
            $(target).append(message[index]);

            //aggiornamento del valore di index, visto che si è già chiamata append e che, quindi, il programma ha già stampato il carattere corrispondente
            index++;

            //funzione setTimeout: la funzione setTimeout è nella libreria base di js ed esegue una funzione con un intervallo in
            //millisecondi, rappresentato in questo caso da interval. richiama sé stessa col valore di index aggiornato
            setTimeout(function (){
                showText(target, message, index, interval, hiddenTargets);
            }, interval);
            
            //a prescindere da quale chiamata ricorsiva fa, il programma applica una funzione al click dell'utente al tag salta, che dovrà essere inserito
            //prima di qualunque chiamata a showText: se salta viene premuto (ovvero un pulsante simile [>>]), il programma fa in modo che la chiamata
            //ricorsiva non venga più eseguita: dato che la chiamata ricorsiva viene eseguita solo se index è minore della lunghezza del messaggio,
            //il programma setta manualmente index al massimo, stampa il messaggio intero nell'html del target, nasconde il pulsante salta e mostra i tag
            //nascosti all'inizio del programma
            $("#salta").click(function(){
                //index viene aggiornato alla lunghezza del messaggio: fa in modo che la chiamata ricorsiva termini
                index = message.length;
                //inserisce tutto il messaggio (sovrascrivendo il messaggio già stampato)
                $(target).html(message);
                //nasconde il pulsante salta
                $("#salta").hide();
                //mostra tutti i tag nascosti in precedenza
                for(var i = 0; i < hiddenTargets.length; i++){
                    $(hiddenTargets[i]).show();
                }
            });
        //in questo else c'è il caso in cui l'utente non clicchi sul pulsante salta: in questo caso il pulsante salta viene nascosto
        //a prescindere dal click utente e vengono mostrati tutti i tag nascosti in precedenza
        }else if(index == message.length){
            $("#salta").hide();
            for(var i = 0; i < hiddenTargets.length; i++){
                $(hiddenTargets[i]).show();
            }
        }
    }

    htmlString = "<div style='margin: auto; text-align: center; width:85%; height: 90px;'><p id='testo' style='text-align: center; padding-top:10px;'></p></div>";            
    htmlString += "<button id='menuPrincipale' class='rpgui-button golden' type='button' style='margin-right: 25px;'><p>Menu principale</p></button>";
    htmlString += "<button id='menuScoreboard' class='rpgui-button golden' type='button' style='margin-right: 25px;'><p>Scoreboard</p></button>";
    htmlString += "<button id='salta' class='rpgui-button golden' type='button'><p>>></p></button>";
    $("#boxMessaggi").html(htmlString);
    showText("#testo", "Hai salvato la sorella di Martina! Vai allo scoreboard per vedere il tuo risultato oppure torna al menu principale", 0, 60, ["#menuPrincipale", "#menuScoreboard"]);

    $("#menuPrincipale").click(function(){
        $(window.location).attr("href", "/");
    });

    $("#menuScoreboard").click(function(){
        $(window.location).attr("href", "/scoreboard/");
    });
});