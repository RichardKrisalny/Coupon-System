package app.core.services;

import org.apache.tomcat.util.http.fileupload.FileItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ImageSevice {
    @Value("${file.upload.dir}")
    private String downLoadDir;
    private Path path;
    @PostConstruct
    public void  init(){
        this.path= Paths.get(downLoadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(path);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public String storeFile(MultipartFile file){
        UUID uuid = UUID.randomUUID();
        String fileName = uuid+".jpg";
        if(fileName.contains("..")){
            throw new RuntimeException("invalid file name" + fileName);
        }
       Path targetLocation = this.path.resolve(fileName);
        try {
            Files.copy(file.getInputStream(),targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


private String uploadPath ="src/main/resources/static/images/";
    public Resource loadImage(String filename)  {
        Path file = Paths.get(uploadPath + filename);
        Resource resource = null;
        try {
            resource = new UrlResource(file.toUri());
        } catch (MalformedURLException e) {
            throw new RuntimeException("can't load image" + e);
        }
        if (resource.exists() || resource.isReadable()) {
            return resource;
        } else {
            file = Paths.get(uploadPath + "coupon-main.jpg");
            try {
                resource = new UrlResource(file.toUri());
            } catch (MalformedURLException e) {
                throw new RuntimeException("can't load image"+e);
            }
            return resource;
        }
    }
    public void deleteImage(String filename)  {
        File fileToDelete = new File(uploadPath + filename);
        fileToDelete.delete();
    }
}
