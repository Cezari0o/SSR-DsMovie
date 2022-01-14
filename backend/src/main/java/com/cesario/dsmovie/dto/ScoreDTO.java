package com.cesario.dsmovie.dto;

public class ScoreDTO {
	
	private String email;
	private Long movieId;
	private Double score;
	
	public ScoreDTO() {}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public Double getScore() {
		return score;
	}

	public void setScore(Double score) {
		this.score = score;
	};
	
	
}
