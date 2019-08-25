package com.hmtmcse.saas

import grails.util.Holders

class TenantInfoController {

    static scaffold = TenantInfo

    def test() {
        println(Holders.config.grails.gorm.multiTenancy)
    }
}
