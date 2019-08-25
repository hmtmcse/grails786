package com.hmtmcse.saas

class DatabaseConnectionData {

    public String username
    public String password
    public String host
    public String database
    public String autoDDL = "update"  // "update" // "none"
    public String port = 3306

    DatabaseConnectionData() {}

    DatabaseConnectionData(String database, String username, String password = "", String host = "localhost") {
        this.username = username
        this.password = password
        this.host = host
        this.database = database
    }

    String getUsername() {
        return username
    }

    DatabaseConnectionData setUsername(String username) {
        this.username = username
        return this
    }

    String getPassword() {
        return password
    }

    DatabaseConnectionData setPassword(String password) {
        this.password = password
        return this
    }

    String getHost() {
        return host
    }

    DatabaseConnectionData setHost(String host) {
        this.host = host
        return this
    }

    String getDatabase() {
        return database
    }

    DatabaseConnectionData setDatabase(String database) {
        this.database = database
        return this
    }

    String getPort() {
        return port
    }

    DatabaseConnectionData setPort(String port) {
        this.port = port
        return this
    }

    String getAutoDDL() {
        return autoDDL
    }

    DatabaseConnectionData setAutoDDL(String autoDDL) {
        this.autoDDL = autoDDL
        return this
    }


    Map<String, Object> getConnectionData() {
        return [
                'hibernate.hbm2ddl.auto': this.autoDDL,
                'username'              : this.username,
                'password'              : this.password,
                'url'                   : "jdbc:mysql://${this.host}:${this.port}/${this.database}"
        ] as Map<String, Object>
    }

}
