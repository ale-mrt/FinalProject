package org.sinenomine.martyisland.Marty.Island.dao;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.sinenomine.martyisland.Marty.Island.entities.Scoreboard;
import org.sinenomine.martyisland.Marty.Island.entities.Utente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import com.generation.utility.dao.Database;
import java.time.format.DateTimeFormatter;
import java.sql.Date;
import java.time.LocalDateTime;   

public class DAOScoreboards 
{
	@Autowired
	private Database db;
	
	@Autowired
	private ApplicationContext context;
	
	public boolean create(Scoreboard s)
    {
        String query = "insert into scoreboard\r\n" + 
                "(giocatore,score,data)\r\n" + 
                "values (?,?,?)";
        
        return db.update(query, s.getGiocatore(), s.getScore() + "", s.getData() + "");
    }
	
	public List<Scoreboard> read(String query, String... params)
	{
		List<Scoreboard> ris = new ArrayList<Scoreboard>();
		for(Map<String, String> riga : db.rows(query, params))
		{
			Scoreboard s = (Scoreboard) context.getBean("scoreboardMappa", riga);
			ris.add(s);
		}
		return ris;
	}
	
	public boolean update(Scoreboard s)
	{
		String query = "update scoreboard set giocatore = ?, score = ?, data = ? where id = ?";
		return db.update(query, s.getGiocatore(), s.getScore() + "", s.getData() + "", s.getId() + "");
	}
	
	public boolean delete(int id)
	{
		return db.update("delete from scoreboard where id = " + id);
	}
	
	public List<Scoreboard> leggiTutti()
	{
		return read("select * from scoreboard");
	}
	
	/**
	 * 
	 * @author martina
	 * @param u
	 * @return
	 */
	public boolean inserisciScoreboard(Utente u) {
		boolean ris;
		Scoreboard s = new Scoreboard();
		/*
		 * La data odierna si prende da java. Java ha le librerie LocalDateTime per ottenere la data e l'orario di adesso, mentre DateTimeFormatter
		 * serve per graficare bene quello che restituisce LocalDateTime
		 */
		DateTimeFormatter formattatoreData = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    LocalDateTime adesso = LocalDateTime.now();
	    
		s.setGiocatore(u.getUsername());
		s.setScore(u.getScore());
		s.setData(Date.valueOf(formattatoreData.format(adesso)));
		
		ris = create(s);
		
		return ris;
	}
}