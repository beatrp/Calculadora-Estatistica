package com.grupox.calculadora.service;

import com.grupox.calculadora.exception.InvalidDataException;
import com.grupox.calculadora.model.FrequencyItem;
import com.grupox.calculadora.model.StatsRequest;
import com.grupox.calculadora.model.StatsResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatsService {

    public StatsResponse calculate(StatsRequest request) {
        List<Double> data = request.getData();
        validateData(data);

        List<Double> sorted = data.stream()
                .sorted()
                .toList();

        double mean = calculateMean(sorted);
        double median = calculateMedian(sorted);
        List<FrequencyItem> frequency = calculateFrequency(sorted);
        List<Double> mode = calculateMode(frequency);
        double amplitude = sorted.get(sorted.size() - 1) - sorted.get(0);
        double stdDev = calculatePopulationStdDev(sorted, mean);

        return new StatsResponse(mean, median, mode, amplitude, stdDev, frequency);
    }

    private void validateData(List<Double> data) {
        if (data == null || data.isEmpty()) {
            throw new InvalidDataException("A lista de dados nao pode estar vazia.");
        }

        boolean hasInvalidNumber = data.stream().anyMatch(value -> value == null || value.isNaN() || value.isInfinite());
        if (hasInvalidNumber) {
            throw new InvalidDataException("A lista deve conter apenas numeros validos.");
        }
    }

    private double calculateMean(List<Double> data) {
        return data.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
    }

    private double calculateMedian(List<Double> sorted) {
        int size = sorted.size();
        int middle = size / 2;

        if (size % 2 == 0) {
            return (sorted.get(middle - 1) + sorted.get(middle)) / 2.0;
        }

        return sorted.get(middle);
    }

    private List<FrequencyItem> calculateFrequency(List<Double> sorted) {
        Map<Double, Long> counts = new LinkedHashMap<>();

        for (Double value : sorted) {
            counts.put(value, counts.getOrDefault(value, 0L) + 1L);
        }

        return counts.entrySet()
                .stream()
                .map(entry -> new FrequencyItem(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    private List<Double> calculateMode(List<FrequencyItem> frequency) {
        long maxCount = frequency.stream()
                .map(FrequencyItem::getCount)
                .max(Comparator.naturalOrder())
                .orElse(0L);

        List<Double> modes = frequency.stream()
                .filter(item -> item.getCount() == maxCount)
                .map(FrequencyItem::getValue)
                .collect(Collectors.toCollection(ArrayList::new));

        return modes;
    }

    private double calculatePopulationStdDev(List<Double> data, double mean) {
        double variance = data.stream()
                .mapToDouble(value -> Math.pow(value - mean, 2))
                .average()
                .orElse(0.0);

        return Math.sqrt(variance);
    }
}
