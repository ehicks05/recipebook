package net.hicks.recipe.beans;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
public class AuditClass {

    @Column(name = "added_on")
    @JsonFormat(pattern = "MMMM dd, yyyy")
    @CreatedDate
    private LocalDateTime addedOn;


    @Column(name = "last_updated")
    @JsonFormat(pattern = "MMMM dd, yyyy")
    @LastModifiedDate
    private LocalDateTime lastUpdated;


    public LocalDateTime getAddedOn() {
        return addedOn;
    }

    public void setAddedOn(LocalDateTime addedOn) {
        this.addedOn = addedOn;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

}
