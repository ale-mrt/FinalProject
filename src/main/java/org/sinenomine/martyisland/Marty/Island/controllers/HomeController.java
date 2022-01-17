package org.sinenomine.martyisland.Marty.Island.controllers;
import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
public class HomeController 
{
	
	@GetMapping("/")
    public String home()
	{
		
        return "home.html";
    }
	
	@GetMapping("/vediSession")
	@ResponseBody
	public String vediSession(HttpSession session)
	{
		System.out.println("Sono in /vediSession");
		Gson gson = new Gson();
		return gson.toJson(session.getAttribute("utente"));
	}
	
	@PostMapping("/redirectAutenticazione")
	public String redirectAutenticazione()
	{
		System.out.println("Sono in /redirectAutenticazione");
		return "redirect:/";
	}
}