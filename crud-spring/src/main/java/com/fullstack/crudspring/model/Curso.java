package com.fullstack.crudspring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Data //substitui tudo - getter/setter/hascode...
@Entity
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @Column(length = 200, nullable = false) //a coluna não aceita valores nulos
    private String nome;

    @Column(length = 10, nullable = false)
    private String categoria;
}
