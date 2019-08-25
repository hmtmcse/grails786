package com.hmtmcse.saas

import grails.gorm.multitenancy.Tenants
import org.grails.datastore.mapping.core.connections.ConnectionSources
import org.grails.orm.hibernate.HibernateDatastore
import org.grails.orm.hibernate.connections.HibernateConnectionSourceSettings
import org.hibernate.SessionFactory

class TenantProvisioningService {

    HibernateDatastore hibernateDatastore

    Boolean addNewTenant(Map params) {
        TenantInfo tenantInfo = new TenantInfo(params)
        tenantInfo.save()
        if (tenantInfo.hasErrors()) {
            tenantInfo.errors.each {
                println("Error in Add New Tenant ${it}")
            }
        } else {
            return registerTenant(tenantInfo)
        }
        return false
    }

    String active(String tenantId){
        changeState(tenantId, TenantConstant.STATUS.ACTIVE, "", true)
    }

    String inactive(String tenantId){
        changeState(tenantId, TenantConstant.STATUS.INACTIVE, "", false)
    }

    String suspend(String tenantId, String message){
        changeState(tenantId, TenantConstant.STATUS.SUSPEND, message, false)
    }

    String changeState(String tenantId, String status, String message, Boolean isActive) {
        TenantInfo tenantInfo = TenantInfo.findByTenantId(tenantId)
        if (!tenantInfo) {
            return TenantConstant.MANIPULATION.NOT_REGISTERED_IN_DB
        }
        tenantInfo.message = message
        tenantInfo.status = status
        tenantInfo.isActive = isActive
        tenantInfo.save()
        if (!TenantContext.tenantInfo.get(tenantId) && isActive) {
            registerTenant(tenantInfo)
        } else {
            TenantContext.tenantInfo.put(tenantId, tenantInfo)
        }
        return TenantConstant.MANIPULATION.STATUS_CHANGED
    }


    TenantInfo getTenantInfoByTenantId(String tenantId) {
        return TenantInfo.findByTenantIdAndIsActive(tenantId, true)
    }


    List<TenantInfo> listAllTenantInfo() {
        return TenantInfo.findAllByIsActive(true)
    }

    public ConnectionSources<SessionFactory, HibernateConnectionSourceSettings> getAllConnection() {
        return hibernateDatastore.getConnectionSources()
    }

    public List<String> getAllTenantId() {
        List<String> tenantIds = []
        getAllConnection().each {
            tenantIds.add(it.name)
        }
        return tenantIds
    }

    public String getCurrentTenant() {
        Serializable tenantId = Tenants.currentId(hibernateDatastore)
        return tenantId
    }

    private Boolean registerTenant(TenantInfo tenantInfo) {
        TenantContext.tenantInfo.put(tenantInfo.tenantId, tenantInfo)
        DatabaseConnectionData dbConnectionData = new DatabaseConnectionData()
        dbConnectionData.setDatabase(tenantInfo.databaseName)
        dbConnectionData.setHost(tenantInfo.host)
        dbConnectionData.setPassword(tenantInfo.password)
        dbConnectionData.setUsername(tenantInfo.username)
        try {
            if (hibernateDatastore.getConnectionSources().addConnectionSource(tenantInfo.tenantId, dbConnectionData.getConnectionData())) {
                return true
            }
        } catch (Exception e) {
            println("Unable to Init Tenant: ${tenantInfo.host}")
        }
        return false
    }

    Boolean registerTenantByTenantId(String tenantId) {
        TenantInfo tenantInfo = getTenantInfoByTenantId(tenantId)
        if (!tenantInfo) {
            return false
        }
        registerTenant(tenantInfo)
    }

    void registerAllActiveTenant() {
        if (ApplicationConfig.isEnableMultiTenant()){
            List<TenantInfo> allTenant = listAllTenantInfo()
            if (allTenant) {
                allTenant.each { TenantInfo tenantInfo ->
                    registerTenant(tenantInfo)
                }
            }
        }
    }

}

