var utenti = [];
var utente;

$(document).ready(function(){
    //MUSICA AUTENTICAZIONE
    const music = new Audio('../musica/autenticazione.mp3');
    music.play();
    music.loop = true;
    music.playbackRate = 1;
    music.volume = 0.13;

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

    $("#usernameInput, #passwordInput").blur(function(){
        username = $("#usernameInput").val();
        password = $("#passwordInput").val();
        invalid = false;

        if(username.length > 32){
            $("#usernameError").html("<p style='color: red'>Ehi! Ma che diamine di username lunghissimo è questo? Massimo 32 caratteri!</p>");
            $("#bottoneRegistrati").prop("disabled", true);
            $("#bottoneLogin").prop("disabled", true);
            invalid = true;
        }else if(username.length < 3){
            $("#usernameError").html("<p style='color: red'>Ehi! Ma che diamine di username cortissimo è questo? Almeno 3 caratteri!</p>");
            $("#bottoneRegistrati").prop("disabled", true);
            $("#bottoneLogin").prop("disabled", true);
            invalid = true;
        }
        
        if(password.length > 100){
            $("#passwordError").html("<p style='color: red'>Capisco la sicurezza, ma una password con "+ password.length + " caratteri è un po' troppo, no? Massimo 100!</p>");
            $("#bottoneRegistrati").prop("disabled", true);
            $("#bottoneLogin").prop("disabled", true);
            invalid = true;
        }else if(password.length < 3){
            if(password.length == 1){
                $("#passwordError").html("<p style='color: red'>Ma come fai ad avere una password di " + password.length + " carattere? Come fai a vivere nell'era digitale?</p>");
            }else{
                $("#passwordError").html("<p style='color: red'>Ma come fai ad avere una password di " + password.length + " caratteri? Come fai a vivere nell'era digitale?</p>");
            }
            $("#bottoneRegistrati").prop("disabled", true);
            $("#bottoneLogin").prop("disabled", true);
            invalid = true;
        }

        if(!invalid){
            $.get("http://localhost:8080/autenticazione/controllaUtente", {username: username}, function(esiste){
                if(esiste){
                    $("#usernameError").html("<p style='color: green'>Ciao, " + username + "! Di nuovo qua? ;)</p>");
                    $("#bottoneRegistrati").prop("disabled", true);
                    $("#bottoneLogin").prop("disabled", false);
                    $("#passwordError").html("<p style='color: green'>Grande " + username + ", hai inserito la password! Vediamo se è giusta...</p>");
                }else{
                    $("#usernameError").html("<p style='color: blue'>Ehi, una nuova persona! " + username + "... Bel nome ;)</p>");
                    $("#bottoneRegistrati").prop("disabled", false);
                    $("#bottoneLogin").prop("disabled", true);
                    $("#passwordError").html("<p style='color: blue'>Buona password. Vedi di ricordartela: attualmente non abbiamo la funzione di recupero ;)</p>");
                }
            });
        }
    });

    //LOGIN
    $("#bottoneLogin").click(function()
    {
        username = $("#usernameInput").val();
        password = $("#passwordInput").val();
        //controllo se ancora non esiste l'utente, se cosi' lo creo e restituisco trovato == false, altrimenti trovato == true
        $.post("http://localhost:8080/autenticazione/loginUtente", {username: username, password: password}, function(loggatoJSON)
        {
            loggato = JSON.parse(loggatoJSON);
            if(loggato == true)
            {
                console.log("--> Login effettuato");
                $(window.location).attr("href", "/");
            }
            else
            {
                console.log("Username " + username + " e password " + password + " non esiste!");
                alert("Username e password errate!");
            }
        });
    });

    //REGISTRATI
    $("#bottoneRegistrati").click(function(){
        //prende i valori dalla form
        username = $("#usernameInput").val();
        password = $("#passwordInput").val();
        
        //passaggio a registrazioneUtente: ritorna l'utente, null se la registrazione non è stata possibile, l'oggetto utente se la registrazione è avvenuta
        $.post("http://localhost:8080/autenticazione/registrazioneUtente", {username: username, password: password}, function(loggatoJSON){
            loggato = JSON.parse(loggatoJSON);
            if(loggato == true){
                console.log("--> Nuovo utente registrato, inserito nel database e loggato");
                $(window.location).attr("href", "/");
            }else{
                console.log("Username " + username + " e password " + password + " esiste!");
                alert("Errore: l'utente non è stato inserito. Non sei ancora loggato!");
            }
        });
    });
});