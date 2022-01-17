package org.sinenomine.martyisland.Marty.Island.entities;

import com.generation.utility.entities.Entity;

public class Messaggio extends Entity
{
	private String corpo;
	private int idNemico;
	
	public String getCorpo() 
	{
		return corpo;
	}
	public void setCorpo(String corpo) 
	{
		this.corpo = corpo;
	}
	public int getIdNemico() 
	{
		return idNemico;
	}
	public void setIdNemico(int idNemico) 
	{
		this.idNemico = idNemico;
	}
}