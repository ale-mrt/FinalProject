package org.sinenomine.martyisland.Marty.Island.controllers;
import org.sinenomine.martyisland.Marty.Island.dao.DAOScoreboards;
import org.sinenomine.martyisland.Marty.Island.entities.Utente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpSession;
import com.google.gson.Gson;

@Controller
@RequestMapping("/scoreboard")
public class ScoreboardController
{
	@Autowired
	private DAOScoreboards ds;
	
	@GetMapping("/json")
	@ResponseBody
	public String json()
	{
		System.out.println("Sono in /scoreboard/json");
		Gson gson = new Gson();
		return gson.toJson(ds.leggiTutti());
	}
	
	@GetMapping("/")
	public String scoreboard()
	{
		System.out.println("Sono in /scoreboard/");
		return "scoreboard.html";
	}
	
	@PostMapping("/inserisciScoreboard")
	@ResponseBody
	public String inserisciScoreboard(@RequestBody MultiValueMap<String, String> utente,
												   HttpSession session){
		System.out.println("Sono in /scoreboard/inserisciScoreboard");
		
		Utente u = new Gson().fromJson(utente.getFirst("utente"), Utente.class);
		System.out.println("---> inserimento db: " + ds.inserisciScoreboard(u));
	    
		return new Gson().toJson(u);
	}
	
	@GetMapping("/paginaFesteggia")
	public String paginaFesteggia(){
		return "paginaFesteggia.html";
	}
}