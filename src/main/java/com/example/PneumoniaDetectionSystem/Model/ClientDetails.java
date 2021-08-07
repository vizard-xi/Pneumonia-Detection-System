package com.example.PneumoniaDetectionSystem.Model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.File;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "Client_Details")
public class ClientDetails implements Serializable {

    private static final long serialVersionUID = -3322113303362981686L;

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "clientDetails_ID")
    private Long clientDetailsID;

    @JsonProperty("clientName")
    @Column(name = "clientName")
    private String clientName;

    @JsonProperty("clientDOB")
    @Column(name = "clientDOB")
    private LocalDate clientDOB;

    @JsonProperty("clientGender")
    @Column(name = "clientGender")
    private String clientGender;

    @JsonProperty("clientTestImage")
    @Column(name = "clientTestImage")
    private File clientTestImage;

    @JsonProperty("clientTestAnalysesResult")
    @Column(name = "clientTestAnalysesResult")
    private String clientTestAnalysesResult;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="userDetails_ID", referencedColumnName = "id", nullable = false)
    @JsonIgnore
    private UserDetails userDetails;

    public ClientDetails() {
    }

    public ClientDetails(String clientName, LocalDate clientDOB, String clientGender, File clientTestImage, String clientTestAnalysesResult) {
        this.clientName = clientName;
        this.clientDOB = clientDOB;
        this.clientGender = clientGender;
        this.clientTestImage = clientTestImage;
        this.clientTestAnalysesResult = clientTestAnalysesResult;
    }

    public Long getClientDetailsID() {
        return clientDetailsID;
    }

    public void setClientDetailsID(Long clientDetailsID) {
        this.clientDetailsID = clientDetailsID;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public LocalDate getClientDOB() {
        return clientDOB;
    }

    public void setClientDOB(LocalDate clientDOB) {
        this.clientDOB = clientDOB;
    }

    public String getClientGender() {
        return clientGender;
    }

    public void setClientGender(String clientGender) {
        this.clientGender = clientGender;
    }

    public File getClientTestImage() {
        return clientTestImage;
    }

    public void setClientTestImage(File clientTestImage) {
        this.clientTestImage = clientTestImage;
    }

    public String getClientTestAnalysesResult() {
        return clientTestAnalysesResult;
    }

    public void setClientTestAnalysesResult(String clientTestAnalysesResult) {
        this.clientTestAnalysesResult = clientTestAnalysesResult;
    }

    public UserDetails getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
    }
}
