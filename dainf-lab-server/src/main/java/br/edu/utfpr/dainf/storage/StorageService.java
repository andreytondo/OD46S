package br.edu.utfpr.dainf.storage;

public interface StorageService {

    /**
     * Generates a signed URL for accessing a file.
     */
    String getSignedUrl(String bucketName, String objectName, int expirationInSeconds, String method);

    /**
     * Moves a file from a temporary folder to a permanent folder.
     * Each bucket has a temporary folder inside it.
     */
    void moveToPermanentFolder(String bucket, String oldObjectName, String newObjectName);
}