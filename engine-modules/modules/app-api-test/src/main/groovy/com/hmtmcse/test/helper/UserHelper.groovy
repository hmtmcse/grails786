package com.hmtmcse.test.helper

class UserHelper {

    public static Boolean checkIsCreationSuccess(Map response, Map user){
        if (response.error && response.error.message && user.message) {
           return user.status == response.status && response.error.message.contains(user.message) == true
        } else {
            return user.status == response.status
        }
    }


}
