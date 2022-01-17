$(document).ready(function(){
    //MUSICA PAGINA HOME
    const music = new Audio('musica/home.mp3');
    music.play();
    music.loop = true;
    music.playbackRate = 1;
    music.volume = 0.2;

    var counter = 0;
    
    $("#bottoneMute").click(function(){
        counter++;
        if(counter % 2 != 0){
            $(music).animate({volume: 0}, 3000);
            console.log("VOLUME: FADE OUT");
            $("#imgVolume").attr("src", "img/icone/volume_off.png");
            $("#imgVolume").attr("alt", "Volume OFF");
        }
        else{
            $(music).animate({volume: 0.1}, 3000);
            console.log("VOLUME: FADE IN");
            $("#imgVolume").attr("src", "img/icone/volume_on.png");
            $("#imgVolume").attr("alt", "Volume ON");
        }
    });

    $("#tab1").click(function(){
        $(window.location).attr("href", "/stanze/stanzaSegreta.html");
    });

    //NUOVA PARTITA
    $("#bottoneNuovaPartita").click(function(){
        $.get("http://localhost:8080/vediSession", function(utenteJSON){
            utente = JSON.parse(utenteJSON);
            //SE NON HAI FATTO LOGIN
            if(utente == null)
            {
                $(window.location).attr("href", "/autenticazione/");
            }
            //SE HAI GIÀ GIOCATO MA VUOI INIZIARE UNA NUOVA PARTITA
            else if(utente.idInteragiti != "")
            {
                frase = "<p>Sei sicuro di voler sovrascrivere il tuo salvataggio?</p><br>";
                bottoneSi = "<button id='bottoneSi' class='rpgui-button' type='button'><p>SI</p></button>";
                bottoneNo = "<button id='bottoneNo' class='rpgui-button' type='button'><p>NO</p></button><br><br><br>";
                $("#sceltaNuovaPartita").html(frase + bottoneSi + bottoneNo);
                $("#bottoneCaricaPartita").hide();
                $("#bottoneScoreboard").hide();
                $("#bottoneCrediti").hide();
                $("#sceltaNuovaPartita").show();

                $("#bottoneSi").click(function()
                {
                    utente.stanza = 1;
                    utente.score = 0;
                    utente.listaOggetti = "";
                    utente.idInteragiti = "";

                    $.post("http://localhost:8080/stanze/resetUtente/", {utente: JSON.stringify(utente)}, function(stanzaGiustaJSON){
                        stanzaGiusta = JSON.parse(stanzaGiustaJSON);
                        //IL PUNTO DI DOMANDA OBBLIGA AD ANDARE NEL CONTROLLER!!! METTILO SEMPRE!!!
                        $(window.location).attr("href", stanzaGiusta);
                    });
                });

                $("#bottoneNo").click(function()
                {
                    $("#sceltaNuovaPartita").empty();
                    $("#sceltaNuovaPartita").hide();
                    $("#bottoneCaricaPartita").show();
                    $("#bottoneScoreboard").show();
                    $("#bottoneCrediti").show();
                });
            }
            //SE NON HAI MAI GIOCATO E VUOI COMINCIARE UNA NUOVA PARTITA
            else if(utente.idInteragiti == "")
            {
                $.get("http://localhost:8080/stanze/?", function(stanzaGiustaJSON){
                    stanzaGiusta = JSON.parse(stanzaGiustaJSON);
                    //IL PUNTO DI DOMANDA OBBLIGA AD ANDARE NEL CONTROLLER!!! METTILO SEMPRE!!!
                    $(window.location).attr("href", stanzaGiusta);
                });
            }
        });
    });
    //CARICA PARTITA
    $("#bottoneCaricaPartita").click(function(){
        $.get("http://localhost:8080/vediSession", function(utenteJSON){
            utente = JSON.parse(utenteJSON);
            //SE NON HAI FATTO LOGIN
            if(utente == null)
            {
                $(window.location).attr("href", "/autenticazione/");
            }
            //SE NON HAI MAI GIOCATO MA VUOI CARICARE UNA PARTITA (CHE OVVIAMENTE NON ESISTE)
            else if(utente.idInteragiti == "")
            {
                frase = "<p>Non hai alcun salvataggio. Vuoi iniziare una nuova partita?</p><br>";
                bottoneOk = "<button id='bottoneOk' class='rpgui-button' type='button'><p>SI</p></button>";
                bottoneBack = "<button id='bottoneBack' class='rpgui-button' type='button'><p>NO</p></button><br><br><br>";
                $("#erroreCaricaPartita").html(frase + bottoneOk + bottoneBack);
                $("#bottoneNuovaPartita").hide();
                $("#bottoneScoreboard").hide();
                $("#bottoneCrediti").hide();
                $("#erroreCaricaPartita").show();

                //INIZIA UNA NUOVA PARTITA (SEI QUI SOLO SE HAI CLICKATO SU CARICA PARTITA MA NON HAI MAI GIOCATO!)
                $("#bottoneOk").click(function()
                {
                    $.get("http://localhost:8080/stanze/?", function(stanzaGiustaJSON){
                        stanzaGiusta = JSON.parse(stanzaGiustaJSON);
                        //IL PUNTO DI DOMANDA OBBLIGA AD ANDARE NEL CONTROLLER!!! METTILO SEMPRE!!!
                        $(window.location).attr("href", stanzaGiusta);
                    });
                });

                $("#bottoneBack").click(function()
                {
                    $("#erroreCaricaPartita").empty();
                    $("#erroreCaricaPartita").hide();
                    $("#bottoneNuovaPartita").show();
                    $("#bottoneScoreboard").show();
                    $("#bottoneCrediti").show();
                });
            }
            // SE HAI GIÀ GIOCATO E VUOI CARICARE UNA PARTITA
            else if(utente.idInteragiti != "")
            {
                $.get("http://localhost:8080/stanze/?", function(stanzaGiustaJSON){
                    stanzaGiusta = JSON.parse(stanzaGiustaJSON);
                     //IL PUNTO DI DOMANDA OBBLIGA AD ANDARE NEL CONTROLLER!!! METTILO SEMPRE!!!
                     $(window.location).attr("href", stanzaGiusta);
                });
            }
        });
    });

    $("#bottoneScoreboard").click(function(){
        $(window.location).attr("href", "/scoreboard/");
    });

    $("#bottoneCrediti").click(function(){
        $(window.location).attr("href", "/crediti/");
    });


    $.get("http://localhost:8080/vediSession", function(utenteJSON){
        utente = JSON.parse(utenteJSON);

        if(utente){
            htmlString = "<p>Ciao, " + utente.username + "!</p><br><button id='bottoneLogout' class='rpgui-button' type='button'><p>LOGOUT</p></button><br>";
            $("#linkAutenticazione").html(htmlString);

            $("#bottoneLogout").click(function(){
                $(window.location).attr("href", "/autenticazione/logout");
            });
        }else{
            htmlString = "<button id='bottoneAutenticazione' class='rpgui-button' type='button'><p>AUTENTICAZIONE</p></button><br>";
            $("#linkAutenticazione").html(htmlString);

            $("#bottoneAutenticazione").click(function(){
                $(window.location).attr("href", "/autenticazione/");
            });
        }
    });
});