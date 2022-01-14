package com.cesario.dsmovie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cesario.dsmovie.entities.Score;
import com.cesario.dsmovie.entities.ScorePK;

public interface ScoreRepository extends JpaRepository<Score, ScorePK> {

}
