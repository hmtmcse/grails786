package com.hmtmcse.saas

import grails.gorm.multitenancy.Tenants
import groovy.transform.CompileStatic


@CompileStatic
class TenantContext {

    public static Map<String, TenantInfo> tenantInfo = [:]

    public static String getCurrentTenant() {
        return getCurrentTenantId()
    }

    public static String getCurrentTenantId() {
        return ApplicationConfig.isEnableMultiTenant() ? Tenants.currentId() : ApplicationConfig.getDefaultTenantId()
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
