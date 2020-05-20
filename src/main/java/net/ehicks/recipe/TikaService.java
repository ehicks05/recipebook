package net.ehicks.recipe;

import org.apache.tika.Tika;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

@Service
public class TikaService
{
    private static final Logger log = LoggerFactory.getLogger(TikaService.class);

    private Tika tika;

    public TikaService()
    {
        this.tika = new Tika();
    }

    public MediaType getMediaType(byte[] bytes, String name)
    {
        return getMediaType(new ByteArrayInputStream(bytes), name);
    }

    public MediaType getMediaType(InputStream inputStream, String name)
    {
        return MediaType.parseMediaType(detect(inputStream, name));
    }

    public String detect(byte[] bytes, String name)
    {
        return detect(new ByteArrayInputStream(bytes), name);
    }

    public String detect(InputStream inputStream, String name)
    {
        try
        {
            return tika.detect(inputStream, name);
        }
        catch (Exception e)
        {
            log.error(e.getLocalizedMessage());
        }
        return "APPLICATION_OCTET_STREAM";
    }
}
