package br.edu.utfpr.dainf.storage.minio;

import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinIOConfig {

    @Value("${storage.url:http://localhost:9000}")
    private String url;

    @Value("${storage.access.key:admin}")
    private String accessKey;

    @Value("${storage.access.secret:minio123}")
    private String accessSecret;

    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder()
                .endpoint(url)
                .credentials(accessKey, accessSecret)
                .build();
    }
}