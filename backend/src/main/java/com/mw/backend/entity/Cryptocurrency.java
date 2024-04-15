package com.mw.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "cryptocurrencies")
@Getter @Setter
@NoArgsConstructor
public class Cryptocurrency {

    @Id @GeneratedValue
    private UUID id;
    @NotBlank
    private String name;
    @NotBlank
    private String symbol;
    @NotNull @PositiveOrZero
    private Long circulating_supply;
    @NotNull @Positive
    private Long total_supply;

    public Cryptocurrency(String name, String symbol, Long circulating_supply, Long total_supply) {
        this.name = name;
        this.symbol = symbol;
        this.circulating_supply = circulating_supply;
        this.total_supply = total_supply;
    }

    @AssertTrue(message = "Circulating supply must be less than or equal to total supply")
    private boolean isValidSupply() {
        return circulating_supply.compareTo(total_supply) <= 0;
    }
}
