package com.patientportal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.patientportal.backend.entity.Document;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    Document findByFilename(String filename);

}
