package com.hmtmcse.grails786

import grails.gorm.multitenancy.Tenants
import org.grails.datastore.gorm.GormEnhancer
import org.grails.datastore.mapping.core.Datastore
import org.grails.orm.hibernate.HibernateDatastore

class BismillahController {

    HibernateDatastore hibernateDatastore

    def index() {
        Datastore datastore = GormEnhancer.findSingleDatastore()
        Tenants.currentId()
//        hibernateDatastore.getDatastoreForConnection("tenant1")
//        Datastore datastorex = GormEnhancer.findDatastoreByType("tenant1")
        render("<h1>Grails Bismillahir Rahmanir Rahim</h1>")
    }
}
