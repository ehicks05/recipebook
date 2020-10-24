package net.hicks.recipe.beans;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table
@EntityListeners(AuditingEntityListener.class)
public class Emoji {

    @Id
    private String slug = "";
    private String character = "";
    private String codePoint = "";
    private String unicodeName = "";
    @Column(name = "emojiGroup")
    private String group = "";
    private String subGroup = "";

    public Emoji() {

    }

    @Override
    public String toString() {
        return "Emoji{" +
                "slug='" + slug + '\'' +
                ", character='" + character + '\'' +
                ", codePoint='" + codePoint + '\'' +
                ", group='" + group + '\'' +
                ", subGroup='" + subGroup + '\'' +
                '}';
    }



    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getCharacter() {
        return character;
    }

    public void setCharacter(String character) {
        this.character = character;
    }

    public String getCodePoint() {
        return codePoint;
    }

    public void setCodePoint(String codePoint) {
        this.codePoint = codePoint;
    }

    public String getUnicodeName() {
        return unicodeName;
    }

    public void setUnicodeName(String unicodeName) {
        this.unicodeName = unicodeName;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getSubGroup() {
        return subGroup;
    }

    public void setSubGroup(String subGroup) {
        this.subGroup = subGroup;
    }
}
