package org.sinenomine.martyisland.Marty.Island.dao;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.sinenomine.martyisland.Marty.Island.entities.Domanda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import com.generation.utility.dao.Database;

public class DAODomande 
{
	@Autowired
	private Database db;
	
	@Autowired
	private ApplicationContext context;
	
	public List<Domanda> read(String query, String... params)
	{
		List<Domanda> ris = new ArrayList<>();
		for(Map<String,String> riga : db.rows(query, params))
		{
			Domanda d = (Domanda) context.getBean("domandaMappa", riga);
			ris.add(d);
		}
		return ris;
	}
	
	public List<Domanda> leggiTutte()
	{
		return read("select * from domande");
	}
	
	public List<Domanda> leggiPerId(int id)
	{
		return read("select * from domande where idNemico = " + id);
	}
	
	public Domanda leggiDomandaPerId(int id) {
		return read("select * from domande where id = " + id).get(0);
	}
	
	public String leggiRispostaPerId(int id) {
		return read("select * from domande where id = ?", id+"").get(0).getSceltaGiusta();
	}
}