package net.hicks.recipe.beans;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table
public class Ingredient implements Serializable
{
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String quantity;
    private String unit;

    public Ingredient()
    {
    }

    @Override
    public boolean equals(Object obj)
    {
        if (!(obj instanceof Ingredient)) return false;
        Ingredient that = (Ingredient) obj;
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

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getQuantity()
    {
        return quantity;
    }

    public void setQuantity(String quantity)
    {
        this.quantity = quantity;
    }

    public String getUnit()
    {
        return unit;
    }

    public void setUnit(String unit)
    {
        this.unit = unit;
    }
}
