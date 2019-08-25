package com.hmtmcse.saas

import grails.plugins.*

class SaasGrailsPlugin extends Plugin {


    def grailsVersion = "4.0.0 > *"
    def pluginExcludes = [
        "grails-app/views/error.gsp"
    ]

    // TODO Fill in these fields
    def title = "SaaS"
    def author = "H.M.Touhid Mia"
    def authorEmail = "hmtm.cse@gmail.com"
    def profiles = ['web']
    def documentation = "http://grails.org/plugin/saas"


    Closure doWithSpring() { {->
        tenantIdResolver(TenantIdResolver)
        tenantContext(TenantContext)
        }
    }

}
