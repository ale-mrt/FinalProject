package org.sinenomine.martyisland.Marty.Island.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/crediti")
public class CreditiController 
{
	
	@GetMapping("/")
	public String crediti()
	{
		System.out.println("Sono in /crediti/");
		return "crediti.html";
	}
	
	/*
	 * GetMapping serve per indirizzare bene il sito fatto con spring. Scrivendo localhost8080/crediti
	 * nella barra URL del nostro browser verrà lanciato il metodo sotto
	 * ResponseBosy serve per far capire a Spring che la funzione non ritorna una intera pagina HTML,
	 * ma solo del codice HTML sparso.
	 */
	@GetMapping("/creditiHTML")
	@ResponseBody
	public String creditiHTML()
	{
		System.out.println("Sono in /crediti/creditiHTML");
		//variabile che conterrà il codice html sparso
		String returnDiv = "<div>";
		
		//riempimento della variabile col codice html sparso
		returnDiv += "CREDITI<br>";
		returnDiv += "Front-end: Martina Porrati, Alessandro Murtas <br>";
		returnDiv += "Database: Edoardo Carradori, Lucrezia de Cesare <br>";
		returnDiv += "Back-end: Roberta Vaia, Samuele Bardi <br>";
		returnDiv += "</div>";
		
		//siccome vogliamo che la nostra applicazione stampi anche sulla console di eclipse, stampiamo
		//la variabile con system.out.println, che stampa appunto sulla console di eclipse
		System.out.println(returnDiv);
		
		//ritorno la variabile riempita
		return returnDiv;
	}
	
	@GetMapping("/componentiGruppoHTML")
	@ResponseBody
	public String componentiGruppoHTML()
	{
		System.out.println("Sono in /crediti/componentiGruppoHTML");
		//variabile che conterrà il codice html sparso
		String returnDiv = "<div>";
		
		//riempimento della variabile col codice html sparso
		returnDiv += "Componenti gruppo<br>";
		returnDiv += "Martina Porrati <br> Alessandro Murtas <br>";
		returnDiv += "Edoardo Carradori <br> Lucrezia de Cesare <br>";
		returnDiv += "Roberta Vaia <br> Samuele Bardi <br>";
		returnDiv += "</div>";
		
		//siccome vogliamo che la nostra applicazione stampi anche sulla console di eclipse, stampiamo
		//la variabile con system.out.println, che stampa appunto sulla console di eclipse
		System.out.println(returnDiv);
		
		//ritorno la variabile riempita
		return returnDiv;
	}
}