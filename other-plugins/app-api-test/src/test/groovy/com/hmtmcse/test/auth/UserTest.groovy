package com.hmtmcse.test.auth

import com.hmtmcse.gsrest.GsAPISpecification
import com.hmtmcse.test.Constant
import com.hmtmcse.test.data.UserData


class UserTest extends GsAPISpecification {



    def setup() {
        this.apiURL = Constant.API_URL + "api/v1/"
    }

    def "Post Create Test"() {

        expect: "Check Creation"
        println(user.firstName + " " + user.lastName)
        println(mapToString(user))
        apiRequest.jsonPost("user/create", mapToString(user))
        Map response = stringToMap(apiResponse.content)

        println(jsonResponseContent)


        where: "Process Data"
        user << UserData.listOfUsers
    }


    def "postUpdate Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode != 200

    }

    def "deleteDelete Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode == 200

    }

    def "deleteHardDelete Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode == 200

    }

    def "postList Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode == 200

    }

    def "getList Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode == 200

    }

    def "postDetails Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode == 200

    }

    def "getDetails Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode == 200

    }

    def "getActiveInactive Test"(){

        when:
        apiRequest.getRequest("/")

        then:
        apiResponse.httpCode == 200

    }

}
