package com.hmtmcse.saas

import groovy.transform.CompileStatic
import org.grails.datastore.mapping.core.connections.ConnectionSource
import org.grails.datastore.mapping.multitenancy.TenantResolver
import org.grails.datastore.mapping.multitenancy.exceptions.TenantNotFoundException
import org.springframework.web.context.request.RequestAttributes
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletWebRequest

import javax.servlet.http.HttpServletRequest

@CompileStatic
class TenantIdResolver implements TenantResolver {

    public static final String TENANT_ID = 'tenant_id'
    public static final String MESSAGE = 'Your Requested Instance is Not Found!'

    private HttpServletRequest getRequestedInformation() {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes()
        if (requestAttributes instanceof ServletWebRequest) {
            return ((ServletWebRequest) requestAttributes).getRequest()
        }
        return null
    }

    private String getTenantIdentity() {
        HttpServletRequest httpServletRequest = getRequestedInformation()
        if (!httpServletRequest) {
            return null
        }
        String identity = httpServletRequest.getHeader(TENANT_ID.toLowerCase())
        if (identity) {
            return identity
        }
        return httpServletRequest.getServerName()
    }


    @Override
    Serializable resolveTenantIdentifier() throws TenantNotFoundException {
        if (!TenantContext.tenantInfo.size()){
            return ConnectionSource.DEFAULT
        }
        String tenantIdentity = getTenantIdentity()
        if (tenantIdentity.equals("localhost")){
            return ConnectionSource.DEFAULT
        }
        if (!tenantIdentity || !TenantContext.tenantInfo.get(tenantIdentity)) {
            throw new TenantNotFoundException(MESSAGE)
        }
        TenantInfo tenant = TenantContext.tenantInfo.get(tenantIdentity)
        if (tenant.isActive && tenant.status && tenant.status.equals(TenantConstant.STATUS.ACTIVE)) {
            return tenantIdentity
        }
        String message = tenant.message ?: "Your Instance Current Status is ${tenant.status}"
        throw new TenantNotFoundException(message)
    }
}
