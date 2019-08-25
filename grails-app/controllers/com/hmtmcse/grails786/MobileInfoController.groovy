package com.hmtmcse.grails786

import com.hmtmcse.saas.TenantContext
import com.hmtmcse.saas.TenantProvisioningService
import grails.gorm.multitenancy.Tenants


class MobileInfoController {

    TenantProvisioningService tenantProvisioningService
    MobileInfoService mobileInfoService
    static scaffold = MobileInfo


    def currentTenant(){
        render(Tenants.currentId())
    }

    def allTenant(){
        println(tenantProvisioningService.getCurrentTenant())
        println(tenantProvisioningService.getAllTenantId())
        render("tenant")
    }

    def saveToSingle() {
        println("From Single Tenant")
        mobileInfoService.save([:])
        render("save to Single Tenant")
    }

    def saveToCurrent() {
        println("From Current Tenant ${TenantContext.getCurrentTenant()}")
        mobileInfoService.save([:])
        render("save to ${TenantContext.getCurrentTenant()}")
    }

    def thread() {

        Thread.start {
            (1..10).each {
                Tenants.eachTenant {
                    println("From Thread ${it}")
                    mobileInfoService.save([:])
                    Thread.sleep(2000)
                }
            }
        }

        render("save")
    }

    def xyzSave() {
        mobileInfoService.save(params)
        render("save")
    }
}
