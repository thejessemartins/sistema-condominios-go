package main

import (
	"log"
	"time"

	"backend/config"
	"backend/models"
	"backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	// Connect to Database
	config.ConnectDB()

	// Seed Default User
	seedDefaultUser()

	// Init Router
	r := gin.Default()

	// Fix Trusted Proxies Warning
	r.SetTrustedProxies(nil)

	// CORS Configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Setup Routes
	routes.SetupRoutes(r)

	// Run Server
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Server failed to start: ", err)
	}
}

func seedDefaultUser() {
	var user models.User
	if err := config.DB.Where("email = ?", "admin@admin.com").First(&user).Error; err != nil {
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("123456"), bcrypt.DefaultCost)
		newUser := models.User{
			Email:    "admin@admin.com",
			Password: string(hashedPassword),
			Name:     "Admin User",
			Role:     "admin",
		}
		if err := config.DB.Create(&newUser).Error; err != nil {
			log.Println("Failed to create default user:", err)
		} else {
			log.Println("Default user created: admin@admin.com / 123456")
		}
	}
}
