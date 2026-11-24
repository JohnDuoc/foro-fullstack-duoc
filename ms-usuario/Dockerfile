FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/*.jar app.jar
COPY wallet /app/wallet
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]