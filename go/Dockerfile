# backend-go/Dockerfile

FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
COPY .env.example .env

RUN go mod tidy
RUN go build -o app main.go

FROM alpine
WORKDIR /app
COPY --from=builder /app/app .
COPY --from=builder /app/.env .env
USER nobody
EXPOSE 8080
CMD ["./app"]
