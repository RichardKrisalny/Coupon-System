package app.core.controllers;

import app.core.services.ImageSevice;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@CrossOrigin
@RestController
public class ImageController {
    @Autowired
    private ImageSevice imageSevice;
    @PostMapping("/addImage")
    public String uploadImage(@RequestParam MultipartFile file){
        return imageSevice.storeFile(file);
    }

        @GetMapping("/{filename:.+}")
        public ResponseEntity<Resource> getImage(@PathVariable String filename) {
            Resource file = imageSevice.loadImage(filename);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        }
    }



