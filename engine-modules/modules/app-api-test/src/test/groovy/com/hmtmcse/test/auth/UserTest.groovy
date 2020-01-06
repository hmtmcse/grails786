package com.hmtmcse.test.auth

import com.hmtmcse.gsrest.GsAPISpecification
import com.hmtmcse.test.Constant
import com.hmtmcse.test.data.UserData
import com.hmtmcse.test.helper.UserHelper


class UserTest extends GsAPISpecification {



    def setup() {
        this.apiURL = Constant.API_URL + "api/v1/"
    }



    def "Method:Post Create Test"() {

        expect: "Check Creation"
        apiRequest.jsonPost("user/create", mapToString(user))
        UserHelper.checkIsCreationSuccess(jsonResponseContent, user)

        where: "Process Data"
        user << UserData.listOfUsers
    }


    def "Method:Post Update Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode != 200

    }

    def "Method:Delete Delete Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode == 200

    }

    def "Method:Delete HardDelete Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode == 200

    }

    def "Method:Post List Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode == 200

    }

    def "Method:Get List Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode == 200

    }

    def "Method:Post Details Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode == 200

    }

    def "Method:Get Details Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode == 200

    }

    def "Method:Get Active Inactive Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode == 200

    }

}
