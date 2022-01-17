package org.sinenomine.martyisland.Marty.Island;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Scope;
import com.generation.utility.dao.Database;
import java.util.Map;

import org.sinenomine.martyisland.Marty.Island.dao.DAODomande;
import org.sinenomine.martyisland.Marty.Island.dao.DAOMessaggi;
import org.sinenomine.martyisland.Marty.Island.dao.DAONemici;
import org.sinenomine.martyisland.Marty.Island.dao.DAOScoreboards;
import org.sinenomine.martyisland.Marty.Island.dao.DAOUtenti;
import org.sinenomine.martyisland.Marty.Island.entities.*;

@Configuration
public class Context 
{
	@Bean
	@Scope("prototype")
	@Primary
	public Utente utenteVuoto()
	{
		return new Utente();
	}
	
	@Bean
	@Scope("prototype")
	public Utente utenteMappa(Map<String, String> riga)
	{
		Utente u = new Utente();
		u.fromMap(riga);
		return u;
	}
	
	@Bean
	@Scope("prototype")
	public Nemico nemicoMappa(Map<String, String> riga)
	{
		Nemico n = new Nemico();
		n.fromMap(riga);
		return n;
	}
	
	@Bean
	@Scope("prototype")
	public Scoreboard scoreboardMappa(Map<String, String> riga)
	{
		Scoreboard s = new Scoreboard();
		s.fromMap(riga);
		return s;
	}
	
	@Bean
	@Scope("prototype")
	public Domanda domandaMappa(Map<String, String> riga)
	{
		Domanda d = new Domanda();
		d.fromMap(riga);
		return d;
	}
	
	@Bean
	@Scope("prototype")
	public Messaggio messaggioMappa(Map<String, String> riga)
	{
		Messaggio m = new Messaggio();
		m.fromMap(riga);
		return m;
	}
	
	@Bean
	public DAOUtenti daoUtenti() 
	{
		return new DAOUtenti();
	}
	
	@Bean
	public DAONemici daoNemici() 
	{
		return new DAONemici();
	}
	
	@Bean
	public DAOScoreboards daoScoreboards() 
	{
		return new DAOScoreboards();
	}
	
	@Bean
	public DAODomande daoDomande() 
	{
		return new DAODomande();
	}
	
	@Bean
	public DAOMessaggi daoMessaggi() 
	{
		return new DAOMessaggi();
	}
	
	@Bean
	public Database database() 
	{
		return new Database("provaSessione", "root", "root");
	}
}