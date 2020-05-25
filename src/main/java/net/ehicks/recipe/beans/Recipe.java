package net.ehicks.recipe.beans;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table
public class Recipe implements Serializable
{
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String emoji;
    private String description;
    private int difficulty;
    private String cookingTime;
    private int servings;

    @ManyToMany
    private List<Ingredient> ingredients;

    @ManyToMany
    private List<Direction> directions;

    public Recipe()
    {
    }

    @Override
    public boolean equals(Object obj)
    {
        if (!(obj instanceof User)) return false;
        User that = (User) obj;
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

    public void setName(String title)
    {
        this.name = title;
    }

    public String getEmoji()
    {
        return emoji;
    }

    public void setEmoji(String emoji)
    {
        this.emoji = emoji;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public int getDifficulty()
    {
        return difficulty;
    }

    public void setDifficulty(int difficulty)
    {
        this.difficulty = difficulty;
    }

    public String getCookingTime()
    {
        return cookingTime;
    }

    public void setCookingTime(String cookingTime)
    {
        this.cookingTime = cookingTime;
    }

    public List<Ingredient> getIngredients()
    {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients)
    {
        this.ingredients = ingredients;
    }

    public List<Direction> getDirections()
    {
        return directions;
    }

    public void setDirections(List<Direction> directions)
    {
        this.directions = directions;
    }

    public int getServings()
    {
        return servings;
    }

    public void setServings(int servings)
    {
        this.servings = servings;
    }
}
