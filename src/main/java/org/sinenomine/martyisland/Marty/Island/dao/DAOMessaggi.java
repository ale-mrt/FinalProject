package org.sinenomine.martyisland.Marty.Island.dao;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.sinenomine.martyisland.Marty.Island.entities.Messaggio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import com.generation.utility.dao.Database;

public class DAOMessaggi 
{
	@Autowired
	private Database db;
	
	@Autowired
	private ApplicationContext context;
	
	public List<Messaggio> read(String query, String... params)
	{
		List<Messaggio> ris = new ArrayList<Messaggio>();
		for(Map<String, String> riga : db.rows(query, params))
		{
			Messaggio m = (Messaggio) context.getBean(Messaggio.class, riga);
			ris.add(m);
		}
		return ris;
	}
	
	public Messaggio leggiMessaggioPresentazione()
	{
		return read("select * from messaggioPresentazione").get(0);
	}
	
	public List<Messaggio> leggiMessaggiProvocatori()
	{
		return read("select * from messaggiProvocatori");
	}
	
	public Messaggio leggiMessaggioVittoria()
	{
		return read("select * from messaggioVittoria").get(0);
	}
	
	public List<Messaggio> leggiMessaggiSconfitta()
	{
		return read("select * from messaggiSconfitta");
	}
	
	public List<Messaggio> leggiMessaggiAddio()
	{
		return read("select * from messaggiAddio");
	}
		
	public Messaggio leggiPerIdPresentazione(int id)
	{
		return read("select * from messaggioPresentazione where idNemico = " + id).get(0);
	}
	
	public List<Messaggio> leggiPerIdProvocatori(int id)
	{
		return read("select * from messaggiProvocatori where idNemico = " + id);
	}
	
	public Messaggio leggiPerIdVittoria(int id)
	{
		return read("select * from messaggioVittoria where idNemico = " + id).get(0);
	}
	
	public List<Messaggio> leggiPerIdSconfitta(int id)
	{
		return read("select * from messaggiSconfitta where idNemico = " + id);
	}
	
	public List<Messaggio> leggiPerIdAddio(int id)
	{
		return read("select * from messaggiAddio where idNemico = " + id);
	}
}