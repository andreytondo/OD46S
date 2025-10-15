package br.edu.utfpr.dainf.storage.minio;

import br.edu.utfpr.dainf.exception.StorageException;
import br.edu.utfpr.dainf.storage.StorageService;
import io.minio.*;
import io.minio.http.Method;
import org.springframework.stereotype.Service;

@Service
public class MinIOStorageService implements StorageService {

    private final MinioClient minioClient;

    public MinIOStorageService(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    @Override
    public String getSignedUrl(String bucketName, String objectName, int expirationInSeconds, String method) {
        try {
            Method minioMethod = Method.valueOf(method);
            if (minioMethod == Method.POST || minioMethod == Method.PUT) {
                ensureBucketExists(bucketName);
            }
            GetPresignedObjectUrlArgs args = GetPresignedObjectUrlArgs.builder()
                    .method(minioMethod)
                    .bucket(bucketName)
                    .object(objectName)
                    .expiry(expirationInSeconds)
                    .build();

            return minioClient.getPresignedObjectUrl(args);
        } catch (Exception e) {
            throw new StorageException("Failed to generate signed URL for MinIO object");
        }
    }

    @Override
    public void moveToPermanentFolder(String bucket, String oldObjectName, String newObjectName) {
        try {
            CopyObjectArgs copyArgs = CopyObjectArgs.builder()
                    .source(CopySource.builder().bucket(bucket).object(oldObjectName).build())
                    .bucket(bucket)
                    .object(newObjectName)
                    .build();
            minioClient.copyObject(copyArgs);

            RemoveObjectArgs removeArgs = RemoveObjectArgs.builder()
                    .bucket(bucket)
                    .object(oldObjectName)
                    .build();
            minioClient.removeObject(removeArgs);
        } catch (Exception e) {
            throw new StorageException("Failed to move object in MinIO");
        }
    }

    private void ensureBucketExists(String bucketName) {
        try {
            boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
            if (!found) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
            }
        } catch (Exception e) {
            throw new StorageException("Failed to ensure bucket exists in MinIO");
        }
    }
}