package com.hmtmcse.grails786

import grails.gorm.MultiTenant

class MobileOperator implements MultiTenant<MobileInfo> {

    MobileInfo mobileInfo
    String name

    static constraints = {
    }
}
