package com.hmtmcse.grails786

import grails.gorm.MultiTenant

class MobileInfo implements MultiTenant<MobileInfo> {

    Integer id
    String mobile
    String name

    static hasMany = [operator: MobileOperator]

    static constraints = {
    }
}
