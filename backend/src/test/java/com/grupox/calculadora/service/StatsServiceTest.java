package com.grupox.calculadora.service;

import com.grupox.calculadora.model.StatsRequest;
import com.grupox.calculadora.model.StatsResponse;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

class StatsServiceTest {

    private final StatsService statsService = new StatsService();

    @Test
    void shouldCalculateStatisticsCorrectly() {
        StatsRequest request = new StatsRequest();
        request.setData(List.of(1.0, 2.0, 2.0, 4.0));

        StatsResponse response = statsService.calculate(request);

        Assertions.assertEquals(2.25, response.getMean());
        Assertions.assertEquals(2.0, response.getMedian());
        Assertions.assertEquals(List.of(2.0), response.getMode());
        Assertions.assertEquals(3.0, response.getAmplitude());
        Assertions.assertEquals(Math.sqrt(1.1875), response.getStdDev());
        Assertions.assertEquals(3, response.getFrequency().size());
    }
}
