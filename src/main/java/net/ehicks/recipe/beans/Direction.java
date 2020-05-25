package net.ehicks.recipe.beans;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table
public class Direction implements Serializable
{
    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 1024)
    private String text;

    @ManyToOne
    private Unit unit;

    public Direction()
    {
    }

    @Override
    public boolean equals(Object obj)
    {
        if (!(obj instanceof Direction)) return false;
        Direction that = (Direction) obj;
        return this.id.equals(that.getId());
    }

    @Override
    public int hashCode()
    {
        return 17 * 37 * id.intValue();
    }

    public String toString()
    {
        return this.getClass().getSimpleName() + ":" + id;
    }

    // -------- Getters / Setters ----------

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getText()
    {
        return text;
    }

    public void setText(String text)
    {
        this.text = text;
    }

    public Unit getUnit()
    {
        return unit;
    }

    public void setUnit(Unit unit)
    {
        this.unit = unit;
    }
}
