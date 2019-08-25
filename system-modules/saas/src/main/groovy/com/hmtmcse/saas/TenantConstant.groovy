package com.hmtmcse.saas

class TenantConstant {

    public static final Map<String, String> STATUS = [
            ACTIVE : "ACTIVE",
            INACTIVE : "INACTIVE",
            SUSPEND: "SUSPEND",
            NOT_REGISTERED_IN_DB: "NOT_REGISTERED_IN_DB",
    ]

    public static final Map<String, String> MANIPULATION = [
            STATUS_CHANGED: "STATUS_CHANGED",
            NOT_REGISTERED_IN_DB: "NOT_REGISTERED_IN_DB",
    ]

}
