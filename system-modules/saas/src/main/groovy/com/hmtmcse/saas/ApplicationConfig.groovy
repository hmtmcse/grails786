package com.hmtmcse.saas

import grails.util.Holders

class ApplicationConfig {


    static getConfiguration(String configKey, String key, Object defaultValue = null) {
        if (Holders.config[configKey][key]) {
            return Holders.config[configKey][key]
        }
        return defaultValue
    }


    static getMyAppConfig(String key, Object defaultValue = null) {
        return getConfiguration("myApp", key, defaultValue)
    }


    static getDefaultTenantId() {
        return getMyAppConfig("defaultTenantId", "my-app")
    }

    static getGrailsConfig(String key, Object defaultValue = null) {
        return getConfiguration("grails", key, defaultValue)
    }

    static isEnableMultiTenant() {
        def config = getGrailsConfig("gorm")
        if (config && config.multiTenancy.mode) {
            return true
        }
        return false
    }

}
