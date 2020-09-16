package net.hicks.recipe.beans;

public class RecipeBookException extends RuntimeException{

    private final int errorCode;
    private final String clientMessage;
    private final String details;

    public RecipeBookException(int errorCode, String details) {
        super(details);
        this.errorCode = errorCode;
        this.details = details;
        this.clientMessage = ErrorCodes.ERROR_CODES.get(errorCode);
    }

    public RecipeBookException(int errorCode, String details, Throwable e) {
        super(details, e);
        this.errorCode = errorCode;
        this.details = details;
        this.clientMessage = ErrorCodes.ERROR_CODES.get(errorCode);
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
}
