# backend-go/Dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
COPY .env.example .env
RUN go mod tidy && go run main.go

FROM alpine
WORKDIR /app
COPY --from=builder /app/app .
COPY .env.example .env
USER nobody
EXPOSE 8080
CMD ["./app"]
