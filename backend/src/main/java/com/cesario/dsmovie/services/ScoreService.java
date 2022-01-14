package com.cesario.dsmovie.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cesario.dsmovie.dto.MovieDTO;
import com.cesario.dsmovie.dto.ScoreDTO;
import com.cesario.dsmovie.entities.Movie;
import com.cesario.dsmovie.entities.Score;
import com.cesario.dsmovie.entities.User;
import com.cesario.dsmovie.repositories.MovieRepository;
import com.cesario.dsmovie.repositories.ScoreRepository;
import com.cesario.dsmovie.repositories.UserRepository;

@Service
public class ScoreService {

	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ScoreRepository scoreRepository;
	
	@Transactional
	public MovieDTO saveScore(ScoreDTO scoreDTO) {
		User user = userRepository.findByEmail(scoreDTO.getEmail());
		
		if(user == null) {
			user = new User();
	
			user.setEmail(scoreDTO.getEmail());
			user = userRepository.saveAndFlush(user);	
		}
		
		Movie movie = movieRepository.findById(scoreDTO.getMovieId()).get();
		
		Score score = new Score();
		
		score.setMovie(movie);
		score.setUser(user);
		score.setValue(scoreDTO.getScore());
		
		score = scoreRepository.saveAndFlush(score);
		
		int avaliationCount = movie.getScores().size();
		
		Double totalScore = 0.0;
		for(Score s : movie.getScores()) {
			totalScore += s.getValue();
		}
		
		totalScore /= avaliationCount;
		
		movie.setScore(totalScore);
		movie.setCount(avaliationCount);
		
		movie = movieRepository.save(movie);
		
		return new MovieDTO(movie);
	}
	
}
