package org.sinenomine.martyisland.Marty.Island.controllers;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpSession;
import org.sinenomine.martyisland.Marty.Island.dao.DAODomande;
import org.sinenomine.martyisland.Marty.Island.dao.DAOMessaggi;
import org.sinenomine.martyisland.Marty.Island.dao.DAONemici;
import org.sinenomine.martyisland.Marty.Island.dao.DAOUtenti;
import org.sinenomine.martyisland.Marty.Island.entities.Domanda;
import org.sinenomine.martyisland.Marty.Island.entities.Messaggio;
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
@RequestMapping("/stanze")
public class StanzeController {
	@Autowired
	private DAOUtenti du;
	
	@Autowired
	private DAONemici dn;
	
	@Autowired
	private DAOMessaggi dm;
	
	@Autowired
	private DAODomande dd;
	
	//ATTENZIONE!!! NON TOCCARE!!!
	@GetMapping("/")
	@ResponseBody
    public String stanze(HttpSession session)
    {
		System.out.println("Sono in /stanze/");
		Gson gson = new Gson();
        String ris = "/stanze/stanza";
        Utente u = (Utente) session.getAttribute("utente");
        System.out.println("Session: \n" + session.getAttribute("utente"));
        switch(u.getStanza()) {
            case 1:
                ris += "1.html";
            break;
            case 2:
                ris += "2.html";
            break;
            case 3:
                ris += "3.html";
            break;
            case 4:
                ris += "4.html";
            break;
            case 5:
                ris += "5.html";
            break;
            case 6:
                ris += "6.html";
            break;
            case 7:
                ris += "7.html";
            break;
        }
        System.out.println("ris: " + ris);
        return gson.toJson(ris);
    }
	//ATTENZIONE!!! NON TOCCARE!!!
	
	@GetMapping("/casa")
    public String casa()
    {
        System.out.println("sono in /stanze/casa");
        return "casa.html";
    }
	
	@PostMapping("/resetUtente")
	public String resetUtente(@RequestBody MultiValueMap<String, String> utente,
										   HttpSession session)
	{
		System.out.println("Sono in /stanze/resetUtente");
		//Ricevo e stampo la multi value map
		System.out.println("JSON: \n" + utente.getFirst("utente"));
		//creo l'utente
		Utente u = new Gson().fromJson(utente.getFirst("utente"), Utente.class);
		//stampo l'utente
		System.out.println("Utente: \n" + u);
		//aggiorno il db e stampo il risultato
		System.out.println("Aggiornamento del database: " + du.update(u));
		//aggiorno la session
		session.setAttribute("utente", u);
		//stampo la session su Eclipse
		System.out.println(session.getAttribute("utente"));
		//ritorno la stanza del gioco
		return "redirect:/stanze/?";
	}
	
	@PostMapping("/aggiornaStanza")
	public String aggiornaStanza(@RequestBody MultiValueMap<String, String> utente,
										   	  HttpSession session)
	{
		System.out.println("Sono in /stanze/aggiornaStanza");
		//Ricevo e stampo la multi value map
		System.out.println("JSON: \n" + utente.getFirst("utente"));
		//creo l'utente
		Utente u = new Gson().fromJson(utente.getFirst("utente"), Utente.class);
		//stampo l'utente
		System.out.println("Utente: \n" + u);
		//aggiorno il db e stampo il risultato
		System.out.println("Aggiornamento del database: " + du.update(u));
		//aggiorno la session
		session.setAttribute("utente", u);
		//stampo la session su Eclipse
		System.out.println(session.getAttribute("utente"));
		//ritorno la stanza del gioco
		return "redirect:/stanze/?";
	}
	
	@PostMapping("/aggiornaUtente")
	@ResponseBody
	public String aggiornaUtente(@RequestBody MultiValueMap<String, String> utente,
										      HttpSession session)
	{
		System.out.println("Sono in /stanze/aggiornaUtente");
		//Ricevo e stampo la multi value map
		System.out.println("JSON mappa: \n" + utente);
	    
		//creo l'utente
		Utente u = new Gson().fromJson(utente.getFirst("utente"), Utente.class);
		//stampo l'utente
		System.out.println("Utente: \n" + u);
		//aggiorno il db e stampo il risultato
		System.out.println("Aggiornamento del database: " + du.update(u));
		//aggiorno la session
		session.setAttribute("utente", u);
		//stampo la session su Eclipse
		System.out.println(session.getAttribute("utente"));
		//ritorno il Json dell'utente
		return new Gson().toJson(u);
	}
	
	@GetMapping("/restituisciNemico")
	@ResponseBody
	public String restituisciNemico(HttpSession session)
	{
		System.out.println("Sono in /stanze/restituisciNemico");
		Utente u = (Utente) session.getAttribute("utente");
		return new Gson().toJson(dn.leggiPerId(u.getStanza()));
	}
	
	@GetMapping("/restituisciBenvenuto")
	@ResponseBody
	public String restituisciBenvenuto(HttpSession session)
	{
		System.out.println("Sono in /stanze/restituisciBenvenuto");
		Gson gson = new Gson();
		Utente u = (Utente) session.getAttribute("utente");
		//trasformo in AL di String la stringa idInteragiti
		ArrayList<String> idInteragiti = new ArrayList<String>(Arrays.asList(u.getIdInteragiti().split(",")));
		//scrivo dentro stanza attuale, sotto forma di String, il valore della stanza
		String stanzaAttuale = String.valueOf(u.getStanza());
		//se l'utente ha gia' interagito con la stanza
		if(idInteragiti.contains(stanzaAttuale))
			//altrimenti null
			return gson.toJson("");
		else
			//ritorna il nemico di quella stanza
			return gson.toJson(dm.leggiPerIdPresentazione(u.getStanza()));
	}
	
	@GetMapping("/restituisciDomande")
	@ResponseBody
	public String restituisciDomande(HttpSession session)
	{
		System.out.println("Sono in /stanze/restituisciDomande");
		Gson gson = new Gson();
		Utente u = (Utente) session.getAttribute("utente");
		return gson.toJson(dd.leggiPerId(u.getStanza()));
	}
	
	@GetMapping("/restituisciProvocazioni")
	@ResponseBody
	public String restituisciProvocazioni(HttpSession session)
	{
		System.out.println("Sono in /stanze/restituisciProvocazioni");
		Gson gson = new Gson();
		Utente u = (Utente) session.getAttribute("utente");
		return gson.toJson(dm.leggiPerIdProvocatori(u.getStanza()));
	}
	
	@GetMapping("/restituisciVittoria")
	@ResponseBody
	public String restituisciVittoria(HttpSession session)
	{
		System.out.println("Sono in /stanze/restituisciVittoria");
		Gson gson = new Gson();
		Utente u = (Utente) session.getAttribute("utente");
		System.out.println(u);
		System.out.println(dm.leggiPerIdVittoria(u.getStanza()));
		
		return gson.toJson(dm.leggiPerIdVittoria(u.getStanza()));
	}
	
	@GetMapping("/restituisciSconfitta")
    @ResponseBody
    public String restituisciSconfitta(HttpSession session){
        Random randomizzatore = new Random();

        System.out.println("Sono in /stanze/restituisciSconfitta");
        Gson gson = new Gson();
        Utente u = (Utente) session.getAttribute("utente");
        List<Messaggio> messaggiSconfitta = dm.leggiPerIdSconfitta(u.getStanza());
        int indiceRandom = randomizzatore.nextInt(messaggiSconfitta.size());

        return gson.toJson(messaggiSconfitta.get(indiceRandom));
    }
	
	@GetMapping("/restituisciAddii")
	@ResponseBody
	public String restituisciAddii(HttpSession session)
	{
		System.out.println("Sono in /stanze/restituisciAddii");
		Gson gson = new Gson();
		Utente u = (Utente) session.getAttribute("utente");
		return gson.toJson(dm.leggiPerIdAddio(u.getStanza()));
	}
	
	/*
		AGGIUNTE IN BASSO
	*/
	@GetMapping("/restituisciDomandeRandom")
	@ResponseBody
	public String restituisciDomandeRandom(HttpSession session){
		System.out.println("Sono in /stanze/restituisciDomandeRandom");
		Gson gson = new Gson();
		
		Utente u = (Utente) session.getAttribute("utente");
		List<Domanda> domande = dd.leggiPerId(u.getStanza());
		Collections.shuffle(domande);
		
		int nDomande = dd.leggiPerId(u.getStanza()).size();
		
		return gson.toJson(domande.subList(0, nDomande));
	}
	
	@GetMapping("/restituisciSceltaGiusta")
	@ResponseBody
	public String restituisciSceltaGiusta(HttpSession session, @RequestParam int idDomanda){
		System.out.println("Sono in /stanze/restituisciSceltaGiusta");
		Gson gson = new Gson();
		System.out.println("-----> " + dd.leggiRispostaPerId(idDomanda));
		return gson.toJson(dd.leggiRispostaPerId(idDomanda));
	}
}