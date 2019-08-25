package com.hmtmcse.grails786

import grails.gorm.multitenancy.CurrentTenant


@CurrentTenant
class MobileInfoService {

    def save(Map params) {
        MobileInfo mobileInfo = new MobileInfo(mobile: "12345", name: "Mia vai")
        mobileInfo.save()
        println("save")
    }
}
