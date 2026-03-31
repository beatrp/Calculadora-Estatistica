package com.grupox.calculadora.controller;

import com.grupox.calculadora.model.StatsRequest;
import com.grupox.calculadora.model.StatsResponse;
import com.grupox.calculadora.service.StatsService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @PostMapping
    public StatsResponse calculate(@Valid @RequestBody StatsRequest request) {
        return statsService.calculate(request);
    }
}
