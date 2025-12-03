package com.joaouchoa.ecommerce_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestDTO {
    @NotBlank(message = "O nome do produto é obrigatório")
    private String name;

    @NotBlank(message = "O código de barras é obrigatório")
    private String barcode;

    @Positive(message = "O preço deve ser maior que zero")
    private BigDecimal price;

}
