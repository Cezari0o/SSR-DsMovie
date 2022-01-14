package com.cesario.dsmovie.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cesario.dsmovie.dto.MovieDTO;
import com.cesario.dsmovie.entities.Movie;
import com.cesario.dsmovie.repositories.MovieRepository;

@Service
public class MovieService {

	@Autowired
	private MovieRepository repository;
	
	@Transactional(readOnly = true)
	public Page<MovieDTO> findAll(Pageable pageable) {
		Page<Movie> entities = repository.findAll(pageable);
		
		Page<MovieDTO> moviesToReturn = entities.map(x -> new MovieDTO(x));
		
		return moviesToReturn;
	}
	
	@Transactional(readOnly = true)
	public MovieDTO findById(Long id) {
		Movie movie = repository.findById(id).get();
		
		MovieDTO movieDTO = new MovieDTO(movie);
		
		return movieDTO;
	}
}
