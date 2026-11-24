FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/*.jar app.jar
COPY wallet /app/wallet
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]