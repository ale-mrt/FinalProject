package org.sinenomine.martyisland.Marty.Island.controllers;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.sinenomine.martyisland.Marty.Island.dao.DAOUtenti;
import org.sinenomine.martyisland.Marty.Island.entities.Utente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.google.gson.Gson;

@Controller
@RequestMapping("/autenticazione")
public class AutenticazioneController 
{
	@Autowired
	private Utente utente;
	
	@Autowired
	private DAOUtenti du;
	
	@GetMapping("/")
	public String autenticazione() 
	{
		return "autenticazione.html";
	}
	
	@PostMapping("/loginUtente")
	@ResponseBody
	public String login(@RequestBody MultiValueMap<String, String> datiUtente,
			  HttpSession session)
	{
		System.out.println("Sono in /autenticazione/loginUtente");
		Gson gson = new Gson();
		String username = datiUtente.getFirst("username");
		String password = datiUtente.getFirst("password");
		
		if(du.checkUserPass(username, password))
		{
			//Leggo l'utente dal db e lo creo dentro Java
			Utente utente = du.readUserPass(username, password);
			System.out.println("Utente loggato: \n" + utente.toString());
			//Creo la session con dentro l'utente
			session.setAttribute("loggato", true);
			session.setAttribute("utente", utente);
		}
		return gson.toJson(session.getAttribute("loggato"));
	}
	
	@GetMapping("/controllaUtente")
	@ResponseBody
	public boolean controllaUtente(@RequestParam String username)
	{
		System.out.println("Sono in /autenticazione/controllaUtente");
		List<String> utenti = du.leggiUsername();
		
		if(utenti.contains(username)) {
			return true;
		}else {
			return false;
		}
	}
	/**
	 * questo metodo, mappato su localhost8080:/autenticazione/registrati, prende in input i valori passati da una form
	 * e una sessione e registra l'utente inserendolo nel database, ritorna errore se l'utente esiste già
	 * @param  datiUtente i dati nella form, che comprenderanno username e password
	 * @param  session la session
	 * @return una stringa di redirezione: se l'utente è già registrato manda a una pagina di errore o alla pagina della
	 * 		   registrazione con una variabile settata a true, che farà capire al front-end di stampare un messaggio in rosso
	 */
	@PostMapping("/registrazioneUtente")
	@ResponseBody
	public String registrazioneUtente(@RequestBody MultiValueMap<String, String> datiUtente, HttpSession session)
	{
		System.out.println("Sono in /autenticazione/registrazioneUtente");
		Gson gson = new Gson();
		List<String> utenti = du.leggiUsername();
		//prende i dati dalla post
		String username = datiUtente.getFirst("username");
		String password = datiUtente.getFirst("password");
		
		//se nei nomi degli utenti compare anche quello inserito allora reindirizza a una pagina di errore
		//e aggiunge un attributo a session chiamato giaRegistrato o qualcosa del genere
		if(utenti.contains(username)){
			session.setAttribute("utente", null);
			session.setAttribute("loggato", false);
		}else{
			//se nel for il metodo non ritorna allora l'utente non esiste ed è da creare: l'utente inizializzato con autowired
            //si riferisce al bean primary di context chiamato utenteVuoto, che crea un utente inizializzato a zero in tutti
            //i suoi campi. serve, dunque, caricarlo delle informazioni standard dei nuovi utenti o di chi fa una nuova partita
            utente.setUsername(username);
            utente.setPassword(password);
            utente.setStanza(1);
            utente.setScore(0);
            utente.setListaOggetti("");
            utente.setIdInteragiti("");
			//stampa a console dell'avvenuta registrazione
            System.out.println(du.create(utente));
            
            //Mi faccio tornare l'id che SQL ha assegnato al nuovo utente
            int idUtente = du.readUserPass(username, password).getId();
            //setto il nuovo id
            utente.setId(idUtente);
            
            //set del'attributo della session giaRegistrato a false (in modo da evitare errori di controllo eventuali)
            //e set dell'attributo utente nella session: se l'utente di registra viene già loggato
            session.setAttribute("utente", utente);
            session.setAttribute("loggato", true);

            System.out.println(utente);
		}
		
		return gson.toJson(session.getAttribute("loggato"));
	}
	
	@GetMapping("/logout")
	public String logout(HttpSession session) 
	{
		System.out.println("Sono in /autenticazione/logout");
		session.setAttribute("utente", null);
		session.setAttribute("loggato", false);
		return "redirect:/";
	}
}