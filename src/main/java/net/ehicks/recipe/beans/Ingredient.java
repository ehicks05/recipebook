package net.ehicks.recipe.beans;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table
public class Ingredient implements Serializable
{
    @Id
    private Long id = 1L;

    private String name;
    private int quantity;

    @ManyToOne
    private Unit unit;

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
}
