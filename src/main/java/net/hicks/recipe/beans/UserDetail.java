package net.hicks.recipe.beans;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class UserDetail implements Serializable
{
    @Id
    private Long id;

    @MapsId
    @OneToOne
    @JoinColumn(name = "id")
    @JsonIgnore
    private User user;

    @Override
    public boolean equals(Object obj)
    {
        if (!(obj instanceof UserDetail)) return false;
        UserDetail that = (UserDetail) obj;
        return this.id.equals(that.getId());
    }

    @Override
    public int hashCode()
    {
        return id.hashCode();
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

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }
}
