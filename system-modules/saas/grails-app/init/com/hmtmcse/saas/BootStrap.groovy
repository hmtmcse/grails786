package com.hmtmcse.saas

class BootStrap {

    TenantProvisioningService tenantProvisioningService

    def init = { servletContext ->
        if (ApplicationConfig.isEnableMultiTenant() && false) {
            if (!TenantInfo.count()) {
                [
                        [
                                databaseName: "tenant1",
                                password    : "",
                                host        : "localhost",
                                username    : "root",
                                tenantId    : "tenant1"
                        ],
                        [
                                databaseName: "tenant2",
                                password    : "",
                                host        : "localhost",
                                username    : "root",
                                tenantId    : "tenant2"
                        ],
                        [
                                databaseName: "tenant3",
                                password    : "",
                                host        : "localhost",
                                username    : "root",
                                tenantId    : "tenant3"
                        ]
                ].each {
                    tenantProvisioningService.addNewTenant(it)
                }
            }
            tenantProvisioningService.registerAllActiveTenant()
        }
    }
    def destroy = {
    }
}
