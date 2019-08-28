package com.hmtmcse.saas

class BootStrap {

    TenantProvisioningService tenantProvisioningService

    def init = { servletContext ->
        if (ApplicationConfig.isEnableMultiTenant()) {
            if (!TenantInfo.count()) {
                [
                        [
                                databaseName: "tenant1",
                                password    : "",
                                host        : "localhost",
                                username    : "root",
                                tenantId    : "tenant1.hmtmcse.com"
                        ],
                        [
                                databaseName: "tenant2",
                                password    : "",
                                host        : "localhost",
                                username    : "root",
                                tenantId    : "tenant2.hmtmcse.com"
                        ],
                        [
                                databaseName: "tenant3",
                                password    : "",
                                host        : "localhost",
                                username    : "root",
                                tenantId    : "tenant3.hmtmcse.com"
                        ]
                ].each {
                    tenantProvisioningService.addNewTenant(it)
                }
            }

        }
        tenantProvisioningService.registerAllActiveTenant()
    }
    def destroy = {
    }
}
