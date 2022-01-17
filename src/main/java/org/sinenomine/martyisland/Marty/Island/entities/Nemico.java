package org.sinenomine.martyisland.Marty.Island.entities;
import com.generation.utility.entities.Entity;

public class Nemico extends Entity
{
	private String nome;
	private int stanza;
	private String oggetto;
	
	public String getNome() 
	{
		return nome;
	}
	
	public void setNome(String nome) 
	{
		this.nome = nome;
	}
	
	public int getStanza() 
	{
		return stanza;
	}
	
	public void setStanza(int stanza) 
	{
		this.stanza = stanza;
	}
	
	public String getOggetto() 
	{
		return oggetto;
	}
	
	public void setOggetto(String oggetto) 
	{
		this.oggetto = oggetto;
	}
}