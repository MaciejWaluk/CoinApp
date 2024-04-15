package com.mw.backend.controller;

import com.mw.backend.service.CryptocurrencyService;
import com.mw.backend.viewmodel.CryptocurrencyViewmodel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/Cryptocurrencies")
public class CryptocurrencyController {

    private final CryptocurrencyService cryptocurrencyService;

    public CryptocurrencyController(CryptocurrencyService cryptocurrencyService) {
        this.cryptocurrencyService = cryptocurrencyService;
    }

    @GetMapping
    public List<CryptocurrencyViewmodel> getAllCryptocurrencies() {
        return cryptocurrencyService.getAllCryptocurrencies();
    }

    @GetMapping("/{id}")
    public CryptocurrencyViewmodel getCryptocurrencyById(
            @PathVariable UUID id
    ) {
        return cryptocurrencyService.getCryptocurrencyById(id);
    }

    @PostMapping
    public CryptocurrencyViewmodel addCryptocurrency(
            @RequestBody CryptocurrencyViewmodel cvm
    ) {
        return cryptocurrencyService.addCryptocurrency(cvm);
    }

    @PutMapping
    public CryptocurrencyViewmodel updateCryptocurrency(
            @RequestBody CryptocurrencyViewmodel cvm
    ) {
        return cryptocurrencyService.updateCryptocurrency(cvm);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCryptocurrency(
            @PathVariable UUID id
    ) {
        cryptocurrencyService.deleteCryptocurrency(id);
        return ResponseEntity.ok("Cryptocurrency deleted");
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }


}
