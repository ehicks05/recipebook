package net.hicks.recipe.config;

import java.util.HashMap;
import java.util.Map;

public class ErrorCodes {

    final public static Map<Integer, String> ERROR_CODES = new HashMap<>();

    static {

        ERROR_CODES.put(10, "DATA_ERROR");
        ERROR_CODES.put(20, "AUTHENTICATION_ERROR");
        ERROR_CODES.put(30, "SIGNUP_ERROR");
    }
}
