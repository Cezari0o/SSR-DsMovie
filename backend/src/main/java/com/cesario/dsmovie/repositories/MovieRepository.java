package com.cesario.dsmovie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cesario.dsmovie.entities.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {

}
