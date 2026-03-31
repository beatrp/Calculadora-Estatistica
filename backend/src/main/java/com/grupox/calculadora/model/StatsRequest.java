package com.grupox.calculadora.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class StatsRequest {

    @NotEmpty(message = "A lista de dados nao pode estar vazia.")
    private List<@NotNull(message = "Todos os valores devem ser numericos.") Double> data;

    public List<Double> getData() {
        return data;
    }

    public void setData(List<Double> data) {
        this.data = data;
    }
}
