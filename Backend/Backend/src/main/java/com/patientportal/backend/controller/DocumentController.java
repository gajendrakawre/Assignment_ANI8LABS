package com.patientportal.backend.controller;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.patientportal.backend.entity.Document;
import com.patientportal.backend.repository.DocumentRepository;

@RestController
@RequestMapping("/documents")
public class DocumentController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private DocumentRepository documentRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty.");
        }

        try {
            File dir = new File(uploadDir);
            if (!dir.exists())
                dir.mkdirs();

            String filename = file.getOriginalFilename();
            String path = dir.getAbsolutePath() + File.separator + filename;
            file.transferTo(new File(path));

            Document doc = new Document();
            doc.setFilename(filename);
            doc.setSize(file.getSize());
            doc.setPath(path);

            Document saved = documentRepository.save(doc);
            return ResponseEntity.ok(saved);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> listDocuments() {
        return ResponseEntity.ok(documentRepository.findAll());
    }

@DeleteMapping("/{id}")
public ResponseEntity<?> deleteFileById(@PathVariable Long id) {
    // Find the document by ID
    Optional<Document> optionalDoc = documentRepository.findById(id);
    if (optionalDoc.isEmpty()) {
        return ResponseEntity.status(404).body(
                Map.of("status", "error", "message", "Document not found."));
    }

    Document doc = optionalDoc.get();

    // Delete the file from the filesystem
    File file = new File(doc.getPath());
    boolean fileDeleted = file.exists() && file.delete();

    // Remove from database
    documentRepository.delete(doc);

    // Return response
    if (fileDeleted) {
        return ResponseEntity.ok(
                Map.of("status", "success", "message", "File deleted."));
    } else {
        return ResponseEntity.ok(
                Map.of("status", "warning", "message", "Record deleted, but file was missing."));
    }
}

    @GetMapping("/{id}")
public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {
    Document doc = documentRepository.findById(id).orElse(null);
    if (doc == null) {
        return ResponseEntity.status(404).body(null);
    }

    File file = new File(doc.getPath());
    if (!file.exists()) {
        return ResponseEntity.status(404).body(null);
    }

    Resource resource = new FileSystemResource(file);
    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getFilename() + "\"")
        .contentType(MediaType.APPLICATION_OCTET_STREAM)
        .body(resource);
}

}
