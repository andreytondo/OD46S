# ---- BUILD STAGE ----
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /workspace/app

# Copy Maven wrapper and project files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Ensure wrapper is executable
RUN chmod +x mvnw

# Download dependencies first (for layer caching)
RUN ./mvnw dependency:go-offline -B

# Copy source and other needed dirs
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# ---- RUNTIME STAGE ----
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy only the built jar
COPY --from=build /workspace/app/target/*.jar app.jar

ENV TZ=America/Sao_Paulo

# Run the app
ENTRYPOINT ["java", "-jar", "/app/app.jar"]