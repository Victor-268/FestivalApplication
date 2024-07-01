# Use an official Java runtime as a parent image
FROM openjdk:21-jdk

# Set the working directory inside the container
WORKDIR /app

# Add the application's JAR file to the container
COPY target/*.jar app.jar

# Expose the port that the application will run on
EXPOSE 8082

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
