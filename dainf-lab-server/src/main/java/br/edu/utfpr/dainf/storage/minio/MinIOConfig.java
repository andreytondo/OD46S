package br.edu.utfpr.dainf.storage.minio;

import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinIOConfig {

    @Value("${storage.url}")
    private String url;

    @Value("${storage.access.key}")
    private String accessKey;

    @Value("${storage.access.secret}")
    private String accessSecret;

    // @Value("${storage.secure}")
    // private boolean secure;

    // @Value("${storage.port}")
    // private Integer port;

    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder()
                .endpoint(url)
                .credentials(accessKey, accessSecret)
                .build();
    }
}