package br.edu.utfpr.dainf.storage;

public interface StorageService {

    /**
     * Generates a signed URL for accessing a file.
     */
    String getSignedUrl(String bucketName, String objectName, int expirationInSeconds, String method);
}