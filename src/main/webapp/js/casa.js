//quando è pronto il documento
$(document).ready(function(){
    //MUSICA PAGINA CASA
    const music = new Audio('../musica/casa.mp3');
    music.play();
    music.loop = true;
    music.playbackRate = 1;
    music.volume = 0.2;
    // richiesta ajax mi aspetto che i torni un (attributo) oggetto utente in formato String json
    $.get("http://localhost:8080/vediSession/", function(utenteJSON){
        utente = JSON.parse(utenteJSON);

        //quando è pronto il documento voglio restituire la stanza giusta al mio click
        $("#stanza1").click(function(){

            utente.stanza = 1;
            console.log("sonon nella stanza 1");

            $.post("http://localhost:8080/stanze/aggiornaStanza/", {utente: JSON.stringify(utente)}, function(stanzaGiustaJSON){
                stanzaGiusta = JSON.parse(stanzaGiustaJSON);
                //in quale pagina devi stare
                $(window.location).attr("href", stanzaGiusta);
            });
        });

        $("#stanza2").click(function(){

            utente.stanza = 2;
            console.log("sonon nella stanza 2");

            $.post("http://localhost:8080/stanze/aggiornaStanza/", {utente: JSON.stringify(utente)}, function(stanzaGiustaJSON){
                stanzaGiusta = JSON.parse(stanzaGiustaJSON);
                //in quale pagina devi stare
                $(window.location).attr("href", stanzaGiusta);
            });
        });

        $("#stanza3").click(function(){

            utente.stanza = 3;
            console.log("sonon nella stanza 3");

            $.post("http://localhost:8080/stanze/aggiornaStanza/", {utente: JSON.stringify(utente)}, function(stanzaGiustaJSON){
                stanzaGiusta = JSON.parse(stanzaGiustaJSON);
                //in quale pagina devi stare
                $(window.location).attr("href", stanzaGiusta);
            });
        });

        $("#stanza4").click(function(){

            utente.stanza = 4;
            console.log("sonon nella stanza 4");

            $.post("http://localhost:8080/stanze/aggiornaStanza/", {utente: JSON.stringify(utente)}, function(stanzaGiustaJSON){
                stanzaGiusta = JSON.parse(stanzaGiustaJSON);
                //in quale pagina devi stare
                $(window.location).attr("href", stanzaGiusta);
            });
        });

        $("#stanza5").click(function(){

            utente.stanza = 5;
            console.log("sonon nella stanza 5");

            $.post("http://localhost:8080/stanze/aggiornaStanza/", {utente: JSON.stringify(utente)}, function(stanzaGiustaJSON){
                stanzaGiusta = JSON.parse(stanzaGiustaJSON);
                //in quale pagina devi stare
                $(window.location).attr("href", stanzaGiusta);
            });
        });

        $("#stanza6").click(function(){

            utente.stanza = 6;
            console.log("sonon nella stanza 6");

            $.post("http://localhost:8080/stanze/aggiornaStanza/", {utente: JSON.stringify(utente)}, function(stanzaGiustaJSON){
                stanzaGiusta = JSON.parse(stanzaGiustaJSON);
                //in quale pagina devi stare
                $(window.location).attr("href", stanzaGiusta);
            });
        });

        $("#stanza7").click(function(){

            utente.stanza = 7;
            console.log("sonon nella stanza 7");

            $.post("http://localhost:8080/stanze/aggiornaStanza/", {utente: JSON.stringify(utente)}, function(stanzaGiustaJSON){
                stanzaGiusta = JSON.parse(stanzaGiustaJSON);
                //in quale pagina devi stare
                $(window.location).attr("href", stanzaGiusta);
            });
        });
    });
});