package com.hmtmcse.grails786

import com.hmtmcse.saas.TenantContext
import com.hmtmcse.saas.TenantProvisioningService
import grails.gorm.multitenancy.CurrentTenant
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

    def list(){
        def list = MobileInfo.list()
        println(list)
        render("List")
    }

    @CurrentTenant
    def addOne() {
        def mobile = new MobileInfo(name: "A", mobile: "1").save()
        new MobileOperator(name: "GP", mobileInfo: mobile).save()
        render("Add One")
    }

    @CurrentTenant
    def add() {
        def mobile = new MobileInfo(name: "A", mobile: "1").save()
        new MobileOperator(name: "GP", mobileInfo: mobile).save()

        mobile = new MobileInfo(name: "B", mobile: "2").save()
        new MobileOperator(name: "BL", mobileInfo: mobile).save()

        mobile = new MobileInfo(name: "C", mobile: "3").save()
        new MobileOperator(name: "Air", mobileInfo: mobile).save()

        mobile = new MobileInfo(name: "D", mobile: "4").save()
        new MobileOperator(name: "Robi", mobileInfo: mobile).save()

        mobile = new MobileInfo(name: "E", mobile: "5").save()
        new MobileOperator(name: "TT", mobileInfo: mobile).save()
        render("Add")
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
