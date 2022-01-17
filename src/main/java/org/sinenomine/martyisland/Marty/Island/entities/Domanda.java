package org.sinenomine.martyisland.Marty.Island.entities;
import com.generation.utility.entities.Entity;

public class Domanda extends Entity
{
	private String corpo;
	private String sceltaGiusta;
	private String sceltaSbagliata;
	private int idNemico;
	
	public String getCorpo() 
	{
		return corpo;
	}
	
	public void setCorpo(String corpo) 
	{
		this.corpo = corpo;
	}
	
	public String getSceltaGiusta() 
	{
		return sceltaGiusta;
	}
	
	public void setSceltaGiusta(String sceltaGiusta)
	{
		this.sceltaGiusta = sceltaGiusta;
	}
	
	public String getSceltaSbagliata() 
	{
		return sceltaSbagliata;
	}
	
	public void setSceltaSbagliata(String sceltaSbagliata) 
	{
		this.sceltaSbagliata = sceltaSbagliata;
	}
	
	public int getIdNemico() {
		return idNemico;
	}
	
	public void setIdNemico(int idNemico)
	{
		this.idNemico = idNemico;
	}
}