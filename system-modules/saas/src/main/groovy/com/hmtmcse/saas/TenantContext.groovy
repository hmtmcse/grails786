package com.hmtmcse.saas

import grails.gorm.multitenancy.Tenants
import groovy.transform.CompileStatic
import org.grails.datastore.mapping.core.connections.ConnectionSource


@CompileStatic
class TenantContext {

    public static Map<String, TenantInfo> tenantInfo = [:]

    public static String getCurrentTenant() {
        return getCurrentTenantId()
    }

    private static String getTenantId() {
        try {
            String tenant = Tenants.currentId()
            return (tenant != ConnectionSource.DEFAULT ? tenant : ApplicationConfig.getDefaultTenantId())
        } catch (Exception e) {
            return ApplicationConfig.getDefaultTenantId()
        }
    }

    public static String getCurrentTenantId() {
        return ApplicationConfig.isEnableMultiTenant() ? getTenantId() : ApplicationConfig.getDefaultTenantId()
    }

    public static List<String> getTenantIds() {
        List<String> tenantIds = []
        Tenants.eachTenant { String tenant ->
            if (tenant){
                tenantIds.add(tenant)
            }
        }
        return tenantIds
    }

}
