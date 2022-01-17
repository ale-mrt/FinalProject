package org.sinenomine.martyisland.Marty.Island.entities;
import com.generation.utility.entities.Entity;

public class Utente extends Entity
{
    private String username;
    private String password;
    private int stanza;
    private int score;
    private String listaOggetti;
    private String idInteragiti;
    
	public String getUsername() 
	
	{
		return username;
	}
	public void setUsername(String username)
	
	{
		this.username = username;
	}
	public String getPassword() 
	
	{
		return password;
	}
	public void setPassword(String password) 
	
	{
		this.password = password;
	}
	public int getStanza() 
	
	{
		return stanza;
	}
	public void setStanza(int stanza) 
	
	{
		this.stanza = stanza;
	}
	public int getScore() 
	
	{
		return score;
	}
	public void setScore(int score) 
	
	{
		this.score = score;
	}
	
	public String getListaOggetti() 
	{
		return listaOggetti;
	}
	
	public void setListaOggetti(String listaOggetti) 
	{
		this.listaOggetti = listaOggetti;
	}
	
	public String getIdInteragiti() 
	{
		return idInteragiti;
	}
	
	public void setIdInteragiti(String idInteragiti) 
	{
		this.idInteragiti = idInteragiti;
	}
}