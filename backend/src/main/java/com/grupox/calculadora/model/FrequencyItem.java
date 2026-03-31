package com.grupox.calculadora.model;

public class FrequencyItem {

    private final double value;
    private final long count;

    public FrequencyItem(double value, long count) {
        this.value = value;
        this.count = count;
    }

    public double getValue() {
        return value;
    }

    public long getCount() {
        return count;
    }
}
