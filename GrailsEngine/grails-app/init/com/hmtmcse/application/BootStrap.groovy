package com.hmtmcse.application

import com.hmtmcse.gcommon.ApplicationConfig
import com.hmtmcse.gcommon.TMGUtil
import com.hmtmcse.gcommon.ws.AppWebSocketHandler
import com.hmtmcse.gs.GsConfigHolder

class BootStrap {

    def init = { servletContext ->
        GsConfigHolder.hostnameWithPort = "${TMGUtil.appBaseUrlHostWithPort()}"
        GsConfigHolder.systemVersion = "V2"
        GsConfigHolder.swaggerDefinitionUrl = "${ApplicationConfig.appBaseUrl()}swaggerUi/definition"
        println("Bismillah")
    }

    def destroy = {}

}
