package com.joaouchoa.ecommerce_backend.service;

import com.joaouchoa.ecommerce_backend.dto.ProductRequestDTO;
import com.joaouchoa.ecommerce_backend.dto.ProductResponseDTO;
import com.joaouchoa.ecommerce_backend.model.Product;
import com.joaouchoa.ecommerce_backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<ProductResponseDTO> findAll() {
        return productRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public ProductResponseDTO findById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com id: " + id));
        return toResponseDTO(product);
    }

    public ProductResponseDTO create(ProductRequestDTO requestDTO) {
        Product product = toEntity(requestDTO);
        Product savedProduct = productRepository.save(product);
        return toResponseDTO(savedProduct);
    }

    public ProductResponseDTO update(Long id, ProductRequestDTO requestDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com id: " + id));

        product.setName(requestDTO.getName());
        product.setBarcode(requestDTO.getBarcode());
        product.setPrice(requestDTO.getPrice());

        Product updatedProduct = productRepository.save(product);
        return toResponseDTO(updatedProduct);
    }

    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Produto não encontrado com id: " + id);
        }
        productRepository.deleteById(id);
    }
    private ProductResponseDTO toResponseDTO(Product product) {
        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getBarcode(),
                product.getPrice()
        );
    }

    private Product toEntity(ProductRequestDTO requestDTO) {
        Product product = new Product();
        product.setName(requestDTO.getName());
        product.setBarcode(requestDTO.getBarcode());
        product.setPrice(requestDTO.getPrice());
        return product;
    }
}




