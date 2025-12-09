package br.edu.utfpr.dainf.storage.minio;

import br.edu.utfpr.dainf.exception.StorageException;
import br.edu.utfpr.dainf.storage.StorageService;
import io.minio.*;
import io.minio.http.Method;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MinIOStorageService implements StorageService {

    private static final Logger LOGGER = Logger.getLogger(MinIOStorageService.class);

    private final MinioClient minioClient;
    private final String rootBucket;

    public MinIOStorageService(MinioClient minioClient, @Value("${storage.bucket}") String rootBucket) {
        this.minioClient = minioClient;
        this.rootBucket = rootBucket;
        ensureBucketExists(rootBucket);
    }

    @Override
    public String getSignedUrl(String bucketName, String objectName, int expirationInSeconds, String method) {
        try {
            Method minioMethod = Method.valueOf(method);
            String fullPath = bucketName + "/" + objectName;

            GetPresignedObjectUrlArgs args = GetPresignedObjectUrlArgs.builder()
                    .method(minioMethod)
                    .bucket(rootBucket)
                    .object(fullPath)
                    .expiry(expirationInSeconds)
                    .build();

            return minioClient.getPresignedObjectUrl(args);
        } catch (Exception e) {
            throw new StorageException("Failed to generate signed URL for MinIO object", e);
        }
    }

    @Override
    public void moveToPermanentFolder(String bucket, String oldObjectName, String newObjectName) {
        try {
            String oldPath = bucket + "/" + oldObjectName;
            String newPath = bucket + "/" + newObjectName;

            CopyObjectArgs copyArgs = CopyObjectArgs.builder()
                    .source(CopySource.builder().bucket(rootBucket).object(oldPath).build())
                    .bucket(rootBucket)
                    .object(newPath)
                    .build();
            minioClient.copyObject(copyArgs);

            minioClient.removeObject(RemoveObjectArgs.builder()
                    .bucket(rootBucket)
                    .object(oldPath)
                    .build());
        } catch (Exception e) {
            throw new StorageException("Failed to move object in MinIO", e);
        }
    }

    private void ensureBucketExists(String bucketName) {
        try {
            LOGGER.info("Ensuring MinIO bucket exists");
            if (!minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build())) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
            }
        } catch (Exception e) {
            LOGGER.error("Failed to ensure bucket exists in MinIO", e);
        }
    }
}