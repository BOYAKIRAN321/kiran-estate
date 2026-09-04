from django.db import models
from django.contrib.auth.models import User  # <-- Idi add cheyali, important!

class Property(models.Model):
    description = models.TextField(default="Premium tokenized property in Hyderabad")
    location = models.CharField(max_length=100, default="Kokapet, Hyderabad")
    total_value = models.DecimalField(max_digits=12, decimal_places=2, default=10000000)
    total_tokens = models.IntegerField(default=1000)
    token_price = models.DecimalField(max_digits=10, decimal_places=2, default=10000)
    rental_yield = models.DecimalField(max_digits=5, decimal_places=2, default=6.0)
    image_url = models.CharField(max_length=500, default="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800")
    is_verified = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Title field ledu screenshot lo! Add chey - lekapothe return self.title error
    title = models.CharField(max_length=200, default="Modern Luxury Villa")

    def __str__(self):
        return self.title

class TokenHolding(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    # Ika kinda fields kuda add chey Version 2 kosam
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=True)
    tokens = models.IntegerField(default=1)
    purchased_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.property}"