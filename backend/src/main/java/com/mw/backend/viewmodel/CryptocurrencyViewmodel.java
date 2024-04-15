package com.mw.backend.viewmodel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.UUID;

public record CryptocurrencyViewmodel(
        UUID id,
        @NotBlank String name,
        @NotBlank String symbol,
        @NotNull @PositiveOrZero long circulating_supply,
        @NotNull @Positive long total_supply
) {
}
