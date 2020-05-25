package net.hicks.recipe.util;

import net.coobird.thumbnailator.Thumbnails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class CommonIO
{
    private static final Logger log = LoggerFactory.getLogger(CommonIO.class);

    public static byte[] getThumbnail(InputStream inputStream) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try
        {
            Thumbnails.of(inputStream)
                    .size(160, 160)
                    .toOutputStream(byteArrayOutputStream);
        }
        catch (IOException e) {
            log.error(e.getLocalizedMessage());
        }

        return byteArrayOutputStream.toByteArray();
    }
}
