package com.hmtmcse.saas

class TenantInfo {

    Integer id
    String name
    String databaseName
    String password
    String host
    String username
    String tenantId
    String status = TenantConstant.STATUS.ACTIVE
    String message
    Boolean isActive = true

    static constraints = {
        password(nullable: true)
        message(nullable: true)
        name(nullable: true)
    }

    static mapping = {
        message(type: "text")
    }
}
