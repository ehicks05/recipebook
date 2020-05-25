package net.hicks.recipe.beans;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table
public class MySystem implements Serializable
{
    @Id
    private Long id = 1L;

    private String instanceName = "Recipe Book";
    private String logonMessage = "Welcome to Recipe Book.";
    private boolean registrationEnabled = false;

    public MySystem()
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

    public String getInstanceName()
    {
        return instanceName;
    }

    public void setInstanceName(String instanceName)
    {
        this.instanceName = instanceName;
    }

    public String getLogonMessage()
    {
        return logonMessage;
    }

    public void setLogonMessage(String logonMessage)
    {
        this.logonMessage = logonMessage;
    }

    public boolean isRegistrationEnabled()
    {
        return registrationEnabled;
    }

    public void setRegistrationEnabled(boolean registrationEnabled)
    {
        this.registrationEnabled = registrationEnabled;
    }
}
