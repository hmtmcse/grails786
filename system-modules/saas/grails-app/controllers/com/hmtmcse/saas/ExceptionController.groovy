package com.hmtmcse.saas

import org.grails.datastore.mapping.multitenancy.exceptions.TenantNotFoundException

class ExceptionController {

    def error500() {
        Throwable throwable = request.exception
        def cause = throwable?.cause?.target
        if (cause instanceof TenantNotFoundException) {
            render(cause.message)
        }
        render(view: "error")
    }

    def error404() {}
}
