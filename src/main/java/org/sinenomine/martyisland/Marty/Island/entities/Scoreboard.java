package org.sinenomine.martyisland.Marty.Island.entities;
import java.sql.Date;
import com.generation.utility.entities.Entity;

public class Scoreboard extends Entity
{
	private String giocatore;
	private int score;
	private Date data;
	
	public String getGiocatore() 
	{
		return giocatore;
	}
	
	public void setGiocatore(String giocatore) 
	{
		this.giocatore = giocatore;
	}
	
	public int getScore() 
	{
		return score;
	}
	
	public void setScore(int score) 
	{
		this.score = score;
	}
	
	public Date getData() 
	{
		return data;
	}
	
	public void setData(Date data) 
	{
		this.data = data;
	}
}