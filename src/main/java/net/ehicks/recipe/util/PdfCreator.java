package net.ehicks.recipe.util;

import be.quodlibet.boxable.BaseTable;
import be.quodlibet.boxable.Cell;
import be.quodlibet.boxable.Row;
import org.apache.pdfbox.io.MemoryUsageSetting;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.PDPageTree;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class PdfCreator
{
    private static final Logger log = LoggerFactory.getLogger(PdfCreator.class);
    private static PDFont HELVETICA = PDType1Font.HELVETICA;

    public static OutputStream createPdf(String author, String header, String footer, List<List<Object>> data)
    {
        try
        {
            PDDocument document = new PDDocument(MemoryUsageSetting.setupMixed(1*1024*1024));
            document.getDocumentInformation().setAuthor(author);
            document.getDocumentInformation().setCreationDate(Calendar.getInstance());
            document.getDocumentInformation().setTitle(header);
            document.getDocumentInformation().setSubject("Report");
            
            PDPage page = new PDPage();
            document.addPage(page);

            PDPageContentStream contentStream = new PDPageContentStream(document, page);
            addTable(document, page, header, data);

            contentStream.close();

            int fontSize = 10;
            addHeader(document, header, fontSize);
            addFooter(document, footer, fontSize);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            document.save(byteArrayOutputStream);
            document.close();
            return byteArrayOutputStream;
        }
        catch (IOException e)
        {
            log.error(e.getMessage(), e);
        }

        return null;
    }

    private static void addTable(PDDocument document, PDPage page, String title, List<List<Object>> data) throws IOException
    {
        float height = page.getMediaBox().getHeight() - 60;
        BaseTable table = new BaseTable(height, height, 40, page.getMediaBox().getWidth() - 80, 40, document, page, true, true);
        Color headerColor = new Color(221, 221, 221);

        // Create Header row
        Row<PDPage> headerRow = table.createRow(15f);
        Cell<PDPage> cell = headerRow.createCell(100, title);
        cell.setFont(PDType1Font.HELVETICA_BOLD);
        cell.setFillColor(headerColor);
        table.addHeaderRow(headerRow);
        for (List<Object> dataRow : data)
        {
            Row<PDPage> row = table.createRow(10f);

            for (Object dataCell : dataRow)
            {
                String value = "";
                if (dataCell instanceof String) value = (String) dataCell;
                if (dataCell instanceof Date) value = ((Date)dataCell).toString();
                if (dataCell instanceof LocalDateTime) value = ((LocalDateTime)dataCell).format(DateTimeFormatter.ISO_LOCAL_DATE) + " " + ((LocalDateTime)dataCell).format(DateTimeFormatter.ofPattern("hh:mma"));
                if (dataCell instanceof Long) value = ((Long)dataCell).toString();
                float width = (float)100 / dataRow.size();
                cell = row.createCell(width, value);

                if (data.indexOf(dataRow) == 0)
                {
                    cell.setFont(PDType1Font.HELVETICA_BOLD);
                    cell.setFillColor(headerColor);
                }
            }
        }
        table.draw();
    }

    private static void addHeader(PDDocument document, String text, int fontSize) throws IOException
    {
        PDPageTree pages = document.getDocumentCatalog().getPages();

        for (int i = 0; i < pages.getCount(); i++)
        {
            PDPage page = pages.get(i);

            float titleWidth = HELVETICA.getStringWidth(text) / 1000 * fontSize;
            float titleHeight = HELVETICA.getFontDescriptor().getFontBoundingBox().getHeight() / 1000 * fontSize;

            float x = getCenter(page.getMediaBox().getWidth(), titleWidth);
            float y = page.getMediaBox().getHeight() - 20;

            PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true);

            printText(contentStream, text, x, y, fontSize);

            contentStream.setStrokingColor(Color.LIGHT_GRAY);
            contentStream.moveTo(40, y - titleHeight);
            contentStream.lineTo(page.getMediaBox().getWidth() - 40, y - titleHeight);
            contentStream.stroke();

            contentStream.close();
        }
    }

    private static void addFooter(PDDocument document, String content, int fontSize) throws IOException
    {
        PDPageTree pages = document.getDocumentCatalog().getPages();

        String date = new SimpleDateFormat("MM/dd/yyyy").format(new Date());

        for (int i = 0; i < pages.getCount(); i++)
        {
            PDPage page = pages.get(i);

            float x = 40;
            float y = 20;

            PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true);

            contentStream.setStrokingColor(Color.LIGHT_GRAY);
            contentStream.moveTo(40, 40);
            contentStream.lineTo(page.getMediaBox().getWidth() - 40, 40);
            contentStream.stroke();

            printText(contentStream, date, x, y, fontSize);

            float textWidth = HELVETICA.getStringWidth(content) / 1000 * fontSize;
            x = getCenter(page.getMediaBox().getWidth(), textWidth);
            y = 20;

            printText(contentStream, content, x, y, fontSize);

            String pageNumber = "Page " + (i+1) + " of " + pages.getCount();
            textWidth = HELVETICA.getStringWidth(pageNumber) / 1000 * fontSize;

            x = (page.getMediaBox().getWidth() - 40) - textWidth;
            y = 20;

            printText(contentStream, pageNumber, x, y, fontSize);
            contentStream.close();
        }
    }

    private static void printText(PDPageContentStream contentStream, String content, float x, float y, float fontSize) throws IOException
    {
        contentStream.beginText();
        contentStream.setFont(HELVETICA, fontSize);
        contentStream.newLineAtOffset(x, y);
        contentStream.showText(content);
        contentStream.endText();
    }

    private static float getCenter(float containerWidth, float itemWidth)
    {
        return (containerWidth / 2) - (itemWidth / 2);
    }
}
