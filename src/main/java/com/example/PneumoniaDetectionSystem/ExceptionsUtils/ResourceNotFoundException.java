package com.example.PneumoniaDetectionSystem.ExceptionsUtils;

public class ResourceNotFoundException extends Exception{

    public ResourceNotFoundException() {

    }

    public ResourceNotFoundException(String msg) {
        super(msg);
    }
}
