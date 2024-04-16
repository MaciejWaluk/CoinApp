package com.mw.backend.service;

import com.mw.backend.entity.Cryptocurrency;
import com.mw.backend.repository.CryptocurrencyRepository;
import com.mw.backend.utils.CryptocurrencyMapper;
import com.mw.backend.viewmodel.CryptocurrencyViewmodel;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Valid;
import jakarta.validation.Validator;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@Validated
public class CryptocurrencyService {

    private final CryptocurrencyRepository cryptocurrencyRepository;
    private final CryptocurrencyMapper cryptocurrencyMapper;
    private final Validator validator;

    public CryptocurrencyService(
            CryptocurrencyRepository cryptocurrencyRepository,
            CryptocurrencyMapper cryptocurrencyMapper,
            LocalValidatorFactoryBean validatorFactoryBean
    ) {
        this.cryptocurrencyRepository = cryptocurrencyRepository;
        this.cryptocurrencyMapper = cryptocurrencyMapper;
        this.validator = validatorFactoryBean.getValidator();
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

    public CryptocurrencyViewmodel addCryptocurrency(@Valid CryptocurrencyViewmodel cvm) {

        Cryptocurrency c = this.cryptocurrencyMapper.mapToEntityCreated(cvm);
        this.validateEntity(c);
        return cryptocurrencyMapper.mapToViewmodel(this.cryptocurrencyRepository.save(c));

    }

    public CryptocurrencyViewmodel updateCryptocurrency(UUID id, @Valid CryptocurrencyViewmodel cvm) {

        if(this.cryptocurrencyRepository.findById(id).isEmpty()) {
            throw new RuntimeException("Cryptocurrency not found");
        }

        Cryptocurrency c = this.cryptocurrencyMapper.mapToEntityUpdated(cvm);
        this.validateEntity(c);
        return cryptocurrencyMapper.mapToViewmodel(this.cryptocurrencyRepository.save(c));
    }

    public void deleteCryptocurrency(UUID id) {
        this.cryptocurrencyRepository.deleteById(id);
    }

    private void validateEntity(Cryptocurrency c) {
        Set<ConstraintViolation<Cryptocurrency>> violations = this.validator.validate(c);

        if(!violations.isEmpty()) {
            throw new IllegalArgumentException(violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .toList()
                    .toString());
        }
    }


}
