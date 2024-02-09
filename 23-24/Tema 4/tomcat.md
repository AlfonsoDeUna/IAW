# PRÁCTICA JAVA - BBDD - TOMCAT - MAVEN

## index,jsp
```java
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<sql:query var="rs" dataSource="jdbc/TestDB">
select id, foo, bar from testdata
</sql:query>

<html>
  <head>
    <title>DB Test</title>
  </head>
  <body>

  <h2>Results</h2>

<c:forEach var="row" items="${rs.rows}">
    Foo ${row.foo}<br/>
    Bar ${row.bar}<br/>
</c:forEach>

  </body>
</html>
```

## web.xml

```xml
<web-app xmlns="http://java.sun.com/xml/ns/j2ee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd"
    version="2.4">

    <display-name>Hello, World Application</display-name>
    <description>
    This is a simple web application with a source code organization
    based on the recommendations of the Application Developer's Guide.
    </description>

  <resource-ref>
      <description>DB Connection</description>
      <res-ref-name>jdbc/TestDB</res-ref-name>
      <res-type>javax.sql.DataSource</res-type>
      <res-auth>Container</res-auth>
  </resource-ref>

</web-app>
```

## POM.XML

```xml

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd%22%3E
  <modelVersion>4.0.0</modelVersion>
  <groupId>org.asir</groupId>
  <artifactId>alfonso</artifactId>
  <packaging>war</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>alfonso Maven Webapp</name>
  <url>http://maven.apache.org/</url>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>

    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>jstl</artifactId>
        <version>1.2</version>
    </dependency>

  </dependencies>
  <build>
  <plugins>
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-war-plugin</artifactId>
        <version>3.2.0</version>
        <configuration>
            <webResources>
                <resource>
                    <directory>src\main\webapp\WEB-INF</directory>
                </resource>
            </webResources>
        </configuration>
    </plugin>
</plugins>
    <finalName>alfonso</finalName>
  </build>
</project>
```
