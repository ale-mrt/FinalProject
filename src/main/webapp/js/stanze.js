$(document).ready(function(){
    /*
        SHOWTEXT: questa funzione è un bordello ma funziona, e serve per far vedere il testo piano piano e per gestire lo skip se è troppo lungo.
        Come funziona? Prende in input il terget del tag html sul quale scrivere, il testo da scrivere, l'indice della stringa dal quale
        iniziare a scrivere e un array di target jquery da cancellare.
        In pratica questa funzione scrive su un tag e, nel contempo, nasconde gli elementi in hiddenTargets mostrando un solo pulsante,
        quello dello skip: un giocatore dovrebbe poter skippare i dialoghi lunghi, e questa funzione glielo permette.
        Funzionalmente questa è una funzione ricorsiva, ovvero esegue sé stessa nel suo corpo. Una funzione ricorsiva è, ad esempio, la
        sequenza di Fibonacci: prende 1 e aggiunge 1, poi somma gli ultimi due numeri e questo è l'elemento successivo (2), prende di nuovo
        gli ultimi due elementi (1 e 2) e la somma è l'elemento successivo, e così via. In questo caso, showText esegue sé stessa se la variabile
        index (che punta a una lettera della stringa del messaggio) non è uguale alla fine del messaggio, mentre se index è uguale alla grandezza
        del messaggio la funzione "ritorna", ovvero non chiama più sé stessa.
    */
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

    function randomRisposte(i){
        //randomizza la posizione della risposta giusta: randomizzato può assumere i valori 0 o 1
        randomizzato = Math.floor(Math.random() * 2);
        //se randomizzato vale 1 allora la risposta giusta è a destra, altrimenti è a sinistra
        if(randomizzato == 1){
            htmlString = "<div style='margin: auto; text-align: center; width:85%; height: 90px;'><p id='testo' style='text-align: center; padding-top:10px;'></p></div>";            
            htmlString += "<button id='scelta1' class='rpgui-button golden' type='button' style='margin-right: 25px;'><p>" + domande[i].sceltaGiusta + "</p></button>"+
            "<button id='scelta2' class='rpgui-button golden' type='button' style='margin-left: 25px;'><p>" + domande[i].sceltaSbagliata + "</p></button>";
            htmlString += "<button id='salta' class='rpgui-button golden' type='button'><p>>></p></button>";
        }else{
            htmlString = "<div style='margin: auto; text-align: center; width:85%; height: 90px;'><p id='testo' style='text-align: center; padding-top:10px;'></p></div>";            
            htmlString += "<button id='scelta1' class='rpgui-button golden' type='button' style='margin-right: 25px;'><p>" + domande[i].sceltaSbagliata + "</p></button>"+
            "<button id='scelta2' class='rpgui-button golden' type='button' style='margin-left: 25px;'><p>" + domande[i].sceltaGiusta + "</p></button>";
            htmlString += "<button id='salta' class='rpgui-button golden' type='button'><p>>></p></button>";
        }
        //stampa su boxMessaggi
        $("#boxMessaggi").html(htmlString);
        showText("#testo", domande[i].corpo, 0, 60, ["#scelta1", "#scelta2"]);
    }

    function logicaSconfitta(){
        //Aggiorno lo score
        if(utente.score < 500){
            utente.score = 0;
        }else{
            utente.score -= 500;
        }
        $.post("http://localhost:8080/stanze/aggiornaUtente/", {"utente": JSON.stringify(utente)}, function(utenteJSON){
            utente = JSON.parse(utenteJSON);
        });

        htmlString = "<div style='margin: auto; text-align: center; width:85%; height: 90px;'><p id='testo' style='text-align: center; padding-top:10px;'></p></div>";            
        htmlString += "<button id='menuPrincipale' class='rpgui-button golden' type='button' style='margin-right: 25px;'><p>Menu principale</p></button>";
        htmlString += "<button id='casa' class='rpgui-button golden' type='button' style='margin-right: 25px; margin-left: 25px'><p>Casa</p></button>";
        htmlString += "<button id='riprova' class='rpgui-button golden' type='button' style='margin-left: 25px;'><p>Riprova</p></button><br>";
        htmlString += "<button id='salta' class='rpgui-button golden' type='button'><p>>></p></button>";
        $("#boxMessaggi").html(htmlString);
        showText("#testo", messaggioSconfitta.corpo, 0, 60, ["#menuPrincipale", "#casa", "#riprova"]);

        //se l'utente clicca riprova viene richiamato il valore di questa stanza e l'utente viene rimandato all'inizio del programma
        //attraverso la chiamata ajax alla funzione stanze
        $("#riprova").click(function(){
            $.get("http://localhost:8080/stanze/?", function(stanzaGiustaJSON){
                stanzaGiusta = JSON.parse(stanzaGiustaJSON);
                $(window.location).attr("href", stanzaGiusta);
            });
        });

        //opzione menu principale
        $("#menuPrincipale").click(function(){
            $(window.location).attr("href", "/");
        });

        //opzione stanze, ovvero ritorna alla scelta della stanza
        $("#casa").click(function(){
            $(window.location).attr("href", "/stanze/casa");
        });
    }

    function logicaVittoria(){
        utente.listaOggetti += nemico.oggetto + ",";
        utente.score += 1000;

        $.post("http://localhost:8080/stanze/aggiornaUtente/", {"utente": JSON.stringify(utente)}, function(utenteJSON){
            utente = JSON.parse(utenteJSON);
            
            /*
                Se il nemico è il boss finale il programma deve aggiungere il punteggio dell'utente nello scoreboard e rimandare a una pagina di vittoria
            */
            if(nemico.nome == "Marty"){
                $.post("http://localhost:8080/scoreboard/inserisciScoreboard/?", {"utente": JSON.stringify(utente)}, function(utenteJSON){
                    utente = JSON.parse(utenteJSON);
                });
                
                htmlString = "<div style='margin: auto; text-align: center; width:85%; height: 90px;'><p id='testo' style='text-align: center; padding-top:10px;'></p></div>";            
                htmlString += "<button id='festeggia' class='rpgui-button golden' type='button' style='margin-right: 25px;'><p>Festeggia</p></button>";
                htmlString += "<button id='salta' class='rpgui-button golden' type='button'><p>>></p></button>";
                $("#boxMessaggi").html(htmlString);
                showText("#testo", messaggioVittoria.corpo, 0, 60, ["#festeggia"]);

                $("#festeggia").click(function(){
                    console.log('ci sono');
                    $(window.location).attr("href", "/scoreboard/paginaFesteggia");
                });

            /*
                Se il nemico non è il boss finale il programma deve semplicemente mostrare il suo messaggio di sconfitta e dare l'opzione all'utente di 
                andare in un'altra stanza o di tornare al menu principale
            */
            }else{
                htmlString = "<div style='margin: auto; text-align: center; width:85%; height: 90px;'><p id='testo' style='text-align: center; padding-top:10px;'></p></div>";            
                htmlString += "<button id='menuPrincipale' class='rpgui-button golden' type='button' style='margin-right: 25px;'><p>Menu principale</p></button>";
                htmlString += "<button id='casa' class='rpgui-button golden' type='button' style='margin-left: 25px;'><p>Casa</p></button>";
                htmlString += "<button id='salta' class='rpgui-button golden' type='button'><p>>></p></button>";
                $("#boxMessaggi").html(htmlString);
                showText("#testo", messaggioVittoria.corpo, 0, 60, ["#menuPrincipale", "#casa", "#riprova"]);

                $("#menuPrincipale").click(function(){
                    $(window.location).attr("href", "/");
                });

                $("#casa").click(function(){
                    $(window.location).attr("href", "/stanze/casa");
                });
            }
        });
    }

    //chiamata ajax a vediSession, prende il valore dell'utente dal database e lo carica su js; per semplicità, la lista degli oggetti dell'utente viene
    //inizializzata qua, facendo uno split (listaOggetti è un'unica stringa formattata così: ["oggetto0", "oggetto1", "oggetto2"])
    $.get("http://localhost:8080/vediSession/", function(utenteJSON){
        utente = JSON.parse(utenteJSON);
        oggettiUtente = utente.listaOggetti.split(",");
        oggettiUtente.splice(1,"");
        nStanzaAttuale = utente.stanza;

        //MUSICA STANZE
        const musica_stanza = new Audio('../musica/stanza' + nStanzaAttuale + '.mp3');
        musica_stanza.play();
        musica_stanza.loop = true;
        musica_stanza.playbackRate = 1;
        musica_stanza.volume = 0.2;

        const musica_sfida = new Audio('../musica/sfida.mp3');
        musica_sfida.loop = true;
        musica_sfida.playbackRate = 1;
        musica_sfida.volume = 0.2;

        
        //chiamata ajax a restituisciNemico, restituisce il valore del nemico dal database in base alla stanza
        $.get("http://localhost:8080/stanze/restituisciNemico/", function(nemicoJSON){
            //Mi torna l'oggetto nemico della stanza dove si trova l'utente
            nemico = JSON.parse(nemicoJSON);
            
            if(nemico.nome == "Marty" && oggettiUtente.length < 7){
                htmlString = "<div style='margin: auto; text-align: center; width:85%; height: 90px;'><p id='testo' style='text-align: center; padding-top:10px;'></p></div>";                    
                htmlString += "<button id='salta' class='rpgui-button golden' type='button' style='margin-right: 25px; margin-top: 23px'><p>>></p></button>";
                htmlString += "<button id='casa' class='rpgui-button golden' type='button' style='margin-left: 25px; margin-top: px'><p>Casa</p></button>";
                htmlString += "<button id='menuPrincipale' class='rpgui-button golden' type='button' style='margin-left: 25px; margin-top: px'><p>Menu principale</p></button>";
                $("#boxMessaggi").html(htmlString);
                showText("#testo", "Ehi, tu, grullo! Non hai anhora battuto gli altri! Devi torna' ne l'altre stanze pefforza!", 0, 60, ["#menuPrincipale", "#casa"]);
    
                $("#casa").click(function(){
                    $(window.location).attr("href", "/stanze/casa");
                });
    
                $("#menuPrincipale").click(function(){
                    $(window.location).attr("href", "/");
                });
            }else{
                //chiamata ajax a restituisciVittoria, ovvero l'inizializzazione del messaggio di vittoria e di sconfitta: per evitare problemi in seguito viene inizializzata
                //qua la frase che il nemico dice quando l'utente risponde correttamente a 2 o più domande o quando risponde a 1 o a 0 domande in modo corretto
                messaggioVittoria = "";
                $.get("http://localhost:8080/stanze/restituisciVittoria/", function(messaggioVittoriaJSON){
                    messaggioVittoria = JSON.parse(messaggioVittoriaJSON);
                });

                messaggioSconfitta = "";
                $.get("http://localhost:8080/stanze/restituisciSconfitta/", function(messaggioSconfittaJSON){
                    messaggioSconfitta = JSON.parse(messaggioSconfittaJSON);
                });

                //chiamata ajax a restituisciBenvenuto, che restituisce la frase che il nemico dovrebbe dire in base a tre parametri:
                //caso 1 - l'utente non ha mai incontrato questo personaggio;
                //caso 2 - l'utente ha incontrato il personaggio e ha perso;
                //caso 3 - l'utente ha incontrato il personaggio e ha vinto.
                $.get("http://localhost:8080/stanze/restituisciBenvenuto/", function(msgBenvenutoJSON){
                    msgBenvenuto = JSON.parse(msgBenvenutoJSON);
                    
                    //se il messaggio di benvenuto è vuoto allora si ricade nel caso 1, ovvero il caso in cui l'utente non abbia mai incontrato il nemico
                    if(msgBenvenuto != ""){
                        //inizializzazione a zero di risposteGiuste: verrà controllato alla fine dell'interrogatorio del nemico
                        risposteGiuste = 0;
                        //siccome l'utente ha ricevuto il saluto di benvenuto del nemico, viene aggiunto il suo id a idInteragiti di utente, una stringa formattata
                        //così ("idNemico1,idNemico2,idNemico3,") che contiene gli id di tutti i nemici incontrati
                        utente.idInteragiti += nemico.id + ",";
                        //chiamata ajax a aggiornaUtente: praticamente passa i valori di utente al backend, che aggiorna il database
                        $.post("http://localhost:8080/stanze/aggiornaUtente/", {"utente": JSON.stringify(utente)}, function(utenteJSON){
                            utente = JSON.parse(utenteJSON);
                        });

                        //stampa nel box messaggi di un paragrafo che conterrà il testo e del pulsante per skippare: i pulsanti scelta1 e scelta2 vengono nascosti e mostrati da showText
                        htmlString = "<div style='margin: auto; text-align: center; width:85%; height: 90px;'><p id='testo' style='text-align: center; padding-top:10px;'></p></div>";                    
                        htmlString += "<button id='combatti' class='rpgui-button golden' type='button' style='margin-right: 25px; margin-top: 23px'><p>Combatti!</p></button>";
                        htmlString += "<button id='salta' class='rpgui-button golden' type='button' style='margin-right: 25px; margin-top: 23px'><p>>></p></button>";
                        htmlString += "<button id='menuPrincipale' class='rpgui-button golden' type='button' style='margin-left: 25px; margin-top: px'><p>Menu principale</p></button>";
                        $("#boxMessaggi").html(htmlString);
                        showText("#testo", msgBenvenuto.corpo, 0, 60, ["#combatti"]);
                        
                        //se l'utente clicca su combatti il programma inizia lo scontro
                        $("#combatti").click(function(){
                            //CAMBIO MUSICA PER COMBATTIMENTO
                            if(nStanzaAttuale < 7){
                                musica_stanza.pause();
                                musica_sfida.play();
                            }
                            //chiamata ajax a restituisciDomandeRandom, una funzione del controller che randomizza tre domande da porre all'utente di tutte quelle del database
                            $.get("http://localhost:8080/stanze/restituisciDomandeRandom/", function(domandeRandomJSON){
                                domande = JSON.parse(domandeRandomJSON);
                                //Richiamo la funzione per randomizzare le risposte
                                randomRisposte(0);
                                
                                //logica della risposta alla prima domanda: applica una funzione jquery multitag, ovvero una funzione che vale per due tag contemporaneamente
                                $("#scelta1, #scelta2").click(function(){
                                    //salva su sceltaUtente this, che in questo caso è scelta1 o scelta2
                                    sceltaUtente = $(this).html();

                                    //chiamata ajax a restituisciSceltaGiusta: restituisciSceltaGiusta serve per non far vedere nel codice l'id dei pulsanti, in modo che l'utente
                                    //non possa fare f12 e vedere la risposta giusta, che viene restituita tramite, appunto, restituisceSceltaGiusta. A questa funzione backend viene
                                    //passato l'id della domanda, e restituisce la risposta giusta
                                    $.get("http://localhost:8080/stanze/restituisciSceltaGiusta/", {idDomanda: domande[0].id}, function(sceltaGiustaJSON){
                                        sceltaGiusta = JSON.parse(sceltaGiustaJSON);
                                        //sceltaUtenteStr è la ripulitura del valore del pulsante, che contiene un paragrafo all'interno
                                        sceltaUtenteStr = sceltaUtente.replace("<p>", "").replace("</p>", "");
                                        //se la scelta che ha fatto l'utente è quella giusta risposteGiuste viene incrementato
                                        if(sceltaUtenteStr == sceltaGiusta){
                                            risposteGiuste++;
                                        }
                                        
                                        //si ricomincia daccapo a randomizzare la posizione della risposta giusta e a chiamare la funzione che restituisce la risposta corretta:
                                        //il codice è lo stesso. L'unica cosa che cambia è il corpo della domanda e le risposte
                                        randomRisposte(1);
                                        
                                        $("#scelta1, #scelta2").click(function(){
                                            sceltaUtente = $(this).html();
                                            $.get("http://localhost:8080/stanze/restituisciSceltaGiusta/", {idDomanda: domande[1].id}, function(sceltaGiustaJSON){
                                                sceltaGiusta = JSON.parse(sceltaGiustaJSON);
                                                sceltaUtenteStr = sceltaUtente.replace("<p>", "").replace("</p>", "");
                                                if(sceltaUtenteStr == sceltaGiusta){
                                                    risposteGiuste++;
                                                }

                                                randomRisposte(2);
            
                                                $("#scelta1, #scelta2").click(function(){
                                                    sceltaUtente = $(this).html();
                                                    $.get("http://localhost:8080/stanze/restituisciSceltaGiusta/", {idDomanda: domande[2].id}, function(sceltaGiustaJSON){
                                                        sceltaGiusta = JSON.parse(sceltaGiustaJSON);
                                                        sceltaUtenteStr = sceltaUtente.replace("<p>", "").replace("</p>", "");
                                                        if(sceltaUtenteStr == sceltaGiusta){
                                                            risposteGiuste++;
                                                        }
                                                        
                                                        //arrivati alla terza domanda il programma calcola le risposte giuste: se sono minori di 2 l'utente non ha vinto, se sono 2 o maggiori
                                                        //di 2 ha vinto. In base a questa cosa viene stampato un messaggio diverso
                                                        if(risposteGiuste < 2){
                                                            logicaSconfitta();
                                                            //CAMBIO MUSICA PER SCONFITTA
                                                            if(nStanzaAttuale < 7){
                                                                musica_sfida.pause();
                                                                musica_stanza.play();
                                                            }
                                                        //se l'utente ha risposto a 2 o più domande giuste allora viene aggiornato il valore dei suoi oggetti, viene caricato il nuovo utente
                                                        //sul database richiamando aggiornaUtente e viene stampato il messaggio di vittoria
                                                        }else{
                                                            logicaVittoria();   
                                                            //CAMBIO MUSICA PER VITTORIA
                                                            if(nStanzaAttuale < 7){
                                                                musica_sfida.pause();
                                                                musica_stanza.play();
                                                            }                                                       
                                                        }
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });

                        //se l'utente clicca su menuPrincipale verrà ricondotto, appunto, al menuPrincipale
                        $("#menuPrincipale").click(function(){
                            $(window.location).attr("href", "/");
                        });
                    //else di riga 91: se il messaggio di benvenuto NON è vuoto significa che l'utente ha già incontrato il nemico. riprendendo i casi 
                    //spiegati a riga 84, l'utente adesso rientra negli ultimi 2 casi:
                    //caso 1 - l'utente ha già incontrato il nemico e ha vinto;
                    //caso 2 - l'utente ha già incontrato il nemico e ha perso.
                    }else{
                        //controllo degli oggetti dell'utente: siccome listaOggetti è una stringa formattata così "item1,item2,item3," occorre
                        //splittare per la virgola e controllare se l'utente ha già o no l'oggetto del nemico
                        oggettiUtente = utente.listaOggetti.split(",");

                        //se l'utente ha già l'oggetto del nemico allora gli dice che lo ha già battuto e lo invita a cambiare stanza
                        if(oggettiUtente.includes(nemico.oggetto)){
                            //chiamata ajax alla funzione che restituisce il messaggio di "mi hai già battuto"
                            $.get("http://localhost:8080/stanze/restituisciAddii/", function(addiiJSON){
                                addii = JSON.parse(addiiJSON);
                                addioRandom = Math.floor(Math.random() * addii.length);
                                
                                //stampa del messaggio
                                htmlString = "<div style='margin: auto; text-align: center; width:85%; height: 90px;'><p id='testo' style='text-align: center; padding-top:10px;'></p></div>";                            
                                htmlString += "<button id='salta' class='rpgui-button golden' type='button'><p>>></p></button>";
                                htmlString += "<button id='menuPrincipale' class='rpgui-button golden' type='button' style='margin-right: 25px; margin-top: 0px'><p>Menu principale</p></button>";
                                htmlString += "<button id='casa' class='rpgui-button golden' type='button' style='margin-left: 25px; margin-top: 0px'><p>Casa</p></button>";
                                $("#boxMessaggi").html(htmlString);
                                showText("#testo", addii[addioRandom].corpo, 0, 60, ["#menuPrincipale", "#casa"]);

                                //opzione menuPrincipale, che rimanda alla schermata iniziale
                                $("#menuPrincipale").click(function(){
                                    $(window.location).attr("href", "/");
                                });

                                //opzione stanze, che rimanda alla scelta delle stanze
                                $("#casa").click(function(){
                                    $(window.location).attr("href", "/stanze/casa");
                                });

                            });
                        //se l'utente ha già combattuto in precedenza ma ha perso il programma rientra nella stessa logica dello scontro di prima (riga 91 - riga 265): l'unica cosa
                        //che cambia è il messaggio che viene stampato. Nel primo caso è un messaggio di benvenuto, nel secondo è un messaggio di scherno verso l'utente
                        }else{
                            $.get("http://localhost:8080/stanze/restituisciProvocazioni/", function(provocazioniJSON){
                                provocazioni = JSON.parse(provocazioniJSON);
                                provocazioneRandom = Math.floor(Math.random() * provocazioni.length);
                                risposteGiuste = 0;

                                htmlString = "<div style='margin: auto; text-align: center; width:85%; height: 90px;'><p id='testo' style='text-align: center; padding-top:10px;'></p></div>";                            
                                htmlString += "<button id='salta' class='rpgui-button golden' type='button' style='margin-right: 25px;'><p>>></p></button>";
                                htmlString += "<button id='combatti' class='rpgui-button golden' type='button' style='margin-right: 25px;'><p>Combatti!</p></button>";
                                htmlString += "<button id='menuPrincipale' class='rpgui-button golden' type='button' style='margin-left: 25px;'><p>Menu principale</p></button>";
                                $("#boxMessaggi").html(htmlString);
                                showText("#testo", provocazioni[provocazioneRandom].corpo, 0, 60, ["#combatti"]);

                                $("#combatti").click(function(){
                                    $.get("http://localhost:8080/stanze/restituisciDomandeRandom/", function(domandeRandomJSON){
                                        //CAMBIO MUSICA PER COMBATTIMENTO
                                        if(nStanzaAttuale < 7){
                                            musica_stanza.pause();
                                            musica_sfida.play();
                                        }
                                        domande = JSON.parse(domandeRandomJSON);
                                        
                                        randomRisposte(0);
                                        
                                        $("#scelta1, #scelta2").click(function(){
                                            sceltaUtente = $(this).html();
                                            $.get("http://localhost:8080/stanze/restituisciSceltaGiusta/", {idDomanda: domande[0].id}, function(sceltaGiustaJSON){
                                                sceltaGiusta = JSON.parse(sceltaGiustaJSON);
                                                sceltaUtenteStr = sceltaUtente.replace("<p>", "").replace("</p>", "");
                                                if(sceltaUtenteStr == sceltaGiusta){
                                                    risposteGiuste++;
                                                }
                
                                                randomRisposte(1);                                
                                                
                                                $("#scelta1, #scelta2").click(function(){
                                                    sceltaUtente = $(this).html();
                                                    $.get("http://localhost:8080/stanze/restituisciSceltaGiusta/", {idDomanda: domande[1].id}, function(sceltaGiustaJSON){
                                                        sceltaGiusta = JSON.parse(sceltaGiustaJSON);
                                                        sceltaUtenteStr = sceltaUtente.replace("<p>", "").replace("</p>", "");
                                                        if(sceltaUtenteStr == sceltaGiusta){
                                                            risposteGiuste++;
                                                        }

                                                        randomRisposte(2);

                                                        $("#scelta1, #scelta2").click(function(){
                                                            sceltaUtente = $(this).html();
                                                            $.get("http://localhost:8080/stanze/restituisciSceltaGiusta/", {idDomanda: domande[2].id}, function(sceltaGiustaJSON){
                                                                sceltaGiusta = JSON.parse(sceltaGiustaJSON);
                                                                sceltaUtenteStr = sceltaUtente.replace("<p>", "").replace("</p>", "");
                                                                if(sceltaUtenteStr == sceltaGiusta){
                                                                    risposteGiuste++;
                                                                }
                                                                //CAMBIO MUSICA PER STANZA
                                                                if(nStanzaAttuale < 7){
                                                                    musica_stanza.pause();
                                                                    musica_sfida.play();
                                                                }

                                                                if(risposteGiuste < 2){
                                                                    logicaSconfitta();
                                                                    //CAMBIO MUSICA PER SCONFITTA
                                                                    if(nStanzaAttuale < 7){
                                                                        musica_sfida.pause();
                                                                        musica_stanza.play();
                                                                    }
                                                                }else{
                                                                    logicaVittoria();
                                                                    //CAMBIO MUSICA PER VITTORIA
                                                                    if(nStanzaAttuale < 7){
                                                                        musica_sfida.pause();
                                                                        musica_stanza.play();
                                                                    }
                                                                }
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });

                                $("#menuPrincipale").click(function(){
                                    $(window.location).attr("href", "/");
                                });
                            });        
                        } 
                    }  
                });
            }
        });
    });
});