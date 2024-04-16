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
                c.getCirculatingSupply(),
                c.getTotalSupply()
        );
    }

    public Cryptocurrency mapToEntityCreated(CryptocurrencyViewmodel cvm) {
        return new Cryptocurrency(
                cvm.name(),
                cvm.symbol(),
                cvm.circulatingSupply(),
                cvm.totalSupply()
        );
    }

    public Cryptocurrency mapToEntityUpdated(CryptocurrencyViewmodel cvm) {
        return new Cryptocurrency(
                cvm.id(),
                cvm.name(),
                cvm.symbol(),
                cvm.circulatingSupply(),
                cvm.totalSupply()
        );
    }
}
