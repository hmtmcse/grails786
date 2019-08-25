package com.hmtmcse.saas

class TenantTestController {

    def currentTenantId() {
        render("Tenant: ${TenantContext.getCurrentTenant()}")
    }
}
