package com.fullstack.crudspring.controller;

import com.fullstack.crudspring.repository.CursoRepository;
import com.fullstack.crudspring.model.Curso;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/cursos")
@AllArgsConstructor
public class CursoController {

    private CursoRepository cursoRepository;

    @GetMapping
    public List<Curso> listar(){
        return cursoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> findById(@PathVariable Long id){
        return cursoRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curso> update(@PathVariable Long id, @RequestBody Curso curso){
        return cursoRepository.findById(id)
                .map(record -> {
                    record.setNome(curso.getNome());
                    record.setCategoria(curso.getCategoria());
                    Curso update = cursoRepository.save(record);
                    return ResponseEntity.ok().body(update);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    //@ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<Curso> criar(@RequestBody Curso curso){
       // System.out.println(curso.getNome());
      //  System.out.println(curso.getCategoria());
        return ResponseEntity.status(HttpStatus.CREATED).body(cursoRepository.save(curso));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        return cursoRepository.findById(id)
                .map(record -> {
                    cursoRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
