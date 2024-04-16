package com.mw.backend.repository;

import com.mw.backend.entity.Cryptocurrency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface CryptocurrencyRepository extends JpaRepository<Cryptocurrency, UUID>{

}
