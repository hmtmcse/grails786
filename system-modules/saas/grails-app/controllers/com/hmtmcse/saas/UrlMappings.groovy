package com.hmtmcse.saas

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "500"(controller: 'exception', action: "error500")
        "404"(view:'/notFound')
    }
}
