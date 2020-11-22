package net.hicks.recipe.config;

import net.hicks.recipe.config.ErrorCodes;
import org.springframework.http.HttpStatus;

public class RecipeBookException extends RuntimeException{

    private final int errorCode;
    private final String clientMessage;
    private final String details;
    private final HttpStatus status;

    public RecipeBookException(int errorCode, String details) {
        super(details);
        this.errorCode = errorCode;
        this.details = details;
        this.clientMessage = ErrorCodes.ERROR_CODES.get(errorCode);
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public RecipeBookException(int errorCode, String details, Throwable e) {
        super(details, e);
        this.errorCode = errorCode;
        this.details = details;
        this.clientMessage = ErrorCodes.ERROR_CODES.get(errorCode);
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public RecipeBookException(int errorCode, String details, HttpStatus status) {
        super(details);
        this.errorCode = errorCode;
        this.details = details;
        this.clientMessage = ErrorCodes.ERROR_CODES.get(errorCode);
        this.status = status;
    }

    @Override
    public String toString() {
        return String.format("ERROR - %d.  %s.  %s", errorCode, clientMessage, details);
    }

    public int getErrorCode() {
        return errorCode;
    }

    public String getClientMessage() {
        return clientMessage;
    }

    public String getDetails() {
        return details;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
