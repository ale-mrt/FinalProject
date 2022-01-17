package org.sinenomine.martyisland.Marty.Island.dao;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.sinenomine.martyisland.Marty.Island.entities.Nemico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import com.generation.utility.dao.Database;

public class DAONemici 
{
	@Autowired
	private Database db;
	
	@Autowired
	private ApplicationContext context;
	
	public List<Nemico> read(String query, String... params)
	{
		List<Nemico> ris = new ArrayList<Nemico>();
		for(Map<String, String> riga : db.rows(query, params))
		{
			Nemico n = (Nemico) context.getBean("nemicoMappa", riga);
			ris.add(n);
		}
		return ris;
	}
	
	public Nemico leggiPerId(int id)
	{
		return read("select * from nemici where id = " + id).get(0);
	}
}