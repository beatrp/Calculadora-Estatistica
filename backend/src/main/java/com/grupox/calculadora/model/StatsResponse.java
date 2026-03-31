package com.grupox.calculadora.model;

import java.util.List;

public class StatsResponse {

    private final double mean;
    private final double median;
    private final List<Double> mode;
    private final double amplitude;
    private final double stdDev;
    private final List<FrequencyItem> frequency;

    public StatsResponse(double mean,
                         double median,
                         List<Double> mode,
                         double amplitude,
                         double stdDev,
                         List<FrequencyItem> frequency) {
        this.mean = mean;
        this.median = median;
        this.mode = mode;
        this.amplitude = amplitude;
        this.stdDev = stdDev;
        this.frequency = frequency;
    }

    public double getMean() {
        return mean;
    }

    public double getMedian() {
        return median;
    }

    public List<Double> getMode() {
        return mode;
    }

    public double getAmplitude() {
        return amplitude;
    }

    public double getStdDev() {
        return stdDev;
    }

    public List<FrequencyItem> getFrequency() {
        return frequency;
    }
}
