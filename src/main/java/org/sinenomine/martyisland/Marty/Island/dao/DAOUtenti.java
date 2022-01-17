package org.sinenomine.martyisland.Marty.Island.dao;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.sinenomine.martyisland.Marty.Island.entities.Utente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import com.generation.utility.dao.Database;

public class DAOUtenti 
{
	@Autowired
	private Database db;
	
	@Autowired
	private ApplicationContext context;
	
	public boolean create(Utente u)
	{
        String query = "insert into utenti\r\n" + 
                "(username,password,stanza,score,listaOggetti,idInteragiti)\r\n" + 
                "values (?,?,?,?,?,?)";
        
        return db.update(query, u.getUsername(), u.getPassword(), u.getStanza()+"",
        						u.getScore()+"", u.getListaOggetti()+"",
        						u.getIdInteragiti()+"");
    }
	
	public List<Utente> read(String query, String... params)
	{
		List<Utente> ris = new ArrayList<>();
		for(Map<String, String> riga : db.rows(query, params))
		{
			Utente u = (Utente) context.getBean("utenteMappa", riga);
			ris.add(u);
		}
		return ris;
	}
	
	public boolean update(Utente u)
	{
		String query = "update utenti set username = ?, password = ?, stanza = ? , score = ?, "
					+ "listaOggetti = ?, idInteragiti = ? where id = ?";
        
		return db.update(query, u.getUsername(), u.getPassword(), u.getStanza()+"",
								u.getScore()+"", u.getListaOggetti()+"", u.getIdInteragiti()+"",
								u.getId()+"");
	}
	
	public boolean delete(int id){
		return db.update("delete from utenti where id = " + id);
	}
	
	public List<Utente> leggiTutti()
	{
		return read("select * from utenti");
	}
	
	public List<String> leggiUsername()
	{
		List<String> nomiUtente = new ArrayList<>();
		List<Utente> utenti = leggiTutti();
		
		for(Utente u : utenti)
		{
			nomiUtente.add(u.getUsername());
		}
		return nomiUtente;
	}
	
	public Utente readUserPass(String username, String password)
	{
		return read("select * from utenti where username = ? AND password = ?", username, password).get(0);
	}
	
	public boolean checkUserPass(String username, String password)
	{
		boolean ris = false;
		for(Utente u : leggiTutti())
		{
			if(u.getUsername().equals(username) && u.getPassword().equals(password))
			{
				ris = true;
				break;
			}
		}
		return ris;
	}
	
	public int ultimoId(String username, String Password)
	{
		return read("select * from utenti where username = ? AND password = ?", username, Password).get(0).getId();
	}
}