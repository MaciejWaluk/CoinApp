package com.mw.backend.utils;

import com.mw.backend.entity.Cryptocurrency;
import com.mw.backend.viewmodel.CryptocurrencyViewmodel;
import org.springframework.stereotype.Component;

@Component
public class CryptocurrencyMapper {

    public CryptocurrencyViewmodel mapToViewmodel(Cryptocurrency c) {
        return new CryptocurrencyViewmodel(
                c.getId(),
                c.getName(),
                c.getSymbol(),
                c.getCirculating_supply(),
                c.getTotal_supply()
        );
    }

    public Cryptocurrency mapToEntity(CryptocurrencyViewmodel cvm) {
        return new Cryptocurrency(
                cvm.name(),
                cvm.symbol(),
                cvm.circulating_supply(),
                cvm.total_supply()
        );
    }
}
