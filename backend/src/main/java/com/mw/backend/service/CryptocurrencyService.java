package com.mw.backend.service;

import com.mw.backend.entity.Cryptocurrency;
import com.mw.backend.repository.CryptocurrencyRepository;
import com.mw.backend.utils.CryptocurrencyMapper;
import com.mw.backend.viewmodel.CryptocurrencyViewmodel;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.UUID;

@Service
public class CryptocurrencyService {

    private final CryptocurrencyRepository cryptocurrencyRepository;
    private final CryptocurrencyMapper cryptocurrencyMapper;

    public CryptocurrencyService(
            CryptocurrencyRepository cryptocurrencyRepository,
            CryptocurrencyMapper cryptocurrencyMapper
    ) {
        this.cryptocurrencyRepository = cryptocurrencyRepository;
        this.cryptocurrencyMapper = cryptocurrencyMapper;
    }

    public List<CryptocurrencyViewmodel> getAllCryptocurrencies() {
        return cryptocurrencyRepository.findAll().stream()
                .map(this.cryptocurrencyMapper::mapToViewmodel)
                .toList();
    }

    public CryptocurrencyViewmodel getCryptocurrencyById(UUID id) {
        return cryptocurrencyRepository.findById(id)
                .map(this.cryptocurrencyMapper::mapToViewmodel)
                .orElseThrow(() -> new RuntimeException("Cryptocurrency not found"));
    }

    public CryptocurrencyViewmodel addCryptocurrency(CryptocurrencyViewmodel cvm) {

        Cryptocurrency c = this.cryptocurrencyMapper.mapToEntity(cvm);
        return cryptocurrencyMapper.mapToViewmodel(this.cryptocurrencyRepository.save(c));

    }

    public CryptocurrencyViewmodel updateCryptocurrency(CryptocurrencyViewmodel cvm) {

        if(this.cryptocurrencyRepository.findById(cvm.id()).isEmpty()) {
            throw new RuntimeException("Cryptocurrency not found");
        }

        Cryptocurrency c = this.cryptocurrencyMapper.mapToEntity(cvm);
        return cryptocurrencyMapper.mapToViewmodel(this.cryptocurrencyRepository.save(c));
    }

    public void deleteCryptocurrency(UUID id) {
        this.cryptocurrencyRepository.deleteById(id);
    }


}
